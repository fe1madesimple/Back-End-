import { AppError } from '@/shared/utils';
import { prisma } from '@/shared/config';
import { PodcastListResponse } from '../interface/podcast.interface';

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
}


export default new Podcasts()