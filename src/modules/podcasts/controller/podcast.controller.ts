import { AppError } from '@/shared/utils';
import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import podcastService from '../service/podcast.service';
import { sendSuccess } from '@/shared/utils';
import podCastRouter from '../routes/podcast.routes';


export const getPodcasts = asyncHandler(async (req: Request, res: Response) => {
  const { subject } = req.query;

  const result = await podcastService.getPodcasts(subject as string | undefined);

  sendSuccess(res, 'Podcasts retrieved', result);
});



export const getPodcastById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId = req.user!.user.id;
  const { id } = req.params;

  if (!id) throw new AppError('podcast id required');

  const result = await podcastService.getPodcastById(userId, id);

  sendSuccess(res, 'Podcast retrieved', result);
});


// src/modules/content/controller/content.controller.ts

export const trackPodcastProgress = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
    const { currentTime, audioDuration } = req.body;
    

    if (!id) throw new AppError("podcast id required")

  await podcastService.trackPodcastProgress(userId, id, currentTime, audioDuration);

  sendSuccess(res, 'Podcast progress tracked');
});