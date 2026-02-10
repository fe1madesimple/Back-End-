import { asyncHandler } from '@/shared/utils';
import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import questionsService from '../service/questions.service';
import { sendSuccess } from '@/shared/utils';
import { MCQAttemptInput } from '@/modules/practise/interface/practise.interface';

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

export const attemptMCQ = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id: questionId } = req.params;
  const input: MCQAttemptInput = req.body;
  if (!questionId) throw new AppError("questionId must be provided")

  const result = await questionsService.attemptMCQ(userId, questionId, input);

  sendSuccess(res, 'Answer submitted', result);
});

