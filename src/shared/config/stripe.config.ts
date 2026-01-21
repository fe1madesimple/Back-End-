import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover', // Use latest API version
  typescript: true,
});

// Stripe Price IDs 
export const STRIPE_CONFIG = {
  MONTHLY_PRICE_ID: process.env.STRIPE_MONTHLY_PRICE_ID!,
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
};