import { asyncHandler } from '@/shared/utils';
import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import questionsService from '../service/questions.service';
import { sendSuccess } from '@/shared/utils';

export const getModuleQuestions = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { moduleId } = req.params;

    if (!moduleId) return new AppError('module id must be supplied');

    const questions = await questionsService.getModuleQuestions(moduleId);

    sendSuccess(res, 'Questions retrieved successfully', {
      questions,
      total: questions.length,
    });
  }
);

export const attemptQuestion = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  const { answer, timeTakenSeconds } = req.body;

  if (!id) throw new AppError('question id is needed');

  const result = await questionsService.attemptMCQ(userId, id, answer, timeTakenSeconds);

  sendSuccess(res, 'Answer submitted', { result });
});
