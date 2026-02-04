import { AppError } from '@/shared/utils';
import { prisma } from '@/shared/config';
import { PodcastListResponse, PodcastDetailResponse } from '../interface/podcast.interface';
import { NotFoundError } from '@/shared/utils';



class Podcasts {
  // src/modules/content/service/content.service.ts

  async getPodcasts(subject?: string): Promise<PodcastListResponse> {
    const where: any = { isPublished: true };

    if (subject) {
      where.subject = subject;
    }

    const [podcasts, total] = await Promise.all([
      prisma.podcast.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          subject: true,
          audioUrl: true,
          thumbnail: true,
          duration: true,
          order: true,
        },
        orderBy: { order: 'asc' },
      }),
      prisma.podcast.count({ where }),
    ]);

    return { podcasts, total };
  }

  // src/modules/content/service/content.service.ts

  async getPodcastById(userId: string, podcastId: string): Promise<PodcastDetailResponse> {
    const podcast = await prisma.podcast.findUnique({
      where: { id: podcastId, isPublished: true },
      include: {
        progress: {
          where: { userId },
        },
      },
    });

    if (!podcast) {
      throw new NotFoundError('Podcast not found');
    }

    const { progress, ...podcastData } = podcast;

    return {
      podcast: podcastData,
      progress: progress[0] || null,
    };
  }
}

export default new Podcasts();
