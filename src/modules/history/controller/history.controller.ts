// src/modules/history/controller/history.controller.ts

import { asyncHandler, sendSuccess } from '@/shared/utils';
import { Request, Response } from 'express';
import historyService from '../service/history.service';

export const getHistoryStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const result = await historyService.getStats(userId);
  sendSuccess(res, 'History stats retrieved', result);
});

export const getHistoryFeed = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const type = (req.query.type as string) || 'all';
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 12));
  const result = await historyService.getFeed(userId, type, page, limit);
  sendSuccess(res, 'History feed retrieved', result);
});

export const getMCQSessionDetail = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { sessionId } = req.params;
  const result = await historyService.getMCQSessionDetail(userId, sessionId);
  sendSuccess(res, 'MCQ session detail retrieved', result);
});

export const getEssayAttemptDetail = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { attemptId } = req.params;
  const result = await historyService.getEssayAttemptDetail(userId, attemptId);
  sendSuccess(res, 'Essay attempt detail retrieved', result);
});

export const getSimulationDetail = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { simulationId } = req.params;
  const result = await historyService.getSimulationDetail(userId, simulationId);
  sendSuccess(res, 'Simulation detail retrieved', result);
});