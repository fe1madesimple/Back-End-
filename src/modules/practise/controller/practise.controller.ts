// src/modules/practise/practise.controller.ts

import { Request, Response } from 'express';
import { getPastQuestionsService } from '../service/practise.service';


export async function getPastQuestions(req: Request, res: Response) {
  try {
    const { search, subject, year, page, limit } = req.query;

    const data = await getPastQuestionsService({
      search: search as string | undefined,
      subject: subject as string | undefined,
      year: year ? parseInt(year as string) : undefined,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 9,
    });

    res.json({
      success: true,
      message: 'Past questions retrieved',
      data,
    });
  } catch (error) {
    console.error('getPastQuestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve past questions',
    });
  }
}
