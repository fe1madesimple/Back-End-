// src/shared/config/stripe.config.ts

import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set');
if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error('STRIPE_WEBHOOK_SECRET is not set');
if (!process.env.STRIPE_STANDARD_MONTHLY_PRICE_ID)
  throw new Error('STRIPE_STANDARD_MONTHLY_PRICE_ID is not set');
if (!process.env.STRIPE_STANDARD_ANNUAL_PRICE_ID)
  throw new Error('STRIPE_STANDARD_ANNUAL_PRICE_ID is not set');
if (!process.env.STRIPE_PRO_MONTHLY_PRICE_ID)
  throw new Error('STRIPE_PREMIUM_MONTHLY_PRICE_ID is not set');
if (!process.env.STRIPE_PRO_ANNUAL_PRICE_ID)
  throw new Error('STRIPE_PREMIUM_ANNUAL_PRICE_ID is not set');

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

export const STRIPE_CONFIG = {
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

  // 4 price IDs — one per tier + interval combination
  STANDARD_MONTHLY_PRICE_ID: process.env.STRIPE_STANDARD_MONTHLY_PRICE_ID,
  STANDARD_ANNUAL_PRICE_ID: process.env.STRIPE_STANDARD_ANNUAL_PRICE_ID,
  PRO_MONTHLY_PRICE_ID: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
  PRO_ANNUAL_PRICE_ID: process.env.STRIPE_PRO_ANNUAL_PRICE_ID,

  PRICES: {
    STANDARD_MONTHLY: { amount: 2900, interval: 'month', label: 'Standard Monthly' },
    STANDARD_ANNUAL: { amount: 24900, interval: 'year', label: 'Standard Annual' },
    PRO_MONTHLY: { amount: 4900, interval: 'month', label: 'Pro Monthly' },
    PRO_ANNUAL: { amount: 39900, interval: 'year', label: 'Pro Annual' },
  },
} as const;

// Helper: resolve PlanType enum value from a Stripe price ID
// Used in handleSubscriptionCreated to know which tier was purchased
export function getPlanTypeFromPriceId(
  priceId: string
): 'STANDARD_MONTHLY' | 'STANDARD_ANNUAL' | 'PRO_MONTHLY' | 'PRO_ANNUAL' {
  switch (priceId) {
    case STRIPE_CONFIG.STANDARD_MONTHLY_PRICE_ID:
      return 'STANDARD_MONTHLY';
    case STRIPE_CONFIG.STANDARD_ANNUAL_PRICE_ID:
      return 'STANDARD_ANNUAL';
    case STRIPE_CONFIG.PRO_MONTHLY_PRICE_ID:
      return 'PRO_MONTHLY';
    case STRIPE_CONFIG.PRO_ANNUAL_PRICE_ID:
      return 'PRO_ANNUAL';
    default:
      throw new Error(`Unknown price ID: ${priceId}`);
  }
}

console.log('✅ Stripe configured with 4 price IDs');
console.log('✅ Webhook secret length:', STRIPE_CONFIG.WEBHOOK_SECRET.length);
