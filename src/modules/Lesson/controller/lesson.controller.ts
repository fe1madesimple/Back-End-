import { AppError } from '@/shared/utils';
import { asyncHandler } from '@/shared/utils';
import lessonService from '../service/lesson.service';
import { Request, Response } from 'express';
import { sendSuccess } from '@/shared/utils';

export const getLessonById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId = req.user!.user.id;
  const { id } = req.params;

  if (!id) return new AppError('lesson id must be supplied');

  const lesson = await lessonService.getLessonById(userId, id);

  sendSuccess(res, 'Lesson retrieved successfully', { lesson });
});

// src/modules/content/controller/content.controller.ts

export const trackVideoProgress = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  const { currentTime, videoDuration } = req.body;

  if (!id) throw new AppError("lesson id must be provided")

  await lessonService.trackVideoProgress(userId, id, currentTime, videoDuration);

  sendSuccess(res, 'Video progress tracked');
});

export const trackTimeSpent = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  const { seconds } = req.body;

  if (!id) throw new AppError('lesson id must be provided');

  await lessonService.trackTimeSpent(userId, id, seconds);

  sendSuccess(res, 'Time tracked successfully');
});
