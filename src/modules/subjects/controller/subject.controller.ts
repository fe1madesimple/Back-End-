// src/modules/content/controller/content.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import { SubjectService } from '../service/subject.service';
import { AppError } from '@/shared/utils';

const subjectService = new SubjectService();

export const getSubjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const subjects = await subjectService.getSubjects(userId);

  sendSuccess(res, 'Subjects retrieved successfully', { subjects });
});

export const getSubjectById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId = req.user!.user.id;
  const { id } = req.params;

  if (!id) return new AppError('id must be supplied as a param');

  const subject = await subjectService.getSubjectById(userId, id);

  sendSuccess(res, 'Subject retrieved successfully', { subject });
});

export const getModulesBySubject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.user!.user.id;
    const { subjectId } = req.params;

    if (!subjectId) return new AppError('subject Id must be supplied');

    const modules = await subjectService.getModulesBySubject(userId, subjectId);

    sendSuccess(res, 'Modules retrieved successfully', { modules });
  }
);
