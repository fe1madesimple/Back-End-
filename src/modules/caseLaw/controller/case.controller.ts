import { Request, Response } from 'express';
import { AppError, asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import caseService from '../service/case.service';

export const getCaseFilters = asyncHandler(async (_req: Request, res: Response) => {
  const filters = await caseService.getCaseFilters();
  sendSuccess(res, 'Filters retrieved successfully', filters);
});

export const searchCases = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const result = await caseService.searchCases(userId, req.query as any);
  sendSuccess(res, 'Cases retrieved successfully', result);
});

export const getCaseDetails = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  if (!id) throw new AppError('Case id must be provided');
  const caseDetails = await caseService.getCaseDetails(userId, id);
  sendSuccess(res, 'Case details retrieved successfully', caseDetails);
});

export const getSavedCases = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { subject } = req.query;
  const result = await caseService.getSavedCases(userId, subject as string);
  sendSuccess(res, 'Saved cases retrieved successfully', result);
});

export const toggleSaveCase = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  if (!id) throw new AppError('Case id required');
  const result = await caseService.toggleSaveCase(userId, id);
  sendSuccess(res, result.message, { isSaved: result.isSaved });
});

export const toggleReview = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { caseId } = req.params;
  if (!caseId) throw new AppError('Case id required');
  const result = await caseService.toggleReview(userId, caseId);
  sendSuccess(res, 'Review status updated', result);
});
