import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';

// ✅ CRITICAL: Load .env file FIRST before reading any environment variables
dotenv.config({ path: path.join(__dirname, '../../../.env') });

// ✅ Debug: Check what was loaded
console.log('==== STRIPE CONFIG LOADING ====');
console.log('STRIPE_WEBHOOK_SECRET from env:', process.env.STRIPE_WEBHOOK_SECRET);
console.log('STRIPE_WEBHOOK_SECRET length:', process.env.STRIPE_WEBHOOK_SECRET?.length);
console.log('================================');

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not set');
}

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

// Export configuration
export const STRIPE_CONFIG = {
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  MONTHLY_PRICE_ID: process.env.STRIPE_MONTHLY_PRICE_ID!,
};

console.log('✅ Stripe configured');
console.log('✅ Webhook secret length:', STRIPE_CONFIG.WEBHOOK_SECRET.length);
