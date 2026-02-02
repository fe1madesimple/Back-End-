import { prisma } from "@/shared/config";
import { AppError } from "@/shared/utils";


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
}


export default new Lesson()