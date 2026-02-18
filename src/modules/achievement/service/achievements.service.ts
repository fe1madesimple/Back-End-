// src/modules/achievements/services/achievement.service.ts

import { prisma } from '@/shared/config';

class AchievementService {
  private unlockedCache = new Map<string, Set<string>>();

  async getAllAchievements() {
    return await prisma.achievement.findMany({
      orderBy: [{ type: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async getUserAchievements(userId: string) {
    // Get all achievements
    const allAchievements = await prisma.achievement.findMany({
      orderBy: [{ type: 'asc' }, { createdAt: 'asc' }],
    });

    // Get user's unlocked achievements
    const unlockedAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true, unlockedAt: true },
    });

    const unlockedMap = new Map(
      unlockedAchievements.map((ua) => [ua.achievementId, ua.unlockedAt])
    );

    // Combine into single array with locked/unlocked status
    return allAchievements.map((achievement) => {
      const unlockedAt = unlockedMap.get(achievement.id);
      return {
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        type: achievement.type,
        isUnlocked: !!unlockedAt,
        unlockedAt: unlockedAt || null,
      };
    });
  }

  async initializeCache(userId: string) {
    if (this.unlockedCache.has(userId)) return;

    const unlocked = await prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });

    this.unlockedCache.set(userId, new Set(unlocked.map((u) => u.achievementId)));
  }

  async checkAllAchievements(userId: string) {
    await this.initializeCache(userId);
    const alreadyUnlocked = this.unlockedCache.get(userId)!;

    const allAchievements = await prisma.achievement.findMany();
    const toCheck = allAchievements.filter((a) => !alreadyUnlocked.has(a.id));

    if (toCheck.length === 0) return [];

    const checkPromises = toCheck.map((achievement) =>
      this.evaluateCondition(userId, achievement).then((qualifies) =>
        qualifies ? achievement : null
      )
    );

    const results = await Promise.all(checkPromises);
    const qualified = results.filter(Boolean);

    const unlockPromises = qualified.map((ach) =>
      prisma.userAchievement
        .create({
          data: { userId, achievementId: ach!.id },
          include: { achievement: true },
        })
        .then((unlocked) => {
          alreadyUnlocked.add(ach!.id);
          return unlocked;
        })
    );

    return await Promise.all(unlockPromises);
  }

  private async evaluateCondition(userId: string, achievement: any): Promise<boolean> {
    const condition = achievement.condition as any;

    switch (achievement.type) {
      case 'PRACTICE_MILESTONE':
        return this.checkPracticeMilestone(userId, condition);
      case 'LESSON_MILESTONE':
        return this.checkLessonMilestone(userId, condition);
      case 'STREAK_MILESTONE':
        return this.checkStreakMilestone(userId, condition);
      case 'QUIZ_ACCURACY':
        return this.checkQuizAccuracy(userId, condition);
      case 'EXAM_SIMULATION':
        return this.checkSimulation(userId, condition);
      case 'SUBJECT_MASTERY':
        return this.checkSubjectMastery(userId, condition);
      case 'IMPROVEMENT_ACHIEVEMENT':
        return this.checkImprovement(userId, condition);
      case 'TIME_ACHIEVEMENT':
        return this.checkTimeAchievement(userId, condition);
      case 'CASE_LAW_MASTERY':
        return this.checkCaseLawMastery(userId, condition);
      case 'COMBO_ACHIEVEMENT':
        return this.checkCombo(userId, condition);
      default:
        return false;
    }
  }

  private async checkPracticeMilestone(userId: string, condition: any): Promise<boolean> {
    if (condition.essaysSubmitted) {
      const count = await prisma.essayAttempt.count({ where: { userId } });
      return count >= condition.essaysSubmitted;
    }
    if (condition.highScores) {
      const count = await prisma.essayAttempt.count({
        where: { userId, aiScore: { gte: condition.minScore } },
      });
      return count >= condition.highScores;
    }
    if (condition.underAverageTime) {
      const attempts = await prisma.essayAttempt.findMany({
        where: { userId },
        include: { question: true },
      });
      return attempts.some((a) => a.timeTakenSeconds < a.question.averageAttemptSeconds);
    }
    if (condition.allSubjectsAttempted) {
      const distinctSubjects = await prisma.essayAttempt.findMany({
        where: { userId },
        select: { question: { select: { subject: true } } },
        distinct: ['questionId'],
      });
      const subjects = new Set(distinctSubjects.map((d) => d.question.subject));
      return subjects.size >= 8;
    }
    return false;
  }

  private async checkLessonMilestone(userId: string, condition: any): Promise<boolean> {
    if (condition.lessonsCompleted) {
      const count = await prisma.userLessonProgress.count({
        where: { userId, isCompleted: true },
      });
      return count >= condition.lessonsCompleted;
    }
    if (condition.lessonsInOneDay) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const count = await prisma.userLessonProgress.count({
        where: {
          userId,
          isCompleted: true,
          completedAt: { gte: today },
        },
      });
      return count >= condition.lessonsInOneDay;
    }
    if (condition.moduleCompletion) {
      const moduleProgress = await prisma.userModuleProgress.findFirst({
        where: { userId, progressPercent: 100 },
      });
      return !!moduleProgress;
    }
    return false;
  }

  private async checkStreakMilestone(userId: string, condition: any): Promise<boolean> {
    if (condition.streak) {
      // Calculate streak manually
      const sessions = await prisma.dailyStudySession.findMany({
        where: { userId, todayTotalSeconds: { gt: 0 } },
        orderBy: { date: 'desc' },
        take: 100,
      });

      let currentStreak = 0;
      let expectedDate = new Date();
      expectedDate.setHours(0, 0, 0, 0);

      for (const session of sessions) {
        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);

        if (sessionDate.getTime() === expectedDate.getTime()) {
          currentStreak++;
          expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
          break;
        }
      }

      return currentStreak >= condition.streak;
    }
    if (condition.weekendStudy) {
      const sessions = await prisma.dailyStudySession.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 7,
      });
      const weekend = sessions.filter((s) => {
        const day = new Date(s.date).getDay();
        return day === 0 || day === 6;
      });
      return weekend.length >= 2;
    }
    if (condition.studyBefore || condition.studyAfter) {
      const sessions = await prisma.dailyStudySession.findMany({
        where: { userId, currentSessionStart: { not: null } },
      });
      return sessions.some((s) => {
        const hour = s.currentSessionStart!.getHours();
        return condition.studyBefore ? hour < condition.studyBefore : hour >= condition.studyAfter;
      });
    }
    return false;
  }

  private async checkQuizAccuracy(userId: string, condition: any): Promise<boolean> {
    if (condition.quizzesCompleted) {
      const count = await prisma.quizSession.count({ where: { userId, isCompleted: true } });
      return count >= condition.quizzesCompleted;
    }
    if (condition.quizAccuracy) {
      const attempts = await prisma.quizAttempt.findMany({ where: { userId } });
      if (attempts.length < condition.minQuizzes) return false;
      const correct = attempts.filter((a) => a.isCorrect).length;
      const accuracy = (correct / attempts.length) * 100;
      return accuracy >= condition.quizAccuracy;
    }
    if (condition.perfectQuiz) {
      const sessions = await prisma.quizSession.findMany({
        where: { userId, isCompleted: true },
      });
      const perfectSession = sessions.find((s) => {
        const accuracy = s.totalQuestions > 0 ? (s.correctAnswers / s.totalQuestions) * 100 : 0;
        return accuracy === 100;
      });
      return !!perfectSession;
    }
    if (condition.consecutiveCorrect) {
      const attempts = await prisma.quizAttempt.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: condition.consecutiveCorrect,
      });
      return attempts.length === condition.consecutiveCorrect && attempts.every((a) => a.isCorrect);
    }
    return false;
  }

  private async checkSimulation(userId: string, condition: any): Promise<boolean> {
    if (condition.simulationsCompleted) {
      const count = await prisma.simulation.count({ where: { userId, endedAt: { not: null } } });
      return count >= condition.simulationsCompleted;
    }
    if (condition.simulationsPassed) {
      const count = await prisma.simulation.count({ where: { userId, passed: true } });
      return count >= condition.simulationsPassed;
    }
    if (condition.simulationTime) {
      const fast = await prisma.simulation.findFirst({
        where: { userId, totalTimeSeconds: { lte: condition.simulationTime } },
      });
      return !!fast;
    }
    if (condition.perfectSimulation) {
      const perfect = await prisma.simulation.findFirst({
        where: { userId, overallScore: 100 },
      });
      return !!perfect;
    }
    return false;
  }

  private async checkSubjectMastery(userId: string, condition: any): Promise<boolean> {
    if (condition.essaysCompleted) {
      const count = await prisma.essayAttempt.count({
        where: {
          userId,
          question: { subject: condition.subject },
        },
      });
      return count >= condition.essaysCompleted;
    }
    if (condition.highScores) {
      const count = await prisma.essayAttempt.count({
        where: {
          userId,
          question: { subject: condition.subject },
          aiScore: { gte: condition.minScore },
        },
      });
      return count >= condition.highScores;
    }
    return false;
  }

  private async checkImprovement(userId: string, condition: any): Promise<boolean> {
    if (condition.scoreImprovement) {
      const questionAttempts = await prisma.essayAttempt.groupBy({
        by: ['questionId'],
        where: { userId },
        _count: { questionId: true },
        having: { questionId: { _count: { gte: 2 } } },
      });

      for (const group of questionAttempts) {
        const attempts = await prisma.essayAttempt.findMany({
          where: { userId, questionId: group.questionId },
          orderBy: { createdAt: 'asc' },
        });

        if (attempts.length < 2) continue;

        const firstScore = attempts[0]?.aiScore;
        const lastScore = attempts[attempts.length - 1]?.aiScore;

        if (
          firstScore !== null &&
          firstScore !== undefined &&
          lastScore !== null &&
          lastScore !== undefined
        ) {
          const improvement = lastScore - firstScore;
          if (improvement >= condition.scoreImprovement) return true;
        }
      }
    }
    if (condition.failedThenPassed) {
      const questionAttempts = await prisma.essayAttempt.groupBy({
        by: ['questionId'],
        where: { userId },
        _count: { questionId: true },
        having: { questionId: { _count: { gte: 2 } } },
      });

      for (const group of questionAttempts) {
        const attempts = await prisma.essayAttempt.findMany({
          where: { userId, questionId: group.questionId },
          orderBy: { createdAt: 'asc' },
        });

        if (attempts.length < 2) continue;

        const firstScore = attempts[0]?.aiScore;
        const lastScore = attempts[attempts.length - 1]?.aiScore;

        if (
          firstScore !== null &&
          firstScore !== undefined &&
          lastScore !== null &&
          lastScore !== undefined
        ) {
          if (firstScore < 50 && lastScore >= 50) return true;
        }
      }
    }
    if (condition.sameQuestionAttempts) {
      const maxAttempts = await prisma.essayAttempt.groupBy({
        by: ['questionId'],
        where: { userId },
        _count: { questionId: true },
      });
      return maxAttempts.some((g) => g._count.questionId >= condition.sameQuestionAttempts);
    }
    return false;
  }

  private async checkTimeAchievement(userId: string, condition: any): Promise<boolean> {
    if (condition.studyTimeSeconds) {
      const session = await prisma.dailyStudySession.findFirst({
        where: { userId, todayTotalSeconds: { gte: condition.studyTimeSeconds } },
      });
      return !!session;
    }
    if (condition.consistentPacing) {
      const attempts = await prisma.essayAttempt.findMany({
        where: { userId },
        include: { question: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });
      if (attempts.length < 5) return false;
      return attempts.every((a) => {
        const diff = Math.abs(a.timeTakenSeconds - a.question.averageAttemptSeconds);
        return diff <= a.question.averageAttemptSeconds * 0.1;
      });
    }
    return false;
  }

  private async checkCaseLawMastery(_userId: string, _condition: any): Promise<boolean> {
    // Placeholder - requires AI feedback parsing
    return false;
  }

  private async checkCombo(userId: string, condition: any): Promise<boolean> {
    if (condition.videoQuizEssaySameDay) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const [video, quiz, essay] = await Promise.all([
        prisma.userLessonProgress.findFirst({
          where: { userId, completedAt: { gte: today } },
        }),
        prisma.quizAttempt.findFirst({
          where: { userId, createdAt: { gte: today } },
        }),
        prisma.essayAttempt.findFirst({
          where: { userId, createdAt: { gte: today } },
        }),
      ]);
      return !!(video && quiz && essay);
    }
    if (condition.subjectsInWeek) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const attempts = await prisma.essayAttempt.findMany({
        where: {
          userId,
          createdAt: { gte: oneWeekAgo },
        },
        select: { question: { select: { subject: true } } },
        distinct: ['questionId'],
      });

      const subjects = new Set(attempts.map((a) => a.question.subject));
      return subjects.size >= condition.subjectsInWeek;
    }
    if (condition.simulationPassed && condition.subjectMastery) {
      const [simulation, quizAccuracy] = await Promise.all([
        prisma.simulation.findFirst({ where: { userId, passed: true } }),
        prisma.quizAttempt.findMany({ where: { userId } }),
      ]);

      if (!simulation) return false;

      const correct = quizAccuracy.filter((a) => a.isCorrect).length;
      const accuracy = (correct / quizAccuracy.length) * 100;

      return accuracy >= condition.subjectMastery;
    }
    return false;
  }
}

export default new AchievementService();
