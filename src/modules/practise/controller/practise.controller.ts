import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import practiseService from '../service/practise.service';
import { sendSuccess } from '@/shared/utils';
import { PastQuestionsQuery } from '../interface/practise.interface';

export const getQuickQuiz = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const result = await practiseService.getQuickQuiz(userId);

  sendSuccess(res, 'Questions retrieved successfully', result);
});

export const getMixedChallenge = asyncHandler(async (_req: Request, res: Response) => {
  const challenge = await practiseService.getMixedChallenge();

  sendSuccess(res, 'mixed questions retrieved', challenge);
});

export const getTopicPractice = asyncHandler(async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  if (!subjectId) throw new AppError('subject id must be supplied');

  const practice = await practiseService.getMixedPractice(subjectId);

  sendSuccess(res, 'Mixed practice retrieved', practice);
});

export const getPastQuestions = asyncHandler(async (req: Request, res: Response) => {
  const query: PastQuestionsQuery = {
    search: req.query.search as string | undefined,
    subject: req.query.subject as string | undefined,
    year: req.query.year ? parseInt(req.query.year as string, 10) : undefined,
    examType: req.query.examType as string | undefined,
    page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 9,
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
