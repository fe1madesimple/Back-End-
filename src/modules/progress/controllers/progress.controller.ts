import { Request, Response } from 'express';
import { AppError, asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import progressService from '../services/progress.service';

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const stats = await progressService.getDashboardStats(userId);

  sendSuccess(res, 'Dashboard stats retrieved', stats);
});

export const getSubjectProgressDetail = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { subjectId } = req.params;

  if (!subjectId) throw new AppError('subject id must be provided');

  const progress = await progressService.getSubjectProgressDetail(userId, subjectId);

  sendSuccess(res, 'Subject progress retrieved', progress);
});

export const getStudyStreak = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const streak = await progressService.getStudyStreak(userId);

  sendSuccess(res, 'Study streak retrieved', streak);
});

// src/modules/progress/controller/progress.controller.ts

export const getWeeklySummary = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const summary = await progressService.getWeeklySummary(userId);

  sendSuccess(res, 'Weekly summary retrieved', summary);
});

export const getModuleStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { moduleId } = req.params;

  if (!moduleId) throw new AppError("module id needed")

  const stats = await progressService.getModuleStats(userId, moduleId);

  sendSuccess(res, 'Module stats retrieved', stats);
});


export const getSimpleDashboard = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const dashboard = await progressService.getSimpleDashboard(userId);

  sendSuccess(res, 'Dashboard data retrieved successfully', dashboard);
});
