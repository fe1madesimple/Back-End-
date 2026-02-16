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
}

export default new AchievementService();
