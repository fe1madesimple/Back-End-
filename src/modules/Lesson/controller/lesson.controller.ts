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

export const getLessonMCQs = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;

  if (!id) throw new AppError('lesson id is required');

  const result = await lessonService.getLessonMCQs(id);

  sendSuccess(res, 'MCQ questions retrieved', result);
});

export const getLessonEssayQuestion = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;

  if (!id) throw new AppError('lesson id is required');

  const result = await lessonService.getLessonEssayQuestion(id);

  sendSuccess(res, 'Essay question retrieved', result);
});

export const submitLessonEssay = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { lessonId, essayQuestionId, answerText } = req.body;

  const result = await lessonService.submitLessonEssay(userId, {
    lessonId,
    essayQuestionId,
    answerText,
  });

  // result contains everything: question, userAnswer, sampleAnswer,
  // score, band, feedback, strengths, improvements — frontend renders
  // the review screen directly from this response.
  sendSuccess(res, 'Essay graded', result);
});

export const getAllLessonMCQs = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  if (!id) throw new AppError('lesson id is required');
  const result = await lessonService.getAllLessonMCQs(id);
  sendSuccess(res, 'All MCQ questions retrieved', result);
});
   
export const getAllLessonEssayQuestions = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  if (!id) throw new AppError('lesson id is required');
  const result = await lessonService.getAllLessonEssayQuestions(id);
  sendSuccess(res, 'All essay questions retrieved', result);
});