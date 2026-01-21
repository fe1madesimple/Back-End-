import { z } from 'zod';

export const createCheckoutSessionSchema = z.object({
  body: z.object({
    priceId: z
      .string()
      .min(1, 'Price ID is required')
      .regex(/^price_[a-zA-Z0-9]+$/, 'Invalid Stripe Price ID format'),

    successUrl: z.string().url('Success URL must be a valid URL').min(1, 'Success URL is required'),

    cancelUrl: z.string().url('Cancel URL must be a valid URL').min(1, 'Cancel URL is required'),
  }),
});

export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>['body'];

export const applyCouponSchema = z.object({
  body: z.object({
    couponCode: z.string().min(1, 'Coupon code is required').max(50, 'Coupon code is too long'),
  }),
});