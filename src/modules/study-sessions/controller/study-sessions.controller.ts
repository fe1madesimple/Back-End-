// src/modules/study-sessions/controller/study-session.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import studySessionsService from '../service/study-sessions.service';
import { AppError } from '@/shared/utils';
export const startSession = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const data = req.body;

  const session = await studySessionsService.startSession(userId, data);

  sendSuccess(res, 'Study session started', session, 201);
});

// src/modules/study-sessions/controller/study-session.controller.ts

export const pingSession = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { sessionId } = req.params;
  const { isActive } = req.body;

  if (!sessionId) throw new AppError('sessionId must be supplied');

  await studySessionsService.pingSession(userId, sessionId, isActive);

  sendSuccess(res, 'Session ping recorded');
});


// src/modules/study-sessions/controller/study-session.controller.ts

export const endSession = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { sessionId } = req.params;
  const data = req.body;

  const result = await studySessionService.endSession(userId, sessionId, data);

  sendSuccess(res, 'Study session ended', result);
});