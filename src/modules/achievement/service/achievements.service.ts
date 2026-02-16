import { prisma } from '@/shared/config';

class AchievementService {
  private unlockedCache = new Map<string, Set<string>>();

  async getAllAchievements() {
    return await prisma.achievement.findMany({
      orderBy: [{ type: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async getUserAchievements(userId: string) {
    return await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' },
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
      return attempts.some((a) => a.timeTakenSeconds < a.question.averageAttemptTimeSeconds);
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
      const count = await prisma.lessonProgress.count({
        where: { userId, completionPercentage: 100 },
      });
      return count >= condition.lessonsCompleted;
    }
    if (condition.lessonsInOneDay) {
      const today = new Date().toISOString().split('T')[0];
      const count = await prisma.lessonProgress.count({
        where: {
          userId,
          completionPercentage: 100,
          updatedAt: { gte: new Date(today) },
        },
      });
      return count >= condition.lessonsInOneDay;
    }
    if (condition.moduleCompletion) {
      const moduleProgress = await prisma.moduleProgress.findFirst({
        where: { userId, completionPercentage: 100 },
      });
      return !!moduleProgress;
    }
    return false;
  }

  private async checkStreakMilestone(userId: string, condition: any): Promise<boolean> {
    if (condition.streak) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { currentStreak: true },
      });
      return (user?.currentStreak || 0) >= condition.streak;
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
}

export default new AchievementService();
