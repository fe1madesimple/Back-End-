import Stripe from 'stripe';
import { prisma } from '@/shared/config';
import { stripe, STRIPE_CONFIG } from '@/shared/config/stripe.config';
import {
  ICreateCheckoutSessionRequest,
  ICheckoutSessionResponse,
  StripeWebhookEvent,IWebhookResponse
} from '../interface/subscription.interface';

import { AppError } from '@/shared/utils';

export class SubscriptionService {
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
          firstName: true,
          lastName: true,
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
          name: `${user.firstName} ${user.lastName}`,
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
      // 1. Verify webhook signature
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        STRIPE_CONFIG.WEBHOOK_SECRET
      );

      console.log(`Webhook received: ${event.type}`);

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

        case StripeWebhookEvent.INVOICE_PAYMENT_SUCCEEDED:
          await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;

        case StripeWebhookEvent.INVOICE_PAYMENT_FAILED:
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
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
        throw new AppError('Invalid webhook signature', 400);
      }

      console.error('Webhook error:', error);
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
  private async handleSubscriptionCreated(subscription: any) {
    const userId = subscription.metadata?.userId;

    if (!userId) {
      console.error('No userId in subscription metadata');
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

    console.log(`✅ Subscription created for user: ${userId}`);
  }

  /**
   * Handle customer.subscription.updated event
   */
  private async handleSubscriptionUpdated(subscription: any) {
    const existingSubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!existingSubscription) {
      console.error(`Subscription not found: ${subscription.id}`);
      return;
    }

    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
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
}
