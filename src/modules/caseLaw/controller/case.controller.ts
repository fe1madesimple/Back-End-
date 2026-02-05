import { Request, Response } from 'express';
import { AppError, asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import caseService from '../service/case.service';

export const searchCases = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const query = req.query;

  const result = await caseService.searchCases(userId, query);

  sendSuccess(res, 'Cases retrieved successfully', result);
});

export const getCaseDetails = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
    const { id } = req.params;
    
    if (!id) throw new AppError("case id must be provided"
        
    )

  const caseDetails = await caseService.getCaseDetails(userId, id);

  sendSuccess(res, 'Case details retrieved successfully', caseDetails);
});