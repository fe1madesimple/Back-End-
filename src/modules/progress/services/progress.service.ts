// src/modules/progress/service/progress.service.ts

import { prisma } from '@/shared/config';
import { DashboardStatsResponse } from '../interfaces/progress.interface';

class ProgressService {

  async getDashboardStats(userId: string): Promise<DashboardStatsResponse> {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(todayStart);
      
      
    weekStart.setDate(weekStart.getDate() - 7);

    // Get user for exam date and goals
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        targetExamDate: true,
        dailyStudyGoal: true,
      },
    });

    // Overall progress across all subjects
    const subjectProgress = await prisma.userSubjectProgress.findMany({
      where: { userId },
      include: {
        subject: {
          select: { name: true },
        },
      },
    });

    const totalSubjects = subjectProgress.length;
    const completedSubjects = subjectProgress.filter((s) => s.status === 'COMPLETED').length;
    const averageProgress =
      totalSubjects > 0
        ? subjectProgress.reduce((sum, s) => sum + s.progressPercent, 0) / totalSubjects
        : 0;

    // Today's activity
    const todayLessons = await prisma.userLessonProgress.count({
      where: {
        userId,
        completedAt: {
          gte: todayStart,
        },
      },
    });

    const todayQuestions = await prisma.questionAttempt.count({
      where: {
        userId,
        createdAt: {
          gte: todayStart,
        },
      },
    });

    const todayTime = subjectProgress.reduce((sum, s) => {
      // Approximate today's time (this is simplified - you may want to track this separately)
      return sum + s.totalTimeSeconds * 0.1; // Rough estimate
    }, 0);

    // Week activity
    const weekLessons = await prisma.userLessonProgress.count({
      where: {
        userId,
        completedAt: {
          gte: weekStart,
        },
      },
    });

    const weekQuestions = await prisma.questionAttempt.findMany({
      where: {
        userId,
        createdAt: {
          gte: weekStart,
        },
      },
      select: {
        pointsEarned: true,
        question: {
          select: { points: true },
        },
      },
    });

    const totalWeekTime = subjectProgress.reduce((sum, s) => sum + s.totalTimeSeconds, 0);

    const averageScore =
      weekQuestions.length > 0
        ? weekQuestions.reduce(
            (sum, q) => sum + (q.pointsEarned / (q.question.points || 1)) * 100,
            0
          ) / weekQuestions.length
        : 0;

    // Recent activity (last 5 activities)
    const recentLessons = await prisma.userLessonProgress.findMany({
      where: { userId, completedAt: { not: null } },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                subject: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
      orderBy: { completedAt: 'desc' },
      take: 5,
    });

    const recentActivity = recentLessons.map((activity) => ({
      type: 'LESSON' as const,
      title: activity.lesson.title,
      subjectName: activity.lesson.module.subject.name,
      timestamp: activity.completedAt!,
    }));

    // Upcoming goals
    const daysUntilExam = user?.targetExamDate
      ? Math.ceil((user.targetExamDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null;

    const dailyGoalSeconds = (user?.dailyStudyGoal || 2) * 3600;
    const todayProgressPercent = Math.min(100, (todayTime / dailyGoalSeconds) * 100);

    return {
      overallProgress: {
        totalSubjects,
        completedSubjects,
        averageProgress: Math.round(averageProgress * 10) / 10,
      },
      todayActivity: {
        timeSpentSeconds: Math.round(todayTime),
        lessonsCompleted: todayLessons,
        questionsAttempted: todayQuestions,
      },
      weekActivity: {
        totalTimeSeconds: totalWeekTime,
        lessonsCompleted: weekLessons,
        questionsAttempted: weekQuestions.length,
        averageScore: Math.round(averageScore * 10) / 10,
      },
      recentActivity,
      upcomingGoals: {
        targetExamDate: user?.targetExamDate || null,
        daysUntilExam,
        dailyStudyGoal: user?.dailyStudyGoal || 2,
        todayProgress: Math.round(todayProgressPercent),
      },
    };
  }
}

export default new ProgressService();
