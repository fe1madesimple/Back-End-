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
}

export default new AchievementService();
