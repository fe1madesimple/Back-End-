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

  async trackProgress(userId: string, podcastId: string, listenedSeconds: number) {
    const podcast = await prisma.podcast.findUnique({
      where: { id: podcastId },
      select: { id: true, duration: true, isPublished: true },
    });

    if (!podcast || !podcast.isPublished) {
      throw new NotFoundError('Podcast not found');
    }

    const existing = await prisma.userPodcastProgress.findUnique({
      where: { userId_podcastId: { userId, podcastId } },
    });

    const furthestSeconds = Math.max(listenedSeconds, existing?.listenedSeconds ?? 0);

    const isCompleted = podcast.duration > 0 && furthestSeconds >= podcast.duration * 0.9;

    const progress = await prisma.userPodcastProgress.upsert({
      where: {
        userId_podcastId: { userId, podcastId },
      },
      create: {
        userId,
        podcastId,
        listenedSeconds: furthestSeconds,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
      update: {
        listenedSeconds: furthestSeconds,
        isCompleted: isCompleted ? true : (existing?.isCompleted ?? false),
        completedAt: isCompleted && !existing?.isCompleted ? new Date() : existing?.completedAt,
      },
    });

    return {
      podcastId,
      listenedSeconds: progress.listenedSeconds,
      isCompleted: progress.isCompleted,
      completedAt: progress.completedAt,
      percentageListened:
        podcast.duration > 0 ? Math.round((furthestSeconds / podcast.duration) * 100) : 0,
    };
  }

  async getProgress(userId: string, podcastId: string) {
    const podcast = await prisma.podcast.findUnique({
      where: { id: podcastId },
      select: { id: true, duration: true, isPublished: true },
    });

    if (!podcast || !podcast.isPublished) {
      throw new NotFoundError('Podcast not found');
    }

    const progress = await prisma.userPodcastProgress.findUnique({
      where: { userId_podcastId: { userId, podcastId } },
    });

    return {
      podcastId,
      listenedSeconds: progress?.listenedSeconds ?? 0,
      isCompleted: progress?.isCompleted ?? false,
      completedAt: progress?.completedAt ?? null,
      percentageListened:
        podcast.duration > 0 && progress
          ? Math.round((progress.listenedSeconds / podcast.duration) * 100)
          : 0,
    };
  }

  async getUserPodcastStats(userId: string) {
    const [total, completed, inProgress] = await Promise.all([
      prisma.userPodcastProgress.count({ where: { userId } }),
      prisma.userPodcastProgress.count({ where: { userId, isCompleted: true } }),
      prisma.userPodcastProgress.count({
        where: { userId, isCompleted: false, listenedSeconds: { gt: 0 } },
      }),
    ]);

    const totalListenedSeconds = await prisma.userPodcastProgress.aggregate({
      where: { userId },
      _sum: { listenedSeconds: true },
    });

    return {
      totalStarted: total,
      totalCompleted: completed,
      totalInProgress: inProgress,
      totalListenedSeconds: totalListenedSeconds._sum.listenedSeconds ?? 0,
      totalListenedHours:
        Math.round(((totalListenedSeconds._sum.listenedSeconds ?? 0) / 3600) * 10) / 10,
    };
  }
}
