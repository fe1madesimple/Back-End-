import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import practiseService from '../service/practise.service';
import { sendSuccess } from '@/shared/utils';
import { PastQuestionsQuery } from '../interface/practise.interface';

// src/modules/content/controller/content.controller.ts

export const getQuickQuiz = asyncHandler(async (_req: Request, res: Response) => {
  const quiz = await practiseService.getQuickQuiz();

  sendSuccess(res, 'Quick quiz retrieved', quiz);
});
// src/modules/content/controller/content.controller.ts

export const getMixedChallenge = asyncHandler(async (_req: Request, res: Response) => {
  const challenge = await practiseService.getMixedChallenge();

  sendSuccess(res, 'mixed questions retrieved', challenge);
});

// src/modules/content/controller/content.controller.ts

export const getTopicPractice = asyncHandler(async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  if (!subjectId) throw new AppError('subject id must be supplied');

  const practice = await practiseService.getMixedPractice(subjectId);

  sendSuccess(res, 'Mixed practice retrieved', practice);
});

export const getPastQuestions = asyncHandler(async (req: Request, res: Response) => {
  const query: PastQuestionsQuery = {
    search: req.query.search as string | undefined,
    year: req.query.year as number | undefined,
    examType: req.query.examType as string | undefined,
    page: req.query.page as number | undefined,
    limit: req.query.limit as number | undefined,
  };

  const result = await practiseService.getPastQuestions(query);

  sendSuccess(res, 'Past questions retrieved', result);
});

export const getPastQuestionById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;

  if (!id) throw new AppError('past question id must be supplied');

  const question = await practiseService.getPastQuestionById(id, userId);

  sendSuccess(res, 'Past question retrieved', { question });
});

export const getQuizResults = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { attemptIds } = req.body;

  if (!attemptIds || !Array.isArray(attemptIds) || attemptIds.length === 0) {
    throw new AppError('attemptIds array is required');
  }

  const results = await practiseService.getQuizResults(userId, attemptIds);

  sendSuccess(res, 'Quiz results retrieved', results);
});