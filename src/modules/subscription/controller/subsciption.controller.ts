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
}