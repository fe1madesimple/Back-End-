import { prisma } from '@/shared/config';
import { NotFoundError } from '@/shared/utils';
import { PodcastQueryParams } from '../interface/podcast.interface';

export class PodcastService {
  async getAllPodcasts(params: PodcastQueryParams) {
    const { subject, isBonus, search, page = 1, limit = 50 } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      isPublished: true,
    };

    if (subject) {
      where.subjectName = {
        equals: subject,
        mode: 'insensitive',
      };
    }

    if (isBonus !== undefined) {
      where.isBonus = isBonus;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [podcasts, total] = await Promise.all([
      prisma.podcast.findMany({
        where,
        orderBy: { order: 'asc' },
        skip,
        take: limit,
      }),
      prisma.podcast.count({ where }),
    ]);

    // Get distinct subjects for filter pills
    const subjectRows = await prisma.podcast.findMany({
      where: { isPublished: true, isBonus: false },
      select: { subjectName: true },
      distinct: ['subjectName'],
      orderBy: { subjectName: 'asc' },
    });

    const subjects = subjectRows.map((s) => s.subjectName);

    return { podcasts, total, subjects };
  }

  async getPodcastById(id: string) {
    const podcast = await prisma.podcast.findUnique({
      where: { id },
    });

    if (!podcast) {
      throw new NotFoundError('Podcast not found');
    }

    if (!podcast.isPublished) {
      throw new NotFoundError('Podcast not found');
    }

    return podcast;
  }

  async getPodcastsBySubject(subject: string) {
    const podcasts = await prisma.podcast.findMany({
      where: {
        isPublished: true,
        subjectName: {
          equals: subject,
          mode: 'insensitive',
        },
      },
      orderBy: { order: 'asc' },
    });

    if (!podcasts.length) {
      throw new NotFoundError(`No podcasts found for subject: ${subject}`);
    }

    return podcasts;
  }

  async getBonusEpisodes() {
    return prisma.podcast.findMany({
      where: {
        isPublished: true,
        isBonus: true,
      },
      orderBy: { order: 'asc' },
    });
  }
}