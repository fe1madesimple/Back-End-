import { Router } from 'express';
import { SubscriptionController } from '../controller/subsciption.controller';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import {
  createCheckoutSessionSchema,
  applyCouponSchema,
} from '../validator/subscription.validator';
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

/**
 * @swagger
 * /api/v1/subscription/status:
 *   get:
 *     summary: Get current subscription status
 *     description: Retrieves the authenticated user's subscription details
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription retrieved successfully
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
 *                   example: Subscription retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     subscription:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         status:
 *                           type: string
 *                           enum: [TRIAL, ACTIVE, EXPIRED, CANCELLED, SUSPENDED]
 *                         planType:
 *                           type: string
 *                           enum: [MONTHLY, ANNUAL]
 *                         currentPeriodStart:
 *                           type: string
 *                           format: date-time
 *                         currentPeriodEnd:
 *                           type: string
 *                           format: date-time
 *                         daysRemaining:
 *                           type: integer
 *                         willRenew:
 *                           type: boolean
 *                         cancelledAt:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No subscription found
 */
subscriptionRouter.get('/status', protect, subscriptionController.getSubscriptionStatus);

/**
 * @swagger
 * /api/v1/subscription/cancel:
 *   post:
 *     summary: Cancel subscription
 *     description: Cancels the user's subscription. Access continues until current period ends.
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *       400:
 *         description: Already cancelled or no active subscription
 *       404:
 *         description: No subscription found
 */
subscriptionRouter.post('/cancel', protect, subscriptionController.cancelSubscription);

/**
 * @swagger
 * /api/v1/subscription/billing-history:
 *   get:
 *     summary: Get billing history
 *     description: Retrieves the user's payment history
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Billing history retrieved successfully
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
 *                   example: Billing history retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     payments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           userId:
 *                             type: string
 *                           subscriptionId:
 *                             type: string
 *                           amount:
 *                             type: integer
 *                             example: 999
 *                           currency:
 *                             type: string
 *                             example: EUR
 *                           status:
 *                             type: string
 *                             enum: [SUCCESS, FAILED, PENDING]
 *                           stripePaymentIntentId:
 *                             type: string
 *                           stripeInvoiceId:
 *                             type: string
 *                           paymentMethod:
 *                             type: string
 *                           metadata:
 *                             type: object
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       404:
 *         description: No subscription found
 */
subscriptionRouter.get('/billing-history', protect, subscriptionController.getBillingHistory);

/**
 * @swagger
 * /api/v1/subscription/portal:
 *   get:
 *     summary: Get Stripe Customer Portal URL
 *     description: |
 *       Generates a URL to Stripe's hosted customer portal where users can manage their subscription, update payment methods, and view invoices.
 *
 *       **Note:** After completing actions in the portal, users will be redirected back to your application's subscription page. The frontend engineer must create a subscription route page where users will land after completing actions on the Stripe portal.
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Portal URL generated successfully
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
 *                   example: Customer portal URL generated
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://billing.stripe.com/p/session/test_xxx
 *       400:
 *         description: No Stripe customer found
 *       404:
 *         description: No subscription found
 */
subscriptionRouter.get('/portal', protect, subscriptionController.getCustomerPortal);

/**
 * @swagger
 * /api/v1/subscription/resume:
 *   post:
 *     summary: Resume cancelled subscription
 *     description: Reactivates a cancelled subscription before the current period ends
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription resumed successfully
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
 *                   example: Subscription resumed successfully
 *       400:
 *         description: Subscription is not cancelled
 *       404:
 *         description: No subscription found
 */
subscriptionRouter.post('/resume', protect, subscriptionController.resumeSubscription);

/**
 * @swagger
 * /api/v1/subscription/preview-invoice:
 *   get:
 *     summary: Preview upcoming invoice
 *     description: Shows what the user will be charged on their next billing date
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invoice preview retrieved
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
 *                   example: Invoice preview retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: integer
 *                       example: 999
 *                     currency:
 *                       type: string
 *                       example: EUR
 *                     billingDate:
 *                       type: string
 *                       format: date-time
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           description:
 *                             type: string
 *                           amount:
 *                             type: integer
 *                           quantity:
 *                             type: integer
 *                     tax:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       400:
 *         description: No active subscription
 *       404:
 *         description: No subscription found
 */
subscriptionRouter.get('/preview-invoice', protect, subscriptionController.previewInvoice);

/**
 * @swagger
 * /api/v1/subscription/apply-coupon:
 *   post:
 *     summary: Apply coupon to subscription
 *     description: Applies a promotional coupon code to the user's subscription
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
 *               - couponCode
 *             properties:
 *               couponCode:
 *                 type: string
 *                 example: STUDENT50
 *     responses:
 *       200:
 *         description: Coupon applied successfully
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
 *                   example: Coupon applied successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: STUDENT50
 *                     percentOff:
 *                       type: number
 *                       nullable: true
 *                       example: 50
 *                     amountOff:
 *                       type: number
 *                       nullable: true
 *                       example: null
 *                     currency:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     duration:
 *                       type: string
 *                       example: once
 *                     durationInMonths:
 *                       type: number
 *                       nullable: true
 *                       example: null
 *       400:
 *         description: Invalid coupon or no active subscription
 *       404:
 *         description: No subscription found
 */
subscriptionRouter.post(
  '/apply-coupon',
  protect,
  validate(applyCouponSchema),
  subscriptionController.applyCoupon
);

/**
 * @swagger
 * /api/v1/subscription/config:
 *   get:
 *     summary: Get subscription configuration
 *     description: |
 *       Returns public subscription details including price ID, amount, currency, and trial eligibility.
 *
 *       **Frontend Usage:**
 *       1. Call this endpoint when loading the subscription page
 *       2. Use `priceId` to create checkout session
 *       3. Use `amount`, `currency`, `interval` to display pricing
 *       4. Use `isEligibleForTrial` to show/hide trial messaging
 *
 *       **Trial Eligibility:**
 *       - `isEligibleForTrial: true` → User never subscribed before (show "7-day free trial")
 *       - `isEligibleForTrial: false` → User had subscription before (show "€9.99/month" only)
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Configuration retrieved successfully
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
 *                   example: Subscription config retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     priceId:
 *                       type: string
 *                       description: Stripe Price ID (use this in create-checkout-session)
 *                       example: price_1SrlzdRK2xB6X2uOkYBHZn2s
 *                     amount:
 *                       type: integer
 *                       description: Price in cents (999 = €9.99)
 *                       example: 999
 *                     currency:
 *                       type: string
 *                       description: Currency code
 *                       example: EUR
 *                     interval:
 *                       type: string
 *                       description: Billing interval
 *                       example: month
 *                     trialDays:
 *                       type: integer
 *                       description: Number of trial days (if eligible)
 *                       example: 7
 *                     isEligibleForTrial:
 *                       type: boolean
 *                       description: Whether this user qualifies for trial
 *                       example: true
 *       401:
 *         description: Unauthorized - Authentication required
 */
subscriptionRouter.get('/config', protect, subscriptionController.getSubscriptionConfig);

export default subscriptionRouter;
