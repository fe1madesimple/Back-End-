import { AppError } from '@/shared/utils';
import { asyncHandler } from '@/shared/utils';
import lessonService from '../service/lesson.service';
import { Request, Response } from 'express';
import { sendSuccess } from '@/shared/utils';



export const trackVideoProgress = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  const { currentTime, videoDuration } = req.body;

  if (!id) throw new AppError('lesson id must be provided');

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

export const getModulesBySubject = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { subjectId } = req.params;

  if (!subjectId) throw new AppError("subjectId must be provided")

  const result = await lessonService.getModulesBySubject(userId, subjectId);

  sendSuccess(res, 'Modules retrieved successfully', result);
});

export const getLessonById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;

  if (!id) throw new AppError("lesson id is required")

  const result = await lessonService.getLessonById(userId, id);

  sendSuccess(res, 'Lesson retrieved successfully', result);
});


