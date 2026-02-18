// src/modules/achievements/controllers/achievement.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils';
import achievementsService from '../service/achievements.service';

export const getAllAchievements = asyncHandler(async (_req: Request, res: Response) => {
  const achievements = await achievementsService.getAllAchievements();
  sendSuccess(res, 'Achievements retrieved successfully', achievements);
});

export const getUserAchievements = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const achievements = await achievementsService.getUserAchievements(userId);
  sendSuccess(res, 'User achievements retrieved successfully', achievements);
});
