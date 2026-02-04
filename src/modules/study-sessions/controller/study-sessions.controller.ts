     // src/modules/study-sessions/controller/study-session.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';


export const startSession = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const data = req.body;

  const session = await studySessionService.startSession(userId, data);

  sendSuccess(res, 'Study session started', session, 201);
});