// src/modules/support/controllers/support.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import supportService from '../service/support.service';

export const scheduleOnboardingCall = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const result = await supportService.scheduleOnboardingCall(userId);
  sendSuccess(res, result.message, result);
});
