import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import { LessonDetailResponse, ModuleListResponse } from '../interface/lesson.interface';
import achievementsService from '@/modules/achievement/service/achievements.service';

class Lesson {
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

    if (videoDuration && videoDuration <= 0) {
      throw new AppError('Invalid video duration');
    }

    // Use provided duration or stored duration
    const duration = videoDuration || lesson.videoDuration;

    if (!duration) {
      throw new AppError('Video duration not available');
    }

    // Calculate lesson completion percentage (0-100)
    const lessonProgressPercent = Math.min(100, (currentTime / duration) * 100);

    // 90% threshold for "completed" status
    const isCompleted = lessonProgressPercent >= 90;

    // Update lesson progress
    const updatedProgress = await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        videoWatchedSeconds: currentTime,
        timeSpentSeconds: currentTime, // Track time spent
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
      update: {
        videoWatchedSeconds: currentTime,
        timeSpentSeconds: currentTime,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    // Always recalculate module and subject progress (even if not completed)
    await this.recalculateModuleProgress(userId, lesson.moduleId);

    // Store video duration if not already stored
    if (videoDuration && !lesson.videoDuration) {
      await prisma.lesson.update({
        where: { id: lessonId },
        data: { videoDuration },
      });
    }

    return updatedProgress;
  }

  private async recalculateModuleProgress(userId: string, moduleId: string) {
    // Get all published lessons in this module
    const lessons = await prisma.lesson.findMany({
      where: { moduleId, isPublished: true },
      include: {
        userProgress: {
          where: { userId },
        },
      },
      orderBy: { order: 'asc' },
    });

    const totalLessons = lessons.length;

    if (totalLessons === 0) {
      return; // No lessons, nothing to calculate
    }

    // Each lesson gets equal weight in the module
    const lessonWeight = 100 / totalLessons;

    let moduleProgressPercent = 0;
    let completedLessons = 0;

    for (const lesson of lessons) {
      const userProgress = lesson.userProgress[0];

      if (!userProgress) {
        // Lesson not started = 0% contribution
        continue;
      }

      if (userProgress.isCompleted) {
        // Completed lesson = full weight
        moduleProgressPercent += lessonWeight;
        completedLessons++;
      } else if (lesson.videoDuration && lesson.videoDuration > 0) {
        // In-progress lesson = partial weight based on watch progress
        const lessonProgressPercent = Math.min(
          100,
          (userProgress.videoWatchedSeconds / lesson.videoDuration) * 100
        );
        moduleProgressPercent += (lessonProgressPercent / 100) * lessonWeight;
      }
    }

    // Round to 1 decimal place
    moduleProgressPercent = Math.round(moduleProgressPercent * 10) / 10;

    // Determine status
    let status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = 'NOT_STARTED';

    if (completedLessons === totalLessons && totalLessons > 0) {
      status = 'COMPLETED';
    } else if (moduleProgressPercent > 0) {
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
        progressPercent: moduleProgressPercent,
        status,
        completedLessons,
        totalLessons,
      },
      update: {
        progressPercent: moduleProgressPercent,
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

    // Check achievements (non-blocking)
    achievementsService
      .checkAllAchievements(userId)
      .catch((err) => console.error('Achievement check failed:', err));
  }

  private async recalculateSubjectProgress(userId: string, subjectId: string) {
    // Get all published modules in subject
    const modules = await prisma.module.findMany({
      where: { subjectId, isPublished: true },
      include: {
        userProgress: {
          where: { userId },
        },
      },
    });

    const totalModules = modules.length;

    if (totalModules === 0) {
      return; // No modules, nothing to calculate
    }

    // Each module gets equal weight in the subject
    const moduleWeight = 100 / totalModules;

    let subjectProgressPercent = 0;
    let completedModules = 0;

    for (const module of modules) {
      const moduleProgress = module.userProgress[0];

      if (!moduleProgress) {
        // Module not started = 0% contribution
        continue;
      }

      // Add module's contribution to subject progress
      subjectProgressPercent += (moduleProgress.progressPercent / 100) * moduleWeight;

      if (moduleProgress.status === 'COMPLETED') {
        completedModules++;
      }
    }

    // Round to 1 decimal place
    subjectProgressPercent = Math.round(subjectProgressPercent * 10) / 10;

    // Determine status
    let status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' = 'NOT_STARTED';

    if (completedModules === totalModules && totalModules > 0) {
      status = 'COMPLETED';
    } else if (subjectProgressPercent > 0) {
      status = 'IN_PROGRESS';
    }

    // Calculate total time from ALL lessons in subject
    const allLessons = await prisma.lesson.findMany({
      where: {
        module: { subjectId },
        isPublished: true,
      },
      include: {
        userProgress: {
          where: { userId },
        },
      },
    });

    const totalTimeSeconds = allLessons.reduce(
      (sum, lesson) => sum + (lesson.userProgress[0]?.timeSpentSeconds || 0),
      0
    );

    // Update subject progress
    await prisma.userSubjectProgress.upsert({
      where: {
        userId_subjectId: { userId, subjectId },
      },
      create: {
        userId,
        subjectId,
        progressPercent: subjectProgressPercent,
        status,
        totalTimeSeconds,
      },
      update: {
        progressPercent: subjectProgressPercent,
        status,
        totalTimeSeconds,
      },
    });
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
