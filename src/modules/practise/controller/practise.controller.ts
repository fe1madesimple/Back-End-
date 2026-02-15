import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import practiseService from '../service/practise.service';
import { sendSuccess } from '@/shared/utils';
import { PastQuestionsQuery } from '../interface/practise.interface';
import simulationService from '../service/simulation.service';

export const getQuickQuiz = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const result = await practiseService.getQuickQuiz(userId);

  sendSuccess(res, 'Questions retrieved successfully', result);
});

export const getMixedChallenge = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const result = await practiseService.getMixedChallenge(userId);

  sendSuccess(res, 'Questions retrieved successfully', result);
});

export const getTopicChallenge = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { subjectId } = req.params;

  if (!subjectId) throw new AppError('subject id must be provided');

  const result = await practiseService.getTopicChallenge(userId, subjectId);

  sendSuccess(res, 'Questions retrieved successfully', result);
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

  const question = await practiseService.getPastQuestionDetail(userId, id);

  sendSuccess(res, 'Past question retrieved', { ...question });
});

export const getQuizResults = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { sessionId } = req.body;

  if (!sessionId) {
    throw new AppError('sessionId is required');
  }

  const results = await practiseService.getQuizResults(userId, sessionId);

  sendSuccess(res, 'Quiz results retrieved', results);
});

export const initiateStartPractice = asyncHandler(async (req: Request, res: Response) => {
  // const userId = req.user!.user.id;
  const { parentQuestionId } = req.body;

  if (!parentQuestionId) throw new AppError('parent question id must be supplied');

  const result = await practiseService.initiateStartPractice(parentQuestionId);
  sendSuccess(res, 'start practice initiated', result, 201);
});

export const startPractice = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { parentQuestionId } = req.body;

  if (!parentQuestionId) throw new AppError('parent question id must be supplied');

  const result = await practiseService.startPractice(parentQuestionId, userId);
  sendSuccess(res, 'practice begins', result, 201);
});

export const submitEssay = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const input = req.body;

  const result = await practiseService.submitEssay(userId, input);
  sendSuccess(res, 'Essay submitted and graded', result);
});

export const getNextQuestion = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { parentQuestionId, currentIndex } = req.body;

  const result = await practiseService.getNextQuestion(parentQuestionId, currentIndex, userId);
  sendSuccess(res, 'Next question retrieved', result);
});

export const getAttemptDetails = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { questionId, parentQuestionId } = req.params;

  if (!questionId) throw new AppError("question id must be provided")
  
  if (!parentQuestionId) throw new AppError('question id must be provided');

  const result = await practiseService.getAttemptDetails(userId, questionId, parentQuestionId);
  sendSuccess(res, 'Attempt details retrieved', result);
});