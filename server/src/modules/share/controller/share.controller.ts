import { asyncHandler, sendSuccess, AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import shareService from '../service/share.service';

// POST /api/v1/share
// Auth required — generates share token for the logged-in user's result
export const generateShareToken = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { type, resourceId } = req.body;

  if (!type || !resourceId) {
    throw new AppError('type and resourceId are required');
  }
  if (!['ESSAY', 'SIMULATION', 'MCQ'].includes(type)) {
    throw new AppError('type must be ESSAY, SIMULATION, or MCQ');
  }

  const result = await shareService.generateToken(userId, type, resourceId);
  sendSuccess(res, 'Share link generated', result);
});

// GET /api/v1/share/:token/essay — no auth
export const getSharedEssay = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  if (!token) throw new AppError('Token is required');
  const result = await shareService.getSharedEssay(token);
  sendSuccess(res, 'Shared essay retrieved', result);
});

// GET /api/v1/share/:token/simulation — no auth
export const getSharedSimulation = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  if (!token) throw new AppError('Token is required');
  const result = await shareService.getSharedSimulation(token);
  sendSuccess(res, 'Shared simulation retrieved', result);
});

// GET /api/v1/share/:token/mcq — no auth
export const getSharedMCQ = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  if (!token) throw new AppError('Token is required');
  const result = await shareService.getSharedMCQ(token);
  sendSuccess(res, 'Shared MCQ retrieved', result);
});
