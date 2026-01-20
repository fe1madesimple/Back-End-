import { Request, Response } from 'express';
import { SubscriptionService } from '../service/subscription.service';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils';
import { ICreateCheckoutSessionRequest } from '../interface/subscription.interface';

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
}