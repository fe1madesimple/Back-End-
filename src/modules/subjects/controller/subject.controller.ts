// src/modules/content/controller/content.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import { SubjectService } from '../service/subject.service';

const subjectService = new SubjectService();

export const getSubjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const subjects = await subjectService.getSubjects(userId);

  sendSuccess(res, 'Subjects retrieved successfully', { subjects });
});
