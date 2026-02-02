import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';

class Lesson {
  async getLessonById(userId: string, lessonId: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      include: {
        module: {
          include: {
            subject: {
              select: { id: true, name: true, slug: true },
            },
          },
        },
        assets: {
          orderBy: { order: 'asc' },
        },
        userProgress: {
          where: { userId },
        },
      },
    });

    if (!lesson) {
      throw new AppError('Lesson not found');
    }

    const totalLessons = await prisma.lesson.count({
      where: { moduleId: lesson.moduleId, isPublished: true },
    });

    await Promise.all([
      // Update lesson progress
      prisma.userLessonProgress.upsert({
        where: {
          userId_lessonId: { userId, lessonId },
        },
        create: { userId, lessonId },
        update: {},
      }),

      // Update module progress
      prisma.userModuleProgress.upsert({
        where: {
          userId_moduleId: { userId, moduleId: lesson.moduleId },
        },
        create: {
          userId,
          moduleId: lesson.moduleId,
          totalLessons,
        },
        update: {
          lastAccessedAt: new Date(),
        },
      }),

      // Update subject progress
      prisma.userSubjectProgress.upsert({
        where: {
          userId_subjectId: { userId, subjectId: lesson.module.subjectId },
        },
        create: {
          userId,
          subjectId: lesson.module.subjectId,
        },
        update: {
          lastAccessedAt: new Date(),
        },
      }),
    ]);

    return {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      content: lesson.content,
      transcript: lesson.transcript,
      order: lesson.order,
      videoUrl: lesson.videoUrl,
      videoDuration: lesson.videoDuration,
      module: {
        id: lesson.module.id,
        name: lesson.module.name,
        slug: lesson.module.slug,
        subject: lesson.module.subject,
      },
      assets: lesson.assets,
      progress: lesson.userProgress[0] || {
        isCompleted: false,
        videoWatchedSeconds: 0,
        timeSpentSeconds: 0,
      },
    };
  }

  private async recalculateSubjectProgress(userId: string, subjectId: string) {
    // Get all modules in subject
    const modules = await prisma.module.findMany({
      where: { subjectId, isPublished: true },
      include: {
        userProgress: {
          where: { userId },
        },
        lessons: {
          where: { isPublished: true },
          include: {
            userProgress: {
              where: { userId },
            },
          },
        },
      },
    });

    // Calculate average progress across modules
    const totalModules = modules.length;
    const totalProgress = modules.reduce(
      (sum, m) => sum + (m.userProgress[0]?.progressPercent || 0),
      0
    );
    const progressPercent = totalModules > 0 ? totalProgress / totalModules : 0;

    // Calculate total time from ALL lessons in subject
    const totalTimeSeconds = modules.reduce((sum, module) => {
      const moduleTime = module.lessons.reduce(
        (lessonSum, lesson) => lessonSum + (lesson.userProgress[0]?.timeSpentSeconds || 0),
        0
      );
      return sum + moduleTime;
    }, 0);

    // Determine status
    let status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = 'NOT_STARTED';
    const completedModules = modules.filter(
      (m) => m.userProgress[0]?.status === 'COMPLETED'
    ).length;

    if (completedModules === totalModules && totalModules > 0) {
      status = 'COMPLETED';
    } else if (completedModules > 0 || progressPercent > 0) {
      status = 'IN_PROGRESS';
    }

    // Update subject progress
    await prisma.userSubjectProgress.upsert({
      where: {
        userId_subjectId: { userId, subjectId },
      },
      create: {
        userId,
        subjectId,
        progressPercent,
        status,
        totalTimeSeconds,
      },
      update: {
        progressPercent,
        status,
        totalTimeSeconds,
      },
    });
  }
}

export default new Lesson();