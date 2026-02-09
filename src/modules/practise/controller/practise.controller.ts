import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import practiseService from '../service/practise.service';
import { sendSuccess } from '@/shared/utils';
import { PastQuestionsQuery } from '../interface/practise.interface';
   

// src/modules/content/controller/content.controller.ts

export const getQuickQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { moduleId } = req.params;

  if (!moduleId) throw new AppError('module id must be supplied');

  const quiz = await practiseService.getQuickQuiz(moduleId);

  sendSuccess(res, 'Quick quiz retrieved', quiz);
});

// src/modules/content/controller/content.controller.ts

export const getMixedChallenge = asyncHandler(async (req: Request, res: Response) => {
  const { moduleId } = req.params;

  if (!moduleId) throw new AppError('module id needed');

  const challenge = await practiseService.getMixedChallenge();

  sendSuccess(res, 'Topic challenge retrieved', challenge);
});

// src/modules/content/controller/content.controller.ts

export const getTopicPractice = asyncHandler(async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  if (!subjectId) throw new AppError('subject id must be supplied');

  const practice = await practiseService.getMixedPractice(subjectId);

  sendSuccess(res, 'Mixed practice retrieved', practice);
});

export const getPastQuestions = asyncHandler(async (req: Request, res: Response) => {
  const query: PastQuestionsQuery = {
    subject: req.query.subject as string | undefined,
    year: req.query.year ? parseInt(req.query.year as string) : undefined,
    examType: req.query.examType as string | undefined,
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
  };

  const result = await practiseService.getPastQuestions(query);

  sendSuccess(res, 'Past questions retrieved', result);
});


// src/modules/content/controller/content.controller.ts

export const getPastQuestionById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
    const { id } = req.params;
    
    if (!id) throw new AppError("past question id must be supplied")

  const question = await practiseService.getPastQuestionById(id, userId);

  sendSuccess(res, 'Past question retrieved', { question });
});