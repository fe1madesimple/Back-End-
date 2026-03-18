// src/modules/subscription/interface/subscription.interface.ts

import { SubscriptionStatus, PlanType } from '@prisma/client';

// ─── Request DTOs ─────────────────────────────────────────────────────────────

export interface ICreateCheckoutSessionRequest {
  priceId: string; // one of the 4 price IDs — frontend picks based on toggle + card
  successUrl: string;
  cancelUrl: string;
}

// ─── Response DTOs ────────────────────────────────────────────────────────────

export interface ICheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface ISubscriptionResponse {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  planType: PlanType | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
  cancelledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  willRenew: boolean;
}

// ─── Subscription Config Response ────────────────────────────────────────────
// Returned by GET /subscription/config
// Frontend uses this to render the pricing cards and pass the correct priceId
// to createCheckoutSession when user clicks a card.

export interface IPlanConfig {
  priceId: string;
  amount: number; // in cents e.g. 900 = €9.00
  currency: string; // 'EUR'
  interval: string; // 'month' | 'year'
  label: string; // 'Standard Monthly' etc
}

export interface ISubscriptionConfigResponse {
  isEligibleForTrial: boolean; // false if user has ever had a stripe subscription
  trialDays: number; // 7
  plans: {
    standard: {
      monthly: IPlanConfig;
      annual: IPlanConfig;
    };
    pro: {
      monthly: IPlanConfig;
      annual: IPlanConfig;
    };
  };
}

// ─── Webhook ──────────────────────────────────────────────────────────────────

export enum StripeWebhookEvent {
  CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed',
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  INVOICE_PAYMENT_SUCCEEDED = 'invoice.payment_succeeded',
  INVOICE_PAYMENT_FAILED = 'invoice.payment_failed',
  CUSTOMER_SUBSCRIPTION_TRIAL_WILL_END = 'customer.subscription.trial_will_end',
  PAYMENT_INTENT_PAYMENT_FAILED = 'payment_intent.payment_failed',
}

export interface IWebhookResponse {
  received: boolean;
  event: string;
}
