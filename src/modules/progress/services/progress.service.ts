// src/modules/progress/service/progress.service.ts

import { prisma } from '@/shared/config';
import {
  DashboardStatsResponse,
  SubjectProgressDetailResponse,
  StudyStreakResponse,
  WeeklySummaryResponse,
  ModuleStatsResponse,
} from '../interfaces/progress.interface';
import { NotFoundError} from '@/shared/utils';

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

  async getWeeklySummary(userId: string): Promise<WeeklySummaryResponse> {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(today);
    weekEnd.setHours(23, 59, 59, 999);

    // Get user's daily goal
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { dailyStudyGoal: true },
    });

    const dailyGoalSeconds = (user?.dailyStudyGoal || 2) * 3600;

    // Get all lesson progress for the week
    const weekLessons = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        updatedAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
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
    });

    // Get completed lessons this week
    const completedLessons = await prisma.userLessonProgress.count({
      where: {
        userId,
        isCompleted: true,
        completedAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });

    // Get questions attempted this week
    const weekQuestions = await prisma.questionAttempt.findMany({
      where: {
        userId,
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
      select: {
        createdAt: true,
        pointsEarned: true,
        question: {
          select: { points: true },
        },
      },
    });

    // Calculate average quiz score
    const averageQuizScore =
      weekQuestions.length > 0
        ? weekQuestions.reduce(
            (sum, q) => sum + (q.pointsEarned / (q.question.points || 1)) * 100,
            0
          ) / weekQuestions.length
        : 0;

    // Group data by day
    const dailyData = new Map<
      string,
      {
        timeSeconds: number;
        lessonsCompleted: number;
        questionsAttempted: number;
        quizScores: number[];
      }
    >();

    // Process lesson data
    weekLessons.forEach((lesson) => {
      const dateKey = lesson.updatedAt.toISOString().split('T')[0];
      if (!dateKey) return;

      const current = dailyData.get(dateKey) || {
        timeSeconds: 0,
        lessonsCompleted: 0,
        questionsAttempted: 0,
        quizScores: [],
      };

      current.timeSeconds += lesson.timeSpentSeconds;
      if (lesson.isCompleted && lesson.completedAt) {
        const completedKey = lesson.completedAt.toISOString().split('T')[0];
        if (completedKey === dateKey) {
          current.lessonsCompleted++;
        }
      }

      dailyData.set(dateKey, current);
    });

    // Process question data
    weekQuestions.forEach((attempt) => {
      const dateKey = attempt.createdAt.toISOString().split('T')[0];
      if (!dateKey) return;

      const current = dailyData.get(dateKey) || {
        timeSeconds: 0,
        lessonsCompleted: 0,
        questionsAttempted: 0,
        quizScores: [],
      };

      current.questionsAttempted++;
      current.quizScores.push((attempt.pointsEarned / (attempt.question.points || 1)) * 100);

      dailyData.set(dateKey, current);
    });

    // Build daily breakdown for last 7 days
    const dailyBreakdown = [];
    let daysStudied = 0;
    let dailyGoalsMet = 0;

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];

      if (!dateKey) continue;

      const dayData = dailyData.get(dateKey);
      const timeSeconds = dayData?.timeSeconds || 0;
      const goalMet = timeSeconds >= dailyGoalSeconds;

      if (timeSeconds > 0) {
        daysStudied++;
      }

      if (goalMet) {
        dailyGoalsMet++;
      }

      const avgScore =
        dayData && dayData.quizScores.length > 0
          ? dayData.quizScores.reduce((sum, s) => sum + s, 0) / dayData.quizScores.length
          : null;

      dailyBreakdown.push({
        date: dateKey,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        timeSeconds,
        lessonsCompleted: dayData?.lessonsCompleted || 0,
        questionsAttempted: dayData?.questionsAttempted || 0,
        quizScore: avgScore ? Math.round(avgScore * 10) / 10 : null,
        goalMet,
      });
    }

    // Calculate top subjects
    const subjectData = new Map<string, { timeSeconds: number; lessonsCompleted: number }>();

    weekLessons.forEach((lesson) => {
      const subjectName = lesson.lesson.module.subject.name;
      const current = subjectData.get(subjectName) || { timeSeconds: 0, lessonsCompleted: 0 };

      current.timeSeconds += lesson.timeSpentSeconds;
      if (lesson.isCompleted) {
        current.lessonsCompleted++;
      }

      subjectData.set(subjectName, current);
    });

    const topSubjects = Array.from(subjectData.entries())
      .map(([subjectName, data]) => ({
        subjectName,
        timeSeconds: data.timeSeconds,
        lessonsCompleted: data.lessonsCompleted,
      }))
      .sort((a, b) => b.timeSeconds - a.timeSeconds)
      .slice(0, 3);

    // Generate achievements
    const achievements: { type: string; title: string; description: string }[] = [];

    if (daysStudied === 7) {
      achievements.push({
        type: 'STREAK',
        title: 'Perfect Week! 🔥',
        description: 'You studied every day this week',
      });
    }

    if (dailyGoalsMet >= 5) {
      achievements.push({
        type: 'GOAL',
        title: 'Goal Crusher! 🎯',
        description: `Met your daily goal ${dailyGoalsMet} times this week`,
      });
    }

    if (completedLessons >= 10) {
      achievements.push({
        type: 'LESSONS',
        title: 'Learning Machine! 📚',
        description: `Completed ${completedLessons} lessons this week`,
      });
    }

    if (averageQuizScore >= 80) {
      achievements.push({
        type: 'SCORE',
        title: 'Quiz Master! ⭐',
        description: `${Math.round(averageQuizScore)}% average quiz score`,
      });
    }

    // Calculate total time
    const totalTimeSeconds = Array.from(dailyData.values()).reduce(
      (sum, day) => sum + day.timeSeconds,
      0
    );

    return {
      weekRange: {
        startDate: weekStart.toISOString().split('T')[0]!,
        endDate: weekEnd.toISOString().split('T')[0]!,
      },
      summary: {
        totalTimeSeconds,
        totalLessonsCompleted: completedLessons,
        totalQuestionsAttempted: weekQuestions.length,
        averageQuizScore: Math.round(averageQuizScore * 10) / 10,
        daysStudied,
        dailyGoalsMet,
      },
      dailyBreakdown,
      topSubjects,
      achievements,
    };
  }

  // src/modules/progress/service/progress.service.ts

  async getModuleStats(userId: string, moduleId: string): Promise<ModuleStatsResponse> {
    // Get module with progress
    const module = await prisma.module.findUnique({
      where: { id: moduleId, isPublished: true },
      include: {
        subject: {
          select: { name: true },
        },
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
        questions: {
          where: { type: 'MCQ', isPublished: true },
          include: {
            attempts: {
              where: { userId },
              orderBy: { createdAt: 'desc' },
              include: {
                question: {
                  select: { text: true, points: true },
                },
              },
            },
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundError('Module not found');
    }

    const moduleProgress = module.userProgress[0];

    // Lesson statistics
    const totalLessons = module.lessons.length;
    const completedLessons = module.lessons.filter((l) => l.userProgress[0]?.isCompleted).length;

    const totalTimeSpent = module.lessons.reduce(
      (sum: number, l) => sum + (l.userProgress[0]?.timeSpentSeconds || 0),
      0
    );

    const averageTimePerLesson =
      completedLessons > 0 ? Math.floor(totalTimeSpent / completedLessons) : 0;

    // Quiz statistics
    const totalQuestions = module.questions.length;
    const attemptedQuestions = module.questions.filter((q) => q.attempts.length > 0).length;

    const allAttempts = module.questions.flatMap((q) => q.attempts);
    const correctAttempts = allAttempts.filter((a) => a.isCorrect).length;

    const scores = allAttempts.map((a) => (a.pointsEarned / (a.question.points || 1)) * 100);

    const averageScore =
      scores.length > 0 ? scores.reduce((sum: number, s: number) => sum + s, 0) / scores.length : 0;

    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const worstScore = scores.length > 0 ? Math.min(...scores) : 0;

    // Performance analysis - strong/weak topics
    const topicPerformance = new Map<string, { correct: number; total: number }>();

    module.questions.forEach((question) => {
      const topic = question.text.split(' ').slice(0, 5).join(' '); // Simplified topic extraction

      question.attempts.forEach((attempt) => {
        const current = topicPerformance.get(topic) || { correct: 0, total: 0 };
        current.total++;
        if (attempt.isCorrect) {
          current.correct++;
        }
        topicPerformance.set(topic, current);
      });
    });

    const topicScores = Array.from(topicPerformance.entries())
      .map(([topic, data]) => ({
        topic,
        score: data.total > 0 ? (data.correct / data.total) * 100 : 0,
        attempts: data.total,
      }))
      .filter((t) => t.attempts >= 2); // Only topics with 2+ attempts

    const strongTopics = topicScores
      .filter((t) => t.score >= 75)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((t) => ({
        topic: t.topic,
        score: Math.round(t.score * 10) / 10,
      }));

    const weakTopics = topicScores
      .filter((t) => t.score < 60)
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map((t) => ({
        topic: t.topic,
        score: Math.round(t.score * 10) / 10,
      }));

    // Recent attempts (last 10)
    const recentAttempts = allAttempts.slice(0, 10).map((attempt) => ({
      questionText: attempt.question.text.slice(0, 80) + '...',
      isCorrect: attempt.isCorrect ?? false,
      score: Math.round((attempt.pointsEarned / (attempt.question.points || 1)) * 100 * 10) / 10,
      timestamp: attempt.createdAt,
    }));

    // Generate recommendations
    const recommendations: { type: string; message: string }[] = [];

    if (completedLessons < totalLessons) {
      recommendations.push({
        type: 'LESSONS',
        message: `Complete remaining ${totalLessons - completedLessons} lessons to finish this module`,
      });
    }

    if (averageScore < 70) {
      recommendations.push({
        type: 'PRACTICE',
        message: 'Your quiz average is below 70% - review lessons and practice more questions',
      });
    }

    if (weakTopics.length > 0) {
      recommendations.push({
        type: 'WEAK_TOPICS',
        message: `Focus on: ${weakTopics.map((t) => t.topic).join(', ')}`,
      });
    }

    if (attemptedQuestions < totalQuestions) {
      recommendations.push({
        type: 'QUESTIONS',
        message: `Try all ${totalQuestions - attemptedQuestions} remaining practice questions`,
      });
    }

    if (completedLessons === totalLessons && averageScore >= 80) {
      recommendations.push({
        type: 'READY',
        message: '🎉 Great work! You are ready to move to the next module',
      });
    }

    return {
      module: {
        id: module.id,
        name: module.name,
        subjectName: module.subject.name,
        progressPercent: moduleProgress?.progressPercent || 0,
        status: moduleProgress?.status || 'NOT_STARTED',
      },
      lessons: {
        totalLessons,
        completedLessons,
        averageTimePerLesson,
        totalTimeSpent,
      },
      quizzes: {
        totalQuestions,
        attemptedQuestions,
        correctAnswers: correctAttempts,
        averageScore: Math.round(averageScore * 10) / 10,
        bestScore: Math.round(bestScore * 10) / 10,
        worstScore: Math.round(worstScore * 10) / 10,
      },
      performance: {
        strongTopics,
        weakTopics,
        recentAttempts,
      },
      recommendations,
    };
  }
}

export default new ProgressService();