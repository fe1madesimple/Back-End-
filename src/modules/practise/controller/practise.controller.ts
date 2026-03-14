// src/modules/practise/controller/practise.controller.ts

import { Request, Response } from 'express';
import {
  getPastQuestionsService,
  startPracticeService,
  getPracticeQuestionService,
  submitPracticeService,
  getPracticeResultsService,
  getPracticeAttemptReviewService,
  failSimulationService
} from '../service/practise.service';
import { AppError } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils';

export async function getPastQuestions(req: Request, res: Response) {
  try {
    const { search, subject, year, page, limit } = req.query;
    const data = await getPastQuestionsService({
      search: search as string | undefined,
      subject: subject as string | undefined,
      year: year ? parseInt(year as string) : undefined,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 9,
    });
    res.json({ success: true, message: 'Past questions retrieved', data });
  } catch (error) {
    console.error('getPastQuestions error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve past questions' });
  }
}

export async function startPractice(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { subject, year } = req.body;
    const data = await startPracticeService(userId, { subject, year });
    res.status(201).json({ success: true, message: 'Practice session started', data });
  } catch (error: any) {
    console.error('startPractice error:', error);
    res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
  }
}

export async function getPracticeQuestion(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { sessionId, questionIndex } = req.params;

    if (!sessionId) throw new AppError('sessionId needed');

    if (!questionIndex) throw new AppError('questionIndex needed');
    const data = await getPracticeQuestionService(userId, sessionId, parseInt(questionIndex));
    res.json({ success: true, message: 'Question retrieved', data });
  } catch (error: any) {
    console.error('getPracticeQuestion error:', error);
    res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
  }
}

export async function submitPractice(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { practiceSessionId, answers } = req.body;
    const data = await submitPracticeService(userId, { practiceSessionId, answers });
    res.json({ success: true, message: 'Practice submitted and graded', data });
  } catch (error: any) {
    console.error('submitPractice error:', error);
    res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
  }
}

export async function getPracticeResults(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { sessionId } = req.params;

    if (!sessionId) throw new AppError('sessionId needed');
    const data = await getPracticeResultsService(userId, sessionId);
    res.json({ success: true, message: 'Results retrieved', data });
  } catch (error: any) {
    console.error('getPracticeResults error:', error);
    res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
  }
}

export async function getPracticeAttemptReview(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { sessionId, questionIndex } = req.params;

    if (!sessionId) throw new AppError('sessionId needed');

    if (!questionIndex) throw new AppError('questionIndex needed');
    const data = await getPracticeAttemptReviewService(userId, sessionId, parseInt(questionIndex));
    res.json({ success: true, message: 'Attempt review retrieved', data });
  } catch (error: any) {
    console.error('getPracticeAttemptReview error:', error);
    res.status(error.statusCode ?? 500).json({ success: false, message: error.message });
  }
}

export  async function failSimulation(req: Request, res: Response){
  const userId = req.user!.user.id;
  const { simulationId } = req.params;
  if (!simulationId) throw new AppError('simulationId is required');

  const { reason } = req.body;
  if (!reason) throw new AppError('reason is required (WINDOW_BLUR | TIME_EXPIRED)');

  const result = await failSimulationService(userId, simulationId, reason);


  sendSuccess(res, 'Simulation failed', result);
};