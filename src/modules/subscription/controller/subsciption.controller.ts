import { Request, Response } from 'express';
import { SubscriptionService } from '../service/subscription.service';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils';
import { ICreateCheckoutSessionRequest } from '../interface/subscription.interface';
import { AppError } from '@/shared/utils';

const subscriptionService = new SubscriptionService();

export class SubscriptionController {
  /**
   * @route   POST /api/v1/subscription/create-checkout-session
   * @desc    Create Stripe checkout session for subscription
   * @access  Private (Authenticated users only)
   */
  createCheckoutSession = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.user.id;
    const data: ICreateCheckoutSessionRequest = req.body;

    const session = await subscriptionService.createCheckoutSession(userId, data);

    return sendSuccess(res, 'Checkout session created successfully', session);
  });

  /**
   * @route   POST /api/v1/subscription/webhook
   * @desc    Handle Stripe webhook events
   * @access  Public (Stripe only)
   */
  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      throw new AppError('Missing stripe-signature header', 400);
    }

    const rawBody = req.body;

    const result = await subscriptionService.handleWebhook(signature, rawBody);

    return sendSuccess(res, 'Webhook received', result);
  });

  /**
   * @route   GET /api/v1/subscription/status
   * @desc    Get current user's subscription status
   * @access  Private
   */
  getSubscriptionStatus = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.user.id;

    const subscription = await subscriptionService.getSubscriptionStatus(userId);

    if (!subscription) {
      throw new AppError('No subscription found', 404);
    }

    // Calculate additional info
    const now = new Date();
    const daysRemaining = subscription.currentPeriodEnd
      ? Math.ceil((subscription.currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    const response = {
      subscription: {
        ...subscription,
        daysRemaining,
        willRenew: subscription.status === 'ACTIVE' && !subscription.cancelledAt,
      },
    };

    return sendSuccess(res, 'Subscription retrieved successfully', response);
  });

  /**
   * @route   POST /api/v1/subscription/cancel
   * @desc    Cancel user's subscription
   * @access  Private
   */
  cancelSubscription = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.user.id;

    await subscriptionService.cancelSubscription(userId);

    return sendSuccess(
      res,
      'Subscription cancelled successfully. Access continues until period ends.'
    );
  });

  /**
   * @route   GET /api/v1/subscription/billing-history
   * @desc    Get user's billing history
   * @access  Private
   */
  getBillingHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await subscriptionService.getBillingHistory(userId, page, limit);

    return sendSuccess(res, 'Billing history retrieved successfully', result);
  });

  /**
   * @route   GET /api/v1/subscription/portal
   * @desc    Generate Stripe Customer Portal URL
   * @access  Private
   */
  getCustomerPortal = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.user.id;

    const result = await subscriptionService.createCustomerPortalSession(userId);

    return sendSuccess(res, 'Customer portal URL generated', result);
  });

  /**
   * @route   POST /api/v1/subscription/resume
   * @desc    Resume cancelled subscription
   * @access  Private
   */
  resumeSubscription = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.user.id;

    await subscriptionService.resumeSubscription(userId);

    return sendSuccess(res, 'Subscription resumed successfully');
  });

  /**
   * @route   GET /api/v1/subscription/preview-invoice
   * @desc    Preview upcoming invoice
   * @access  Private
   */
  previewInvoice = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.user.id;

    const invoice = await subscriptionService.previewInvoice(userId);

    return sendSuccess(res, 'Invoice preview retrieved', invoice);
  });

  /**
   * @route   POST /api/v1/subscription/apply-coupon
   * @desc    Apply coupon to subscription
   * @access  Private
   */
  applyCoupon = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.user.id;
    const { couponCode } = req.body;

    const result = await subscriptionService.applyCoupon(userId, couponCode);

    return sendSuccess(res, 'Coupon applied successfully', result);
  });
}