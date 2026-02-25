import Stripe from 'stripe';
import { prisma } from '@/shared/config';
import { stripe, STRIPE_CONFIG } from '@/shared/config/stripe.config';
import {
  ICreateCheckoutSessionRequest,
  ICheckoutSessionResponse,
  StripeWebhookEvent,
  IWebhookResponse,
  ISubscriptionResponse,
} from '../interface/subscription.interface';
import emailService from '@/shared/services/email.service';

import { AppError } from '@/shared/utils';

export class SubscriptionService {
  private async handleTrialWillEnd(subscription: Stripe.Subscription) {
    const existingSubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!existingSubscription) {
      console.error(`Subscription not found: ${subscription.id}`);
      return;
    }

    const trialEndDate = subscription.trial_end ? new Date(subscription.trial_end * 1000) : null;

    // Send trial ending reminder email
    await emailService.sendTrialEndingReminder(
      existingSubscription.user.email,
      existingSubscription.user.fullName,
      trialEndDate
    );

    console.log(`⚠️ Trial ending in 3 days for: ${existingSubscription.user.email}`);
  }

  /**
   * Handle payment_intent.payment_failed event
   * Provides detailed failure information for better user communication
   */
  private async handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
    // Cast to 'any' to access invoice property (exists at runtime but not in types)
    const invoiceId = (paymentIntent as any).invoice as string | null;

    if (!invoiceId) {
      console.error('No invoice ID in payment intent');
      return;
    }

    try {
      // Get invoice to find subscription
      const invoice = await stripe.invoices.retrieve(invoiceId);

      // Cast to 'any' to access subscription property
      const subscriptionId = (invoice as any).subscription as string | null;

      if (!subscriptionId) {
        console.error('No subscription ID in invoice');
        return;
      }

      const subscription = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: subscriptionId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
      });

      if (!subscription) {
        console.error(`Subscription not found: ${subscriptionId}`);
        return;
      }

      // Get detailed failure information
      const failureCode = paymentIntent.last_payment_error?.code || 'unknown';
      const declineCode = paymentIntent.last_payment_error?.decline_code;
      const failureMessage = paymentIntent.last_payment_error?.message || 'Payment failed';

      // Create user-friendly message based on error type
      let userMessage = failureMessage;

      if (declineCode === 'insufficient_funds') {
        userMessage = 'Your card has insufficient funds. Please use a different payment method.';
      } else if (declineCode === 'expired_card') {
        userMessage = 'Your card has expired. Please update your payment method.';
      } else if (failureCode === 'card_declined') {
        userMessage = 'Your card was declined. Please contact your bank or use a different card.';
      }

      // Send detailed payment failed email
      await emailService.sendPaymentFailedEmail(
        subscription.user.email,
        subscription.user.fullName,
        userMessage
      );

      console.log(`❌ Payment Intent Failed:`, {
        userId: subscription.user.id,
        email: subscription.user.email,
        failureCode,
        declineCode,
        message: userMessage,
      });
    } catch (error) {
      console.error('Error handling payment intent failed:', error);
    }
  }
  /**
   * Create Stripe Checkout Session for subscription
   */

  async createCheckoutSession(
    userId: string,
    data: ICreateCheckoutSessionRequest
  ): Promise<ICheckoutSessionResponse> {
    try {
      // 1. Get user from database
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          fullName: true,
          subscription: {
            select: {
              stripeCustomerId: true,
              status: true,
            },
          },
        },
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      // 2. Check if user already has active subscription
      if (user.subscription?.status === 'ACTIVE') {
        throw new AppError('You already have an active subscription', 400);
      }

      // 3. Get or create Stripe Customer
      let stripeCustomerId = user.subscription?.stripeCustomerId;

      if (!stripeCustomerId) {
        // Create new Stripe customer
        const customer = await stripe.customers.create({
          email: user.email,
          name: `${user.fullName}`,
          metadata: {
            userId: user.id,
          },
        });

        stripeCustomerId = customer.id;

        // Update existing subscription with Stripe customer ID
        await prisma.subscription.update({
          where: { userId: user.id },
          data: {
            stripeCustomerId: customer.id,
          },
        });
      }

      // 4. Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: data.priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        metadata: {
          userId: user.id,
        },
      });

      // 5. Return session details
      return {
        sessionId: session.id,
        url: session.url!,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof Stripe.errors.StripeError) {
        throw new AppError(`Stripe error: ${error.message}`, 400);
      }

      throw new AppError('Failed to create checkout session', 500);
    }
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhook(signature: string, rawBody: Buffer): Promise<IWebhookResponse> {
    try {
      // ✅ DEBUG LOGS
      console.log('🔑 WEBHOOK DEBUG:');
      console.log('STRIPE_CONFIG.WEBHOOK_SECRET exists:', !!STRIPE_CONFIG.WEBHOOK_SECRET);
      console.log('STRIPE_CONFIG.WEBHOOK_SECRET length:', STRIPE_CONFIG.WEBHOOK_SECRET?.length);
      console.log('First 20 chars:', STRIPE_CONFIG.WEBHOOK_SECRET?.substring(0, 20));
      console.log('Signature received:', signature?.substring(0, 50) + '...');

      // 1. Verify webhook signature
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        'whsec_dDo0yGcSVAj0igMm6yZH3WDtBpUPR3cn'
      );

      console.log(`✅ Webhook received: ${event.type}`);

      // 2. Handle different event types
      switch (event.type) {
        case StripeWebhookEvent.CHECKOUT_SESSION_COMPLETED:
          await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
          break;

        case StripeWebhookEvent.CUSTOMER_SUBSCRIPTION_CREATED:
          await this.handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;

        case StripeWebhookEvent.CUSTOMER_SUBSCRIPTION_UPDATED:
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;

        case StripeWebhookEvent.CUSTOMER_SUBSCRIPTION_DELETED:
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;

        case StripeWebhookEvent.CUSTOMER_SUBSCRIPTION_TRIAL_WILL_END:
          await this.handleTrialWillEnd(event.data.object as Stripe.Subscription);
          break;

        case StripeWebhookEvent.INVOICE_PAYMENT_SUCCEEDED:
          await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;

        case StripeWebhookEvent.INVOICE_PAYMENT_FAILED:
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;

        case StripeWebhookEvent.PAYMENT_INTENT_PAYMENT_FAILED:
          await this.handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return {
        received: true,
        event: event.type,
      };
    } catch (error) {
      if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
        console.error('❌ Invalid webhook signature');
        throw new AppError('Invalid webhook signature', 400);
      }

      console.error('❌ Webhook error:', error);
      throw new AppError('Webhook processing failed', 500);
    }
  }

  /**
   * Handle checkout.session.completed event
   */
  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error('No userId in checkout session metadata');
      return;
    }

    console.log(`✅ Checkout completed for user: ${userId}`);
  }

  /**
   * Handle customer.subscription.created event
   */
  /**
   * Handle customer.subscription.created event
   */
  private async handleSubscriptionCreated(subscription: any) {
    // Try to get userId from subscription metadata first
    let userId = subscription.metadata?.userId;

    // If not in subscription metadata, get it from the customer
    if (!userId) {
      const customerId = subscription.customer as string;

      if (!customerId) {
        console.error('No customer ID in subscription');
        return;
      }

      // Find subscription by Stripe customer ID
      const existingSubscription = await prisma.subscription.findFirst({
        where: { stripeCustomerId: customerId },
        select: { userId: true },
      });

      if (!existingSubscription) {
        console.error(`No subscription found for customer: ${customerId}`);
        return;
      }

      userId = existingSubscription.userId;
    }

    if (!userId) {
      console.error('Could not determine userId for subscription');
      return;
    }

    const priceId = subscription.items.data[0]?.price?.id;

    if (!priceId) {
      console.error('No price ID in subscription');
      return;
    }

    // Update subscription in database
    await prisma.subscription.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId,
        status: 'ACTIVE',
        planType: 'MONTHLY',
        currentPeriodStart: new Date((subscription.current_period_start as number) * 1000),
        currentPeriodEnd: new Date((subscription.current_period_end as number) * 1000),
      },
    });

    // ✅ SEND EMAIL
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, fullName: true },
    });

    if (user) {
      await emailService.sendSubscriptionActivatedEmail(user.email, user.fullName!);
    }

    console.log(`✅ Subscription created for user: ${userId}`);
  }
  /**
   * Handle customer.subscription.updated event
   */
  private async handleSubscriptionUpdated(subscription: any) {
    // Try to find by subscription ID first
    let existingSubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    // If not found, try by customer ID
    if (!existingSubscription) {
      const customerId = subscription.customer as string;

      if (customerId) {
        existingSubscription = await prisma.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        });
      }
    }

    if (!existingSubscription) {
      console.error(`Subscription not found: ${subscription.id}`);
      return;
    }

    await prisma.subscription.update({
      where: { id: existingSubscription.id },
      data: {
        stripeSubscriptionId: subscription.id, // Save it if it wasn't there before
        status:
          subscription.status === 'active'
            ? 'ACTIVE'
            : subscription.status === 'canceled'
              ? 'CANCELLED'
              : 'ACTIVE',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
      },
    });

    console.log(`✅ Subscription updated: ${subscription.id}`);
  }

  /**
   * Handle customer.subscription.deleted event
   */
  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
    });

    console.log(`✅ Subscription cancelled: ${subscription.id}`);
  }

  /**
   * Handle invoice.payment_succeeded event
   */
  private async handlePaymentSucceeded(invoice: any) {
    console.log('📧 Processing invoice.payment_succeeded');

    // ✅ Get subscription ID from the parent.subscription_details object
    const subscriptionId =
      invoice.parent?.subscription_details?.subscription || invoice.subscription;

    if (!subscriptionId) {
      console.error('No subscription ID in invoice');
      return;
    }

    console.log(`Processing payment for subscription: ${subscriptionId}`);

    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: {
        user: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!subscription) {
      console.error(`Subscription not found: ${subscriptionId}`);
      return;
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: subscription.userId,
        subscriptionId: subscription.id,
        amount: invoice.amount_paid,
        currency: invoice.currency.toUpperCase(),
        status: 'SUCCESS',
        stripePaymentIntentId: (invoice.payment_intent as string) || '',
        stripeInvoiceId: invoice.id,
        paymentMethod: 'card',
        metadata: {
          invoiceNumber: invoice.number,
          hostedInvoiceUrl: invoice.hosted_invoice_url,
        },
      },
    });

    console.log(`✅ Payment record created for subscription: ${subscriptionId}`);

    // ✅ SEND EMAIL
    const nextBillingDate = new Date(invoice.lines.data[0]?.period?.end * 1000 || Date.now());

    await emailService.sendPaymentSuccessEmail(
      subscription.user.email,
      subscription.user.fullName!,
      invoice.amount_paid,
      invoice.currency.toUpperCase(),
      nextBillingDate,
      invoice.hosted_invoice_url
    );

    console.log(`✅ Payment succeeded for subscription: ${subscriptionId}`);
  }

  /**
   * Handle invoice.payment_failed event
   */
  private async handlePaymentFailed(invoice: any) {
    console.log('❌ Processing invoice.payment_failed');

    // ✅ Get subscription ID from the parent.subscription_details object
    const subscriptionId =
      invoice.parent?.subscription_details?.subscription || invoice.subscription;

    if (!subscriptionId) {
      console.error('No subscription ID in invoice');
      return;
    }

    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!subscription) {
      console.error(`Subscription not found: ${subscriptionId}`);
      return;
    }

    // Create failed payment record
    await prisma.payment.create({
      data: {
        userId: subscription.userId,
        subscriptionId: subscription.id,
        amount: invoice.amount_due,
        currency: invoice.currency.toUpperCase(),
        status: 'FAILED',
        stripePaymentIntentId: (invoice.payment_intent as string) || '',
        stripeInvoiceId: invoice.id,
        paymentMethod: 'card',
      },
    });

    // ✅ SEND EMAIL
    await emailService.sendPaymentFailedEmail(
      subscription.user.email,
      subscription.user.fullName,
      'Your payment failed. Please update your payment method to continue your subscription.'
    );

    console.log(`❌ Payment failed for subscription: ${subscriptionId}`);
  }

  /**
   * Get current user's subscription status
   */
  async getSubscriptionStatus(userId: string): Promise<ISubscriptionResponse | null> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: {
        id: true,
        userId: true,
        status: true,
        planType: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        stripePriceId: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        trialEndsAt: true,
        cancelledAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return subscription;
  }

  /**
   * Cancel user's subscription
   */
  async cancelSubscription(userId: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!subscription) {
      throw new AppError('No subscription found', 404);
    }

    if (subscription.status === 'CANCELLED') {
      throw new AppError('Subscription is already cancelled', 400);
    }

    if (!subscription.stripeSubscriptionId) {
      throw new AppError('No active Stripe subscription', 400);
    }

    // Cancel subscription in Stripe (at period end)
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Update database
    await prisma.subscription.update({
      where: { userId },
      data: {
        cancelledAt: new Date(),
      },
    });

    // ✅ SEND EMAIL
    await emailService.sendSubscriptionCancelledEmail(
      subscription.user.email,
      subscription.user.fullName!,
      subscription.currentPeriodEnd!
    );
  }

  /**
   * Get user's billing history
   */
  async getBillingHistory(userId: string, page: number = 1, limit: number = 10) {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new AppError('No subscription found', 404);
    }

    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.payment.count({ where: { userId } }),
    ]);

    return {
      payments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Generate Stripe Customer Portal URL
   */
  /**
   * Generate Stripe Customer Portal URL
   */
  /**
   * Generate Stripe Customer Portal URL
   */
  async createCustomerPortalSession(userId: string): Promise<{ url: string }> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!subscription) {
      throw new AppError('No subscription found', 404);
    }

    // ✅ CREATE CUSTOMER IF DOESN'T EXIST
    let stripeCustomerId = subscription.stripeCustomerId;

    if (!stripeCustomerId) {
      // Ensure email and name are not null
      const email = subscription.user.email;
      const name = subscription.user.fullName || 'User'; // ✅ Fallback if null

      if (!email) {
        throw new AppError('User email is required to create customer', 400);
      }

      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: email, // ✅ Now guaranteed to be string
        name: name, // ✅ Now guaranteed to be string
        metadata: {
          userId: subscription.userId,
        },
      });

      stripeCustomerId = customer.id;

      // Save customer ID to database
      await prisma.subscription.update({
        where: { userId },
        data: {
          stripeCustomerId: customer.id,
        },
      });

      console.log(`✅ Created Stripe customer for user: ${userId}`);
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/subscription`,
    });

    return { url: session.url };
  }
  /**
   * Resume cancelled subscription
   */
  async resumeSubscription(userId: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!subscription) {
      throw new AppError('No subscription found', 404);
    }

    if (subscription.status !== 'ACTIVE' || !subscription.cancelledAt) {
      throw new AppError('Subscription is not cancelled', 400);
    }

    if (!subscription.stripeSubscriptionId) {
      throw new AppError('No active Stripe subscription', 400);
    }

    // Resume subscription in Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    // Update database
    await prisma.subscription.update({
      where: { userId },
      data: {
        cancelledAt: null,
      },
    });

    // ✅ SEND EMAIL
    await emailService.sendSubscriptionResumedEmail(
      subscription.user.email,
      subscription.user.fullName!,
      subscription.currentPeriodEnd!
    );
  }

  /**
   * Preview upcoming invoice
   */
  async previewInvoice(userId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new AppError('No subscription found', 404);
    }

    if (!subscription.stripeSubscriptionId) {
      throw new AppError('No active Stripe subscription', 400);
    }

    // Get upcoming invoice from Stripe
    const invoiceList = await stripe.invoices.list({
      subscription: subscription.stripeSubscriptionId,
      limit: 1,
    });

    const upcomingInvoice = invoiceList.data[0];

    if (!upcomingInvoice) {
      throw new AppError('No upcoming invoice found', 404);
    }

    return {
      amount: upcomingInvoice.amount_due,
      currency: upcomingInvoice.currency.toUpperCase(),
      billingDate: new Date((upcomingInvoice.period_end || 0) * 1000),
      items: upcomingInvoice.lines.data.map((item: any) => ({
        description: item.description,
        amount: item.amount,
        quantity: item.quantity,
      })),
      tax: (upcomingInvoice as any).tax || 0,
      total: upcomingInvoice.total,
    };
  }

  /**
   * Apply coupon to subscription
   */
  async applyCoupon(userId: string, couponCode: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new AppError('No subscription found', 404);
    }

    if (!subscription.stripeSubscriptionId) {
      throw new AppError('No active Stripe subscription', 400);
    }

    // Validate coupon exists in Stripe
    let coupon;
    try {
      coupon = await stripe.coupons.retrieve(couponCode);
    } catch (error) {
      throw new AppError('Invalid coupon code', 400);
    }

    if (!coupon.valid) {
      throw new AppError('Coupon is not valid or has expired', 400);
    }

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      discounts: [{ coupon: couponCode }],
    });

    return {
      code: coupon.id,
      percentOff: coupon.percent_off || null,
      amountOff: coupon.amount_off || null,
      currency: coupon.currency?.toUpperCase() || null,
      duration: coupon.duration,
      durationInMonths: coupon.duration_in_months || null,
    };
  }

  async getSubscriptionConfig(userId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    // If user already had a subscription before, they're not eligible for trial
    const hasHadSubscriptionBefore = subscription?.stripeSubscriptionId !== null;

    return {
      priceId: STRIPE_CONFIG.MONTHLY_PRICE_ID,
      amount: 999,
      currency: 'EUR',
      interval: 'month',
      trialDays: 7,
      isEligibleForTrial: !hasHadSubscriptionBefore, // ← NEW
    };
  }
}
