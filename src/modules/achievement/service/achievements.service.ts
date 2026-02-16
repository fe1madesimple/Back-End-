import { prisma } from '@/shared/config';

class AchievementService {
  private unlockedCache = new Map<string, Set<string>>();

  async getAllAchievements() {
    return await prisma.achievement.findMany({
      orderBy: [{ type: 'asc' }, { createdAt: 'asc' }],
    });
  }
}

export default new AchievementService();
