// src/modules/content/controller/lesson.controller.ts

import { AppError, asyncHandler, sendSuccess } from '@/shared/utils';
import lessonService from '../service/lesson.service';
import { Request, Response } from 'express';

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
  if (!subjectId) throw new AppError('subjectId must be provided');
  const result = await lessonService.getModulesBySubject(userId, subjectId);
  sendSuccess(res, 'Modules retrieved successfully', result);
});

export const getLessonById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  if (!id) throw new AppError('lesson id is required');
  const result = await lessonService.getLessonById(userId, id);
  sendSuccess(res, 'Lesson retrieved successfully', result);
});

// ── GET /lessons/:id/mcq ──────────────────────────────────────────────────────
// Creates QuizSession, returns sessionId + 7 questions (no correctAnswer exposed)
export const getLessonMCQs = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  if (!id) throw new AppError('lesson id is required');
  const result = await lessonService.getLessonMCQs(userId, id);
  sendSuccess(res, 'MCQ questions retrieved', result);
});

// ── POST /lessons/mcq/attempt ─────────────────────────────────────────────────
// Body: { sessionId, answer, timeTakenSeconds }  — NO questionId
// Backend resolves current question from session.questionIds[questionsAnswered]
export const attemptMCQ = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { sessionId, answer, timeTakenSeconds } = req.body;
  if (!sessionId) throw new AppError('sessionId is required');
  if (!timeTakenSeconds && timeTakenSeconds !== 0)
    throw new AppError('timeTakenSeconds is required');
  const result = await lessonService.attemptMCQ(userId, { sessionId, answer, timeTakenSeconds });
  sendSuccess(res, 'MCQ attempt recorded', result);
});

// ── GET /lessons/mcq/results/:sessionId ──────────────────────────────────────
// Closes session, returns score, streak, motivational message
export const getQuizResults = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { sessionId } = req.params;
  if (!sessionId) throw new AppError('sessionId is required');
  const result = await lessonService.getQuizResults(userId, sessionId);
  sendSuccess(res, 'Quiz results retrieved', result);
});

// ── GET /lessons/:id/essay ────────────────────────────────────────────────────
// Creates PracticeSession immediately, returns practiceSessionId + question
export const getLessonEssayQuestion = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  if (!id) throw new AppError('lesson id is required');
  const result = await lessonService.getLessonEssayQuestion(userId, id);
  sendSuccess(res, 'Essay question retrieved', result);
});

// ── POST /lessons/essay/submit ────────────────────────────────────────────────
// Body: { practiceSessionId, answerText }  — nothing else needed
export const submitLessonEssay = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { practiceSessionId, answerText } = req.body;
  if (!practiceSessionId) throw new AppError('practiceSessionId is required');
  if (!answerText) throw new AppError('answerText is required');
  const result = await lessonService.submitLessonEssay(userId, { practiceSessionId, answerText });
  sendSuccess(res, 'Essay graded', result);
});

export const getAllLessonMCQs = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new AppError('lesson id is required');
  const result = await lessonService.getAllLessonMCQs(id);
  sendSuccess(res, 'All MCQ questions retrieved', result);
});

export const getAllLessonEssayQuestions = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new AppError('lesson id is required');
  const result = await lessonService.getAllLessonEssayQuestions(id);
  sendSuccess(res, 'All essay questions retrieved', result);
});

export const getAllMCQs = asyncHandler(async (_req: Request, res: Response) => {
  const result = await lessonService.getAllMCQs();
  sendSuccess(res, 'All MCQs retrieved', result);
});

export const getAllEssayQuestions = asyncHandler(async (_req: Request, res: Response) => {
  const result = await lessonService.getAllEssayQuestions();
  sendSuccess(res, 'All essay questions retrieved', result);
});

export const getNextQuestion = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { sessionId, index } = req.params;

  if (!sessionId) throw new AppError('sessionId is required');

  const questionIndex = parseInt(index ?? '0', 10);
  if (isNaN(questionIndex) || questionIndex < 0) {
    throw new AppError('index must be a non-negative integer');
  }

  const result = await lessonService.getNextQuestion(userId, sessionId, questionIndex);
  sendSuccess(res, 'Next question retrieved', result);
});

export const getAllLessons = asyncHandler(async (req: Request, res: Response) => {
  const { subjectId, moduleId, page, limit } = req.query;

  const result = await lessonService.getAllLessons({
    subjectId: subjectId as string | undefined,
    moduleId: moduleId as string | undefined,
    page: page ? parseInt(page as string) : 1,
    limit: limit ? parseInt(limit as string) : 50,
  });

  sendSuccess(res, 'Lessons retrieved', result);
});