import prisma from '@/config/database';
import { SubjectWithProgress, SubjectDetail } from '../interface/subject.interface';
import { AppError } from '@/shared/utils';

export class SubjectService {
  async getSubjects(userId: string): Promise<SubjectWithProgress[]> {
    const subjects = await prisma.subject.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      include: {
        userProgress: {
          where: { userId },
        },
      },
    });

    return subjects.map((subject) => {
      const userProgress = subject.userProgress[0];

      return {
        id: subject.id,
        name: subject.name,
        slug: subject.slug,
        description: subject.description,
        icon: subject.icon,
        color: subject.color,
        progressColor: subject.progressColor,
        order: subject.order,
        progress: userProgress
          ? {
              progressPercent: userProgress.progressPercent,
              status: userProgress.status,
              totalTimeSeconds: userProgress.totalTimeSeconds,
              lastAccessedAt: userProgress.lastAccessedAt,
            }
          : {
              progressPercent: 0, // ← Changed from null to 0
              status: 'NOT_STARTED',
              totalTimeSeconds: 0,
              lastAccessedAt: null,
            },
      };
    });
  }

  async getSubjectById(userId: string, subjectId: string): Promise<SubjectDetail> {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId, isPublished: true },
      include: {
        userProgress: {
          where: { userId },
        },
        modules: {
          where: { isPublished: true },
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              where: { isPublished: true },
            },
            userProgress: {
              where: { userId },
            },
          },
        },
      },
    });

    if (!subject) {
      throw new AppError('Subject not found');
    }

    // Calculate stats
    const totalModules = subject.modules.length;
    const completedModules = subject.modules.filter(
      (m) => m.userProgress[0]?.status === 'COMPLETED'
    ).length;

    const totalLessons = subject.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessons = subject.modules.reduce(
      (acc, m) => acc + (m.userProgress[0]?.completedLessons || 0),
      0
    );

    // Calculate average quiz score for this subject
    const attempts = await prisma.questionAttempt.findMany({
      where: {
        userId,
        question: {
          module: {
            subjectId: subject.id,
          },
        },
      },
      select: {
        pointsEarned: true,
        question: {
          select: { points: true },
        },
      },
    });

    const averageQuizScore =
      attempts.length > 0
        ? attempts.reduce((acc, a) => acc + (a.pointsEarned / a.question.points) * 100, 0) /
          attempts.length
        : 0;

    return {
      id: subject.id,
      name: subject.name,
      slug: subject.slug,
      description: subject.description,
      progress: subject.userProgress[0] || null,
      modules: subject.modules.map((module) => ({
        id: module.id,
        name: module.name,
        slug: module.slug,
        order: module.order,
        lessonsCount: module.lessons.length,
        completedLessons: module.userProgress[0]?.completedLessons || 0,
        status: module.userProgress[0]?.status || 'NOT_STARTED',
      })),
      stats: {
        totalModules,
        completedModules,
        totalLessons,
        completedLessons,
        averageQuizScore: Math.round(averageQuizScore),
      },
    };
  }

  async getModulesBySubject(userId: string, subjectId: string) {
    const modules = await prisma.module.findMany({
      where: { subjectId, isPublished: true },
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          where: { isPublished: true },
          select: { id: true },
        },
        userProgress: {
          where: { userId },
        },
      },
    });

    return modules.map((module) => ({
      id: module.id,
      name: module.name,
      slug: module.slug,
      description: module.description,
      order: module.order,
      totalLessons: module.lessons.length,
      completedLessons: module.userProgress[0]?.completedLessons || 0,
      progressPercent: module.userProgress[0]?.progressPercent || 0,
      status: module.userProgress[0]?.status || 'NOT_STARTED',
    }));
  }
}
