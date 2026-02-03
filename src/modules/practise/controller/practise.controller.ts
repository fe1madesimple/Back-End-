import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import practiseService from '../service/practise.service';
import { sendSuccess } from '@/shared/utils';

// src/modules/content/controller/content.controller.ts

export const getQuickQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { moduleId } = req.params;

  if (!moduleId) throw new AppError('module id must be supplied');

  const quiz = await practiseService.getQuickQuiz(moduleId);

  sendSuccess(res, 'Quick quiz retrieved', quiz);
});

// src/modules/content/controller/content.controller.ts

export const getTopicChallenge = asyncHandler(async (req: Request, res: Response) => {
  const { moduleId } = req.params;

  if (!moduleId) throw new AppError('module id needed');

  const challenge = await practiseService.getTopicChallenge(moduleId);

  sendSuccess(res, 'Topic challenge retrieved', challenge);
});

// src/modules/content/controller/content.controller.ts

export const getMixedPractice = asyncHandler(async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  if (!subjectId) throw new AppError('subject id must be supplied');

  const practice = await practiseService.getMixedPractice(subjectId);

  sendSuccess(res, 'Mixed practice retrieved', practice);
});
