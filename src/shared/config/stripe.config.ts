import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia', // Use latest API version
  typescript: true,
});

// Stripe Price IDs (create these in Stripe Dashboard)
export const STRIPE_PRICE_IDS = {
  MONTHLY: process.env.STRIPE_MONTHLY_PRICE_ID!,
  // ANNUAL: process.env.STRIPE_ANNUAL_PRICE_ID!, // If you add annual later
};
