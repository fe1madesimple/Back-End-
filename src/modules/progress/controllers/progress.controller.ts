// src/modules/progress/controller/progress.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import progressService from '../services/progress.service';

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const stats = await progressService.getDashboardStats(userId);

  sendSuccess(res, 'Dashboard stats retrieved', stats);
});
