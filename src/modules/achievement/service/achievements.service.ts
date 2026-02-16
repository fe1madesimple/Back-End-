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
}

export default new AchievementService();
