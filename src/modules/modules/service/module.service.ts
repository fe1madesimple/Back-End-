import { AppError } from '@/shared/utils';
import { prisma } from '@/shared/config';

class Module {
  async getModuleById(userId: string, moduleId: string) {
    const module = await prisma.module.findUnique({
      where: { id: moduleId, isPublished: true },
      include: {
        subject: {
          select: { id: true, name: true, slug: true },
        },
        lessons: {
          where: { isPublished: true },
          orderBy: { order: 'asc' },
          include: {
            userProgress: {
              where: { userId },
            },
          },
        },
        userProgress: {
          where: { userId },
        },
      },
    });

    if (!module) {
      throw new AppError('Module not found');
    }

    return {
      id: module.id,
      name: module.name,
      slug: module.slug,
      description: module.description,
      order: module.order,
      subject: module.subject,
      progress: module.userProgress[0] || null,
      lessons: module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        order: lesson.order,
        videoDuration: lesson.videoDuration,
        isCompleted: lesson.userProgress[0]?.isCompleted || false,
        videoWatchedSeconds: lesson.userProgress[0]?.videoWatchedSeconds || 0,
        timeSpentSeconds: lesson.userProgress[0]?.timeSpentSeconds || 0,
      })),
    };
  }
}

export default new Module();
