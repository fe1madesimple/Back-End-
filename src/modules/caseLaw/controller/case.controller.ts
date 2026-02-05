import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import caseService from '../service/case.service';

export const searchCases = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const query = req.query;

  const result = await caseService.searchCases(userId, query);

  sendSuccess(res, 'Cases retrieved successfully', result);
});
