import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError, ForbiddenError } from '@/shared/utils';
import { StartSessionResponse } from '../interface/study-session.interface';

class StudySessionService {
  async startSession(userId: string): Promise<StartSessionResponse> {
    const today = new Date().toISOString().split('T')[0]!;
    const now = new Date();

    // Get latest session (any day)
    const latestSession = await prisma.dailyStudySession.findFirst({
      where: { userId },
      orderBy: { date: 'desc' },
      select: { lifetimeTotalSeconds: true },
    });

    const lifetimeCarryOver = latestSession?.lifetimeTotalSeconds || 0;

    const session = await prisma.dailyStudySession.upsert({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      update: {
        currentSessionStart: now,
      },
      create: {
        userId,
        date: today,
        currentSessionStart: now,
        todayTotalSeconds: 0,
        lifetimeTotalSeconds: lifetimeCarryOver,
      },
    });

    return {
      sessionId: session.id,
      message: 'Session in progress',
    };
  }

  async endSession(userId: string, sessionId: string): Promise<void> {
    const session = await prisma.dailyStudySession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundError('Study session not found');
    }

    if (session.userId !== userId) {
      throw new ForbiddenError('Access denied');
    }

    if (!session.currentSessionStart) {
      return; // Already ended
    }

    const now = new Date();
    const duration = Math.floor((now.getTime() - session.currentSessionStart.getTime()) / 1000);

    await prisma.dailyStudySession.update({
      where: { id: sessionId },
      data: {
        todayTotalSeconds: session.todayTotalSeconds + duration,
        lifetimeTotalSeconds: session.lifetimeTotalSeconds + duration,
        currentSessionStart: null,
      },
    });
  }
}

export default new StudySessionService();
