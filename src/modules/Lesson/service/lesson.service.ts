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

    const duration = videoDuration || lesson.videoDuration;

    if (!duration) {
      throw new AppError('Video duration not available');
    }

    // ✅ SAVE VIDEO DURATION FIRST (before recalculation)
    if (videoDuration && !lesson.videoDuration) {
      await prisma.lesson.update({
        where: { id: lessonId },
        data: { videoDuration },
      });
    }

    const lessonProgressPercent = Math.min(100, (currentTime / duration) * 100);
    const isCompleted = lessonProgressPercent >= 90;

    const existingProgress = await prisma.userLessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
      select: { videoWatchedSeconds: true, timeSpentSeconds: true },
    });

    const previousWatchedSeconds = existingProgress?.videoWatchedSeconds || 0;
    const timeDelta = Math.max(0, currentTime - previousWatchedSeconds);
    const newTimeSpent = (existingProgress?.timeSpentSeconds || 0) + timeDelta;

    const updatedProgress = await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        videoWatchedSeconds: currentTime,
        timeSpentSeconds: currentTime,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
        lastAccessedAt: new Date(),
      },
      update: {
        videoWatchedSeconds: currentTime,
        timeSpentSeconds: newTimeSpent,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
        lastAccessedAt: new Date(),
      },
    });

    // ✅ NOW recalculate with videoDuration already saved
    await this.recalculateModuleProgress(userId, lesson.moduleId);

    return updatedProgress;
  }

  private async recalculateModuleProgress(userId: string, moduleId: string) {
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
      return;
    }

    const lessonWeight = 100 / totalLessons;
    let moduleProgressPercent = 0;
    let completedLessons = 0;

    console.log('🔍 MODULE CALCULATION - Total lessons:', totalLessons);

    for (const lesson of lessons) {
      const userProgress = lesson.userProgress[0];

      console.log(`📚 Lesson ${lesson.id}:`, {
        hasProgress: !!userProgress,
        isCompleted: userProgress?.isCompleted,
        videoWatchedSeconds: userProgress?.videoWatchedSeconds,
        videoDuration: lesson.videoDuration,
      });

      if (!userProgress) {
        continue;
      }

      if (userProgress.isCompleted) {
        moduleProgressPercent += lessonWeight;
        completedLessons++;
      } else if (lesson.videoDuration && lesson.videoDuration > 0) {
        const lessonProgressPercent = Math.min(
          100,
          (userProgress.videoWatchedSeconds / lesson.videoDuration) * 100
        );
        const contribution = (lessonProgressPercent / 100) * lessonWeight;
        console.log(
          `  → Lesson progress: ${lessonProgressPercent.toFixed(2)}%, contributes: ${contribution.toFixed(2)}%`
        );
        moduleProgressPercent += contribution;
      }
    }

    moduleProgressPercent = Math.round(moduleProgressPercent * 10) / 10;

    const status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' =
      completedLessons === totalLessons && totalLessons > 0
        ? 'COMPLETED'
        : moduleProgressPercent > 0
          ? 'IN_PROGRESS'
          : 'NOT_STARTED';

    console.log('📊 MODULE RESULT:', {
      moduleId,
      moduleProgressPercent,
      status,
      completedLessons,
      totalLessons,
    });

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
        lastAccessedAt: new Date(),
      },
      update: {
        progressPercent: moduleProgressPercent,
        status,
        completedLessons,
        lastAccessedAt: new Date(),
      },
    });

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      select: { subjectId: true },
    });

    if (module) {
      await this.recalculateSubjectProgress(userId, module.subjectId);
    }

    achievementsService
      .checkAllAchievements(userId)
      .catch((err) => console.error('Achievement check failed:', err));
  }

  private async recalculateSubjectProgress(userId: string, subjectId: string) {
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
      return;
    }

    const moduleWeight = 100 / totalModules;
    let subjectProgressPercent = 0;
    let completedModules = 0;

    console.log('🔍 SUBJECT CALCULATION - Total modules:', totalModules);

    for (const module of modules) {
      const moduleProgress = module.userProgress[0];

      console.log(`📦 Module ${module.id}:`, {
        hasProgress: !!moduleProgress,
        progressPercent: moduleProgress?.progressPercent,
        status: moduleProgress?.status,
      });

      if (!moduleProgress) {
        continue;
      }

      const contribution = (moduleProgress.progressPercent / 100) * moduleWeight;
      console.log(`  → Module contributes: ${contribution.toFixed(2)}%`);

      subjectProgressPercent += contribution;

      if (moduleProgress.status === 'COMPLETED') {
        completedModules++;
      }
    }

    subjectProgressPercent = Math.round(subjectProgressPercent * 10) / 10;

    const status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' =
      completedModules === totalModules && totalModules > 0
        ? 'COMPLETED'
        : subjectProgressPercent > 0
          ? 'IN_PROGRESS'
          : 'NOT_STARTED';

    console.log('📊 SUBJECT RESULT:', {
      subjectId,
      subjectProgressPercent,
      status,
      completedModules,
      totalModules,
    });

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

    console.log('⏱️ SUBJECT TOTAL TIME:', totalTimeSeconds, 'seconds');

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
        lastAccessedAt: new Date(),
      },
      update: {
        progressPercent: subjectProgressPercent,
        status,
        totalTimeSeconds,
        lastAccessedAt: new Date(),
      },
    });

    console.log('✅ SUBJECT PROGRESS SAVED\n');
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
