// src/modules/progress/service/progress.service.ts

import { prisma } from '@/shared/config';
import {
  DashboardStatsResponse,
  SubjectProgressDetailResponse,
  StudyStreakResponse,
} from '../interfaces/progress.interface';
import { NotFoundError } from '@/shared/utils';

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

  async getSubjectProgressDetail(
    userId: string,
    subjectId: string
  ): Promise<SubjectProgressDetailResponse> {
    // Get subject with progress
    const subjectProgress = await prisma.userSubjectProgress.findUnique({
      where: {
        userId_subjectId: { userId, subjectId },
      },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!subjectProgress) {
      throw new NotFoundError('Subject progress not found');
    }

    // Get all modules with progress
    const modules = await prisma.module.findMany({
      where: {
        subjectId,
        isPublished: true,
      },
      include: {
        userProgress: {
          where: { userId },
        },
        lessons: {
          where: { isPublished: true },
        },
        questions: {
          where: { type: 'MCQ', isPublished: true },
          include: {
            attempts: {
              where: { userId },
              select: {
                pointsEarned: true,
              },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    // Calculate module stats
    const moduleStats = modules.map((module) => {
      const progress = module.userProgress[0];
      const totalLessons = module.lessons.length;
      const completedLessons = progress?.completedLessons || 0;

      // Calculate average quiz score for this module
      const allAttempts = module.questions.flatMap((q) => q.attempts);
      const totalPoints = module.questions.reduce((sum, q) => sum + q.points, 0);
      const earnedPoints = allAttempts.reduce((sum, a) => sum + a.pointsEarned, 0);
      const quizAverage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : null;

      return {
        id: module.id,
        name: module.name,
        progressPercent: progress?.progressPercent || 0,
        status: progress?.status || 'NOT_STARTED',
        completedLessons,
        totalLessons,
        quizAverage: quizAverage ? Math.round(quizAverage * 10) / 10 : null,
      };
    });

    // Overall performance stats
    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const totalLessonsCompleted = moduleStats.reduce((sum, m) => sum + m.completedLessons, 0);

    const allQuestionAttempts = await prisma.questionAttempt.count({
      where: {
        userId,
        question: {
          module: {
            subjectId,
          },
        },
      },
    });

    const allQuizAttempts = await prisma.questionAttempt.findMany({
      where: {
        userId,
        question: {
          type: 'MCQ',
          module: {
            subjectId,
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
      allQuizAttempts.length > 0
        ? allQuizAttempts.reduce(
            (sum, a) => sum + (a.pointsEarned / (a.question.points || 1)) * 100,
            0
          ) / allQuizAttempts.length
        : 0;

    // Get week start
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);

    // Time spent this week (approximate from lesson progress updates)
    const weekLessons = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        lesson: {
          module: {
            subjectId,
          },
        },
        updatedAt: {
          gte: weekStart,
        },
      },
      select: {
        timeSpentSeconds: true,
      },
    });

    const timeSpentThisWeek = weekLessons.reduce((sum, l) => sum + l.timeSpentSeconds, 0);

    const completionRate = totalLessons > 0 ? (totalLessonsCompleted / totalLessons) * 100 : 0;

    // Recent lessons completed
    const recentLessons = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        isCompleted: true,
        lesson: {
          module: {
            subjectId,
          },
        },
      },
      include: {
        lesson: {
          include: {
            module: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { completedAt: 'desc' },
      take: 5,
    });

    return {
      subject: {
        id: subjectProgress.subject.id,
        name: subjectProgress.subject.name,
        progressPercent: subjectProgress.progressPercent,
        status: subjectProgress.status,
        totalTimeSeconds: subjectProgress.totalTimeSeconds,
        lastAccessedAt: subjectProgress.lastAccessedAt,
      },
      modules: moduleStats,
      performance: {
        totalLessonsCompleted,
        totalLessons,
        totalQuestionsAttempted: allQuestionAttempts,
        averageQuizScore: Math.round(averageQuizScore * 10) / 10,
        timeSpentThisWeek,
        completionRate: Math.round(completionRate * 10) / 10,
      },
      recentLessons: recentLessons.map((l) => ({
        id: l.lesson.id,
        title: l.lesson.title,
        moduleName: l.lesson.module.name,
        completedAt: l.completedAt!,
      })),
    };
  }

  async getStudyStreak(userId: string): Promise<StudyStreakResponse> {
    // Get user's daily goal
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { dailyStudyGoal: true },
    });

    const dailyGoalHours = user?.dailyStudyGoal || 2;
    const dailyGoalSeconds = dailyGoalHours * 3600;

    // Get all lesson progress updates (proxy for study sessions)
    const allProgress = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        timeSpentSeconds: { gt: 0 },
      },
      select: {
        timeSpentSeconds: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'asc' },
    });

    // Group by date
    const dailyActivity = new Map<string, number>();

    allProgress.forEach((progress) => {
      const dateKey = progress.updatedAt.toISOString().split('T')[0];
      if (dateKey) {
        const current = dailyActivity.get(dateKey) || 0;
        dailyActivity.set(dateKey, current + progress.timeSpentSeconds);
      }
    });

    // Calculate current streak
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    const dates = Array.from(dailyActivity.keys()).sort();

    // Calculate streaks
    for (let i = dates.length - 1; i >= 0; i--) {
      const dateStr = dates[i];
      if (!dateStr) continue;

      const date = new Date(dateStr);
      const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === currentStreak) {
        currentStreak++;
        tempStreak++;
      } else {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        tempStreak = 1;
      }
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }

    // Today's progress
    const todayKey = today.toISOString().split('T')[0];
    const todaySeconds = todayKey ? dailyActivity.get(todayKey) || 0 : 0;
    const todayMinutes = Math.floor(todaySeconds / 60);
    const todayProgress = Math.min(100, Math.round((todaySeconds / dailyGoalSeconds) * 100));
    const goalMet = todaySeconds >= dailyGoalSeconds;

    // Last 7 days activity
    const weekActivity = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];

      if (dateKey) {
        const seconds = dailyActivity.get(dateKey) || 0;

        weekActivity.push({
          date: dateKey,
          minutesStudied: Math.floor(seconds / 60),
          goalMet: seconds >= dailyGoalSeconds,
        });
      }
    }

    // Last 30 days calendar
    const monthCalendar = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];

      if (dateKey) {
        const seconds = dailyActivity.get(dateKey) || 0;

        monthCalendar.push({
          date: dateKey,
          minutesStudied: Math.floor(seconds / 60),
          goalMet: seconds >= dailyGoalSeconds,
        });
      }
    }

    // Streak history (simplified - find continuous streaks)
    const streakHistory: {
      startDate: Date;
      endDate: Date;
      lengthDays: number;
    }[] = [];

    let streakStart: Date | null = null;
    let streakLength = 0;

    dates.forEach((dateStr, index) => {
      if (!dateStr) return;

      const date = new Date(dateStr);
      const nextDateStr = dates[index + 1];
      const nextDate = nextDateStr ? new Date(nextDateStr) : null;

      if (!streakStart) {
        streakStart = date;
        streakLength = 1;
      } else {
        const daysDiff = nextDate
          ? Math.floor((nextDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
          : 999;

        if (daysDiff === 1) {
          streakLength++;
        } else {
          if (streakLength >= 3) {
            // Only record streaks of 3+ days
            streakHistory.push({
              startDate: streakStart,
              endDate: date,
              lengthDays: streakLength,
            });
          }
          streakStart = nextDate;
          streakLength = 1;
        }
      }
    });

    return {
      currentStreak,
      longestStreak,
      totalStudyDays: dailyActivity.size,
      dailyGoal: {
        targetHours: dailyGoalHours,
        todayProgress,
        todayMinutes,
        goalMet,
      },
      weekActivity,
      monthCalendar,
      streakHistory: streakHistory.slice(-5), // Last 5 streaks
    };
  }
}



export default new ProgressService();