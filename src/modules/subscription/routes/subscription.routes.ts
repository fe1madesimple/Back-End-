import { Router } from 'express';
import { SubscriptionController } from '../controller/subsciption.controller';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import { createCheckoutSessionSchema } from '../validator/subscription.validator';
import express from 'express';

const subscriptionRouter = Router();
const subscriptionController = new SubscriptionController();

/**
 * @swagger
 * /api/v1/subscription/create-checkout-session:
 *   post:
 *     summary: Create Stripe checkout session
 *     description: Creates a Stripe Checkout session for subscribing to the premium plan. User must have completed their 7-day trial.
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priceId
 *               - successUrl
 *               - cancelUrl
 *             properties:
 *               priceId:
 *                 type: string
 *                 description: Stripe Price ID for the subscription plan
 *                 example: price_1SrlzdRK2xB6X2uOkYBHZn2s
 *               successUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL to redirect after successful payment
 *                 example: https://fe1madesimple.com/dashboard?success=true
 *               cancelUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL to redirect if user cancels
 *                 example: https://fe1madesimple.com/subscription
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Checkout session created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     sessionId:
 *                       type: string
 *                       example: cs_test_abc123xyz
 *                     url:
 *                       type: string
 *                       example: https://checkout.stripe.com/c/pay/cs_test_abc123xyz
 *       400:
 *         description: Bad request - Invalid data or user already subscribed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: You already have an active subscription
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
subscriptionRouter.post(
  '/create-checkout-session',
  protect,
  validate(createCheckoutSessionSchema),
  subscriptionController.createCheckoutSession
);


/**
 * @swagger
 * /api/v1/subscription/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     description: Receives webhook events from Stripe (payment succeeded, subscription updated, etc.)
 *     tags: [Subscription]
 *     responses:
 *       200:
 *         description: Webhook received successfully
 *       400:
 *         description: Invalid signature
 */

subscriptionRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  subscriptionController.handleWebhook
);

export default subscriptionRouter