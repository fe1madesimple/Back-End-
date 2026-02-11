import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import { LessonDetailResponse, ModuleListResponse } from '../interface/lesson.interface';

class Lesson {
  // src/modules/content/service/content.service.ts

  async trackVideoProgress(
    userId: string,
    lessonId: string,
    currentTime: number,
    videoDuration?: number
  ) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, videoDuration: true, moduleId: true },
    });

    if (!lesson) {
      throw new AppError('Lesson not found');
    }

    if (videoDuration) {
      if (videoDuration <= 0) {
        throw new AppError('Invalid video duration');
      }
    }

    // Use provided duration (from frontend) or stored duration (from DB)
    const duration = videoDuration || lesson.videoDuration;

    // Calculate completion (90% threshold)
    const completionThreshold = 0.9;
    const isCompleted = duration ? currentTime >= duration * completionThreshold : false;

    // Update lesson progress
    const completedStatus = Boolean(isCompleted);

    const updatedProgress = await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        videoWatchedSeconds: currentTime,
        isCompleted: completedStatus,
        completedAt: completedStatus ? new Date() : null,
      },
      update: {
        videoWatchedSeconds: currentTime,
        isCompleted: completedStatus,
        completedAt: completedStatus ? new Date() : null,
      },
    });

    // If lesson just completed, update module progress
    if (isCompleted) {
      await this.recalculateModuleProgress(userId, lesson.moduleId);
    }

    // Optionally: Update lesson duration in DB if provided and not already stored
    if (videoDuration && !lesson.videoDuration) {
      await prisma.lesson.update({
        where: { id: lessonId },
        data: { videoDuration },
      });
    }

    return updatedProgress;
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

  private async recalculateModuleProgress(userId: string, moduleId: string) {
    // Get total lessons in module
    const totalLessons = await prisma.lesson.count({
      where: { moduleId, isPublished: true },
    });

    // Get completed lessons count
    const completedLessons = await prisma.userLessonProgress.count({
      where: {
        userId,
        lesson: { moduleId },
        isCompleted: true,
      },
    });

    // Calculate progress percent
    const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    // Determine status
    let status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = 'NOT_STARTED';
    if (completedLessons === totalLessons && totalLessons > 0) {
      status = 'COMPLETED';
    } else if (completedLessons > 0) {
      status = 'IN_PROGRESS';
    }

    // Update module progress
    await prisma.userModuleProgress.upsert({
      where: {
        userId_moduleId: { userId, moduleId },
      },
      create: {
        userId,
        moduleId,
        progressPercent,
        status,
        completedLessons,
        totalLessons,
      },
      update: {
        progressPercent,
        status,
        completedLessons,
      },
    });

    // Recalculate subject progress
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      select: { subjectId: true },
    });

    if (module) {
      await this.recalculateSubjectProgress(userId, module.subjectId);
    }
  }

  async trackTimeSpent(userId: string, lessonId: string, seconds: number) {
    // Update lesson time
    await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        timeSpentSeconds: seconds,
      },
      update: {
        timeSpentSeconds: {
          increment: seconds,
        },
      },
    });

    // Get lesson to find module and subject
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: true,
      },
    });

    if (lesson) {
      // Update module time (not stored, but we'll update subject)
      // Update subject total time
      await prisma.userSubjectProgress.upsert({
        where: {
          userId_subjectId: {
            userId,
            subjectId: lesson.module.subjectId,
          },
        },
        create: {
          userId,
          subjectId: lesson.module.subjectId,
          totalTimeSeconds: seconds,
        },
        update: {
          totalTimeSeconds: {
            increment: seconds,
          },
        },
      });
    }
  }

  async getLessonById(userId: string, lessonId: string): Promise<LessonDetailResponse> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      include: {
        module: {
          include: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        userProgress: {
          where: { userId },
        },
      },
    });

    if (!lesson) {
      throw new AppError('Lesson not found');
    }

    const userProgress = lesson.userProgress[0];

    if (userProgress) {
      await prisma.userLessonProgress.update({
        where: { id: userProgress.id },
        data: { lastAccessedAt: new Date() },
      });
    } else {
      await prisma.userLessonProgress.create({
        data: {
          userId,
          lessonId,
          videoWatchedSeconds: 0,
          timeSpentSeconds: 0,
          isCompleted: false,
          lastAccessedAt: new Date(),
        },
      });
    }

    const allModules = await prisma.module.findMany({
      where: {
        subjectId: lesson.module.subjectId,
        isPublished: true,
      },
      include: {
        lessons: {
          where: { isPublished: true },
          select: {
            id: true,
            title: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      content: lesson.content || null,
      videoUrl: lesson.videoUrl,
      videoDuration: lesson.videoDuration,
      transcript: lesson.transcript,
      order: lesson.order,
      module: {
        id: lesson.module.id,
        name: lesson.module.name,
        subjectId: lesson.module.subjectId,
        subjectName: lesson.module.subject.name,
      },
      userProgress: userProgress
        ? {
            isCompleted: userProgress.isCompleted,
            videoWatchedSeconds: userProgress.videoWatchedSeconds,
            timeSpentSeconds: userProgress.timeSpentSeconds,
            lastAccessedAt: userProgress.lastAccessedAt || null,
          }
        : null,
      subjectModules: allModules.map((module) => ({
        id: module.id,
        name: module.name,
        order: module.order,
        lessons: module.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          order: l.order,
        })),
      })),
    };
  }

  async getModulesBySubject(userId: string, subjectId: string): Promise<ModuleListResponse> {
    const modules = await prisma.module.findMany({
      where: {
        subjectId,
        isPublished: true,
      },
      include: {
        lessons: {
          where: { isPublished: true },
          select: {
            id: true,
            title: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
        userProgress: {
          where: { userId },
        },
      },
      orderBy: { order: 'asc' },
    });

    return {
      modules: modules.map((module) => {
        const userProgress = module.userProgress[0];
        const totalLessons = module.lessons.length;
        const completedLessons = userProgress?.completedLessons || 0;

        let status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' = 'NOT_STARTED';
        if (completedLessons === totalLessons && totalLessons > 0) {
          status = 'COMPLETED';
        } else if (completedLessons > 0) {
          status = 'IN_PROGRESS';
        }

        return {
          id: module.id,
          name: module.name,
          slug: module.slug,
          order: module.order,
          status,
          progress: {
            completedLessons,
            totalLessons,
          },
          lessons: module.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.order,
          })),
        };
      }),
    };
  }
}

export default new Lesson();
