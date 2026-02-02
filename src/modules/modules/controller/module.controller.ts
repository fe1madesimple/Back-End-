import { Request, Response } from 'express';
import moduleService from '../service/module.service';
import { AppError } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils';
import { asyncHandler } from '@/shared/utils';

export const getModuleById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId = req.user!.user.id;
  const { id } = req.params;

  if (!id) return new AppError('module id must be provided');

  const module = await moduleService.getModuleById(userId, id);

  sendSuccess(res, 'Module retrieved successfully', { module });
});

export const getLessonById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId = req.user!.user.id;
    const { id } = req.params;
    
    if (!id) return new AppError("lesson id must be supplied")

  const lesson = await moduleService.getLessonById(userId, id);

  sendSuccess(res, 'Lesson retrieved successfully', { lesson });
});
