import { asyncHandler } from '@/shared/utils';
import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import questionsService from '../service/questions.service';
import { sendSuccess } from '@/shared/utils';


export const getModuleQuestions = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { moduleId } = req.params;
    
    if (!moduleId) return new AppError("module id must be supplied")

  const questions = await questionsService.getModuleQuestions(moduleId);

  sendSuccess(res, 'Questions retrieved successfully', {
    questions,
    total: questions.length,
  });
});