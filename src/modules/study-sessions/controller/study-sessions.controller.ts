// src/modules/study-sessions/controller/study-session.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import studySessionsService from '../service/study-sessions.service';
import { AppError } from '@/shared/utils';

export const startSession = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const session = await studySessionsService.startSession(userId);

  sendSuccess(res, 'Study session started', session, 201);
});

export const endSession = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { sessionId } = req.params;

  if (!sessionId) throw new AppError('session id must be present');

  await studySessionsService.endSession(userId, sessionId);

  sendSuccess(res, 'Study session ended');
});