// src/modules/subscription/service/subscription.service.ts

import Stripe from 'stripe';
import { prisma } from '@/shared/config';
import { stripe, STRIPE_CONFIG, getPlanTypeFromPriceId } from '@/shared/config/stripe.config';
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
  // ─── getSubscriptionConfig ──────────────────────────────────────────────────
  // Called when the pricing page loads.
  // Returns all 4 price IDs + amounts so the frontend can:
  //   1. Render the pricing cards with correct amounts
  //   2. Pass the correct priceId to createCheckoutSession when card is clicked
  //
  // Frontend flow:
  //   User toggles Monthly/Annual → user clicks Standard or Premium card
  //   → frontend picks plans.standard.monthly.priceId (or whichever combo)
  //   → calls POST /subscription/create-checkout-session with that priceId

  async getSubscriptionConfig(userId: string): Promise<any> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: { stripeSubscriptionId: true },
    });

    

    return {
      plans: {
        standard: {
          monthly: {
            priceId: STRIPE_CONFIG.STANDARD_MONTHLY_PRICE_ID,
            amount: STRIPE_CONFIG.PRICES.STANDARD_MONTHLY.amount,
            currency: 'EUR',
            interval: STRIPE_CONFIG.PRICES.STANDARD_MONTHLY.interval,
            label: STRIPE_CONFIG.PRICES.STANDARD_MONTHLY.label,
          },
          annual: {
            priceId: STRIPE_CONFIG.STANDARD_ANNUAL_PRICE_ID,
            amount: STRIPE_CONFIG.PRICES.STANDARD_ANNUAL.amount,
            currency: 'EUR',
            interval: STRIPE_CONFIG.PRICES.STANDARD_ANNUAL.interval,
            label: STRIPE_CONFIG.PRICES.STANDARD_ANNUAL.label,
          },
        },
        pro: {
          monthly: {
            priceId: STRIPE_CONFIG.PRO_MONTHLY_PRICE_ID,
            amount: STRIPE_CONFIG.PRICES.PRO_MONTHLY.amount,
            currency: 'EUR',
            interval: STRIPE_CONFIG.PRICES.PRO_MONTHLY.interval,
            label: STRIPE_CONFIG.PRICES.PRO_MONTHLY.label,
          },
          annual: {
            priceId: STRIPE_CONFIG.PRO_ANNUAL_PRICE_ID,
            amount: STRIPE_CONFIG.PRICES.PRO_ANNUAL.amount,
            currency: 'EUR',
            interval: STRIPE_CONFIG.PRICES.PRO_ANNUAL.interval,
            label: STRIPE_CONFIG.PRICES.PRO_ANNUAL.label,
          },
        },
      },
    };
  }

  // ─── createCheckoutSession ──────────────────────────────────────────────────
  // Frontend calls this after user clicks a pricing card.
  // Frontend supplies the priceId it got from getSubscriptionConfig.
  // We validate the priceId is one of our known 4 before proceeding.

  async createCheckoutSession(
    userId: string,
    data: ICreateCheckoutSessionRequest
  ): Promise<ICheckoutSessionResponse> {
    // Validate priceId is one of our known prices — reject unknown IDs
    const validPriceIds = [
      STRIPE_CONFIG.STANDARD_MONTHLY_PRICE_ID,
      STRIPE_CONFIG.STANDARD_ANNUAL_PRICE_ID,
      STRIPE_CONFIG.PRO_MONTHLY_PRICE_ID,
      STRIPE_CONFIG.PRO_ANNUAL_PRICE_ID,
    ];

    if (!validPriceIds.includes(data.priceId)) {
      throw new AppError('Invalid price ID', 400);
    }

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

    if (!user) throw new AppError('User not found', 404);

    if (user.subscription?.status === 'ACTIVE') {
      throw new AppError('You already have an active subscription', 400);
    }

    // Get or create Stripe customer
    let stripeCustomerId = user.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName ?? undefined,
        metadata: { userId: user.id },
      });

      stripeCustomerId = customer.id;

      await prisma.subscription.update({
        where: { userId: user.id },
        data: { stripeCustomerId: customer.id },
      });
    }

    // Check trial eligibility
    const isEligibleForTrial = !user.subscription?.stripeCustomerId;

    // Build session params
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [{ price: data.priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      metadata: { userId: user.id },
    };

    // Add trial only if eligible
    if (isEligibleForTrial) {
      sessionParams.subscription_data = {
        trial_period_days: 7,
        metadata: { userId: user.id },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      sessionId: session.id,
      url: session.url!,
    };
  }

  // ─── handleWebhook ──────────────────────────────────────────────────────────

  async handleWebhook(signature: string, rawBody: Buffer): Promise<IWebhookResponse> {
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_CONFIG.WEBHOOK_SECRET);
    } catch (error) {
      console.error('❌ Invalid webhook signature');
      throw new AppError('Invalid webhook signature', 400);
    }

    console.log(`✅ Webhook received: ${event.type}`);

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

    return { received: true, event: event.type };
  }

  // ─── handleCheckoutSessionCompleted ────────────────────────────────────────

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    if (!userId) {
      console.error('No userId in checkout session metadata');
      return;
    }
    console.log(`✅ Checkout completed for user: ${userId}`);
  }

  // ─── handleSubscriptionCreated ──────────────────────────────────────────────
  // This is where planType is set — we resolve it from the priceId
  // using getPlanTypeFromPriceId() so we know Standard vs Premium + interval.

  private async handleSubscriptionCreated(subscription: Stripe.Subscription) {
    // Resolve userId from metadata or customer lookup
    let userId = (subscription.metadata as any)?.userId as string | undefined;

    if (!userId) {
      const customerId = subscription.customer as string;
      const existing = await prisma.subscription.findFirst({
        where: { stripeCustomerId: customerId },
        select: { userId: true },
      });
      if (!existing) {
        console.error(`No subscription found for customer: ${customerId}`);
        return;
      }
      userId = existing.userId;
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

    // Resolve which plan was purchased from the priceId
    let planType: 'STANDARD_MONTHLY' | 'STANDARD_ANNUAL' | 'PRO_MONTHLY' | 'PRO_ANNUAL';
    try {
      planType = getPlanTypeFromPriceId(priceId);
    } catch {
      console.error(`Unknown priceId in subscription: ${priceId}`);
      return;
    }

    const stripeAny = subscription as any;
    const periodStart = stripeAny.current_period_start || stripeAny.billing_cycle_anchor;
    const periodEnd = stripeAny.current_period_end;

    const currentPeriodStart = periodStart ? new Date(Number(periodStart) * 1000) : new Date();

    const currentPeriodEnd = periodEnd
      ? new Date(Number(periodEnd) * 1000)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.subscription.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId,
        status: 'ACTIVE',
        planType, // ← now properly set: STANDARD_MONTHLY etc.
        currentPeriodStart,
        currentPeriodEnd,
        cancelledAt: null,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, fullName: true },
    });

    if (user) {
      await emailService.sendSubscriptionActivatedEmail(user.email, user.fullName!);
    }

    console.log(`✅ Subscription created — user: ${userId}, plan: ${planType}`);
  }

  // ─── handleSubscriptionUpdated ──────────────────────────────────────────────
  // Handles renewals, cancellation scheduling, plan changes.
  // planType is updated if the priceId changed (e.g. upgrade/downgrade).

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    let existingSubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

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

    // cancelledAt: only set when cancel_at_period_end = true (user scheduled cancellation)
    const cancelledAt = subscription.cancel_at_period_end
      ? subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : new Date()
      : null;

    // Resolve planType from priceId in case user upgraded/downgraded
    const priceId = subscription.items.data[0]?.price?.id;
    let planType = existingSubscription.planType;
    if (priceId) {
      try {
        planType = getPlanTypeFromPriceId(priceId);
      } catch {
        // priceId not recognised — keep existing planType
      }
    }

    const stripeAny = subscription as any;
    await prisma.subscription.update({
      where: { id: existingSubscription.id },
      data: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: priceId ?? undefined,
        planType,
        status:
          subscription.status === 'active'
            ? 'ACTIVE'
            : subscription.status === 'canceled'
              ? 'CANCELLED'
              : 'ACTIVE',

        currentPeriodStart: new Date(stripeAny.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeAny.current_period_end * 1000),
        cancelledAt,
      },
    });

    console.log(`✅ Subscription updated: ${subscription.id}, plan: ${planType}`);
  }

  // ─── handleSubscriptionDeleted ──────────────────────────────────────────────

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: { status: 'CANCELLED', cancelledAt: new Date() },
    });
    console.log(`✅ Subscription cancelled: ${subscription.id}`);
  }

  // ─── handleTrialWillEnd ─────────────────────────────────────────────────────

  private async handleTrialWillEnd(subscription: Stripe.Subscription) {
    const existing = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
      include: { user: { select: { id: true, email: true, fullName: true } } },
    });

    if (!existing) {
      console.error(`Subscription not found: ${subscription.id}`);
      return;
    }

    const trialEndDate = subscription.trial_end ? new Date(subscription.trial_end * 1000) : null;

    await emailService.sendTrialEndingReminder(
      existing.user.email,
      existing.user.fullName,
      trialEndDate
    );

    console.log(`⚠️ Trial ending in 3 days for: ${existing.user.email}`);
  }

  // ─── handlePaymentSucceeded ─────────────────────────────────────────────────
  // Upserts payment record — safe against duplicate webhooks.
  // Only sends email on genuinely new payment.

  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    const subscriptionId =
      (invoice as any).parent?.subscription_details?.subscription || (invoice as any).subscription;

    if (!subscriptionId) {
      console.error('No subscription ID in invoice');
      return;
    }

    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: { user: { select: { email: true, fullName: true } } },
    });

    if (!subscription) {
      console.log(`⚠️ Subscription not found yet: ${subscriptionId}`);
      return;
    }

    const paymentIntentId = ((invoice as any).payment_intent || invoice.id) as string;

    const existingPayment = await prisma.payment.findUnique({
      where: { stripePaymentIntentId: paymentIntentId },
    });

    await prisma.payment.upsert({
      where: { stripePaymentIntentId: paymentIntentId },
      update: {},
      create: {
        userId: subscription.userId,
        subscriptionId: subscription.id,
        amount: invoice.amount_paid,
        currency: invoice.currency.toUpperCase(),
        status: 'SUCCESS',
        stripePaymentIntentId: paymentIntentId,
        stripeInvoiceId: invoice.id,
        paymentMethod: 'card',
        metadata: {
          invoiceNumber: (invoice as any).number,
          hostedInvoiceUrl: (invoice as any).hosted_invoice_url,
        },
      },
    });

    if (!existingPayment) {
      const nextBillingDate = new Date(
        (invoice as any).lines?.data[0]?.period?.end * 1000 || Date.now()
      );

      await emailService.sendPaymentSuccessEmail(
        subscription.user.email,
        subscription.user.fullName!,
        invoice.amount_paid,
        invoice.currency.toUpperCase(),
        nextBillingDate,
        (invoice as any).hosted_invoice_url
      );

      console.log(`✅ Payment success email sent: ${subscriptionId}`);
    } else {
      console.log(`⚠️ Duplicate webhook — skipping email: ${paymentIntentId}`);
    }
  }

  // ─── handlePaymentFailed ────────────────────────────────────────────────────

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const subscriptionId =
      (invoice as any).parent?.subscription_details?.subscription || (invoice as any).subscription;

    if (!subscriptionId) {
      console.error('No subscription ID in invoice');
      return;
    }

    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: { user: { select: { id: true, email: true, fullName: true } } },
    });

    if (!subscription) {
      console.error(`Subscription not found: ${subscriptionId}`);
      return;
    }

    await prisma.payment.create({
      data: {
        userId: subscription.userId,
        subscriptionId: subscription.id,
        amount: invoice.amount_due,
        currency: invoice.currency.toUpperCase(),
        status: 'FAILED',
        stripePaymentIntentId: ((invoice as any).payment_intent as string) || invoice.id,
        stripeInvoiceId: invoice.id,
        paymentMethod: 'card',
      },
    });

    await emailService.sendPaymentFailedEmail(
      subscription.user.email,
      subscription.user.fullName,
      'Your payment failed. Please update your payment method to continue your subscription.'
    );

    console.log(`❌ Payment failed: ${subscriptionId}`);
  }

  // ─── handlePaymentIntentFailed ──────────────────────────────────────────────

  private async handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
    const invoiceId = (paymentIntent as any).invoice as string | null;
    if (!invoiceId) return;

    try {
      const invoice = await stripe.invoices.retrieve(invoiceId);
      const subscriptionId = (invoice as any).subscription as string | null;
      if (!subscriptionId) return;

      const subscription = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: subscriptionId },
        include: { user: { select: { id: true, email: true, fullName: true } } },
      });

      if (!subscription) return;

      const failureCode = paymentIntent.last_payment_error?.code || 'unknown';
      const declineCode = paymentIntent.last_payment_error?.decline_code;
      const failureMsg = paymentIntent.last_payment_error?.message || 'Payment failed';

      let userMessage = failureMsg;
      if (declineCode === 'insufficient_funds') {
        userMessage = 'Your card has insufficient funds. Please use a different payment method.';
      } else if (declineCode === 'expired_card') {
        userMessage = 'Your card has expired. Please update your payment method.';
      } else if (failureCode === 'card_declined') {
        userMessage = 'Your card was declined. Please contact your bank or use a different card.';
      }

      await emailService.sendPaymentFailedEmail(
        subscription.user.email,
        subscription.user.fullName,
        userMessage
      );

      console.log(`❌ Payment Intent Failed — user: ${subscription.user.id}, code: ${failureCode}`);
    } catch (error) {
      console.error('Error handling payment intent failed:', error);
    }
  }

  // ─── getSubscriptionStatus ──────────────────────────────────────────────────

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

    if (!subscription) return null;

    const willRenew = subscription.status === 'ACTIVE' && !subscription.cancelledAt;

    return { ...subscription, willRenew };
  }

  // ─── cancelSubscription ─────────────────────────────────────────────────────

  async cancelSubscription(userId: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: { user: { select: { email: true, fullName: true } } },
    });

    if (!subscription) throw new AppError('No subscription found', 404);
    if (subscription.status === 'CANCELLED')
      throw new AppError('Subscription is already cancelled', 400);
    if (!subscription.stripeSubscriptionId)
      throw new AppError('No active Stripe subscription', 400);

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    await prisma.subscription.update({
      where: { userId },
      data: { cancelledAt: new Date() },
    });

    await emailService.sendSubscriptionCancelledEmail(
      subscription.user.email,
      subscription.user.fullName!,
      subscription.currentPeriodEnd!
    );
  }

  // ─── resumeSubscription ─────────────────────────────────────────────────────

  async resumeSubscription(userId: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: { user: { select: { email: true, fullName: true } } },
    });

    if (!subscription) throw new AppError('No subscription found', 404);
    if (!subscription.cancelledAt)
      throw new AppError('Subscription is not scheduled for cancellation', 400);
    if (!subscription.stripeSubscriptionId)
      throw new AppError('No active Stripe subscription', 400);

    if (subscription.currentPeriodEnd && subscription.currentPeriodEnd < new Date()) {
      throw new AppError('Subscription period has ended, please re-subscribe', 400);
    }

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    await prisma.subscription.update({
      where: { userId },
      data: { cancelledAt: null },
    });

    await emailService.sendSubscriptionResumedEmail(
      subscription.user.email,
      subscription.user.fullName!,
      subscription.currentPeriodEnd!
    );
  }

  // ─── getBillingHistory ──────────────────────────────────────────────────────

  async getBillingHistory(userId: string, page: number = 1, limit: number = 10) {
    const subscription = await prisma.subscription.findUnique({ where: { userId } });
    if (!subscription) throw new AppError('No subscription found', 404);

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
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ─── createCustomerPortalSession ────────────────────────────────────────────

  async createCustomerPortalSession(userId: string): Promise<{ url: string }> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: { user: { select: { email: true, fullName: true } } },
    });

    if (!subscription) throw new AppError('No subscription found', 404);

    let stripeCustomerId = subscription.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: subscription.user.email,
        name: subscription.user.fullName || 'User',
        metadata: { userId },
      });

      stripeCustomerId = customer.id;

      await prisma.subscription.update({
        where: { userId },
        data: { stripeCustomerId: customer.id },
      });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/subscription`,
    });

    return { url: session.url };
  }

  // ─── previewInvoice ─────────────────────────────────────────────────────────

  async previewInvoice(userId: string) {
    const subscription = await prisma.subscription.findUnique({ where: { userId } });
    if (!subscription) throw new AppError('No subscription found', 404);
    if (!subscription.stripeSubscriptionId)
      throw new AppError('No active Stripe subscription', 400);

    const invoiceList = await stripe.invoices.list({
      subscription: subscription.stripeSubscriptionId,
      limit: 1,
    });

    const upcomingInvoice = invoiceList.data[0];
    if (!upcomingInvoice) throw new AppError('No upcoming invoice found', 404);

    return {
      amount: upcomingInvoice.amount_due,
      currency: upcomingInvoice.currency.toUpperCase(),
      billingDate: new Date(((upcomingInvoice as any).period_end || 0) * 1000),
      items: upcomingInvoice.lines.data.map((item: any) => ({
        description: item.description,
        amount: item.amount,
        quantity: item.quantity,
      })),
      tax: (upcomingInvoice as any).tax || 0,
      total: upcomingInvoice.total,
    };
  }

  // ─── applyCoupon ────────────────────────────────────────────────────────────

  async applyCoupon(userId: string, couponCode: string) {
    const subscription = await prisma.subscription.findUnique({ where: { userId } });
    if (!subscription) throw new AppError('No subscription found', 404);
    if (!subscription.stripeSubscriptionId)
      throw new AppError('No active Stripe subscription', 400);

    let coupon: Stripe.Coupon;
    try {
      coupon = await stripe.coupons.retrieve(couponCode);
    } catch {
      throw new AppError('Invalid coupon code', 400);
    }

    if (!coupon.valid) throw new AppError('Coupon is not valid or has expired', 400);

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
}
