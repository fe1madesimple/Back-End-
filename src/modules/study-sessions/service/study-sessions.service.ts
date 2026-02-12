import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError, ForbiddenError } from '@/shared/utils';
import { StartSessionResponse } from '../interface/study-session.interface';

class StudySessionService {
  async startSession(userId: string): Promise<StartSessionResponse> {
    const session = await prisma.studySession.create({
      data: {
        userId,
        startedAt: new Date(),
      },
    });

    return {
      sessionId: session.id,
      message: 'Session in progress',
    };
  }

  async endSession(userId: string, sessionId: string): Promise<void> {
    const session = await prisma.studySession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundError('Study session not found');
    }

    if (session.userId !== userId) {
      throw new ForbiddenError('Access denied');
    }

    if (session.endedAt) {
      return;
    }

    const endedAt = new Date();
    const durationSeconds = Math.floor((endedAt.getTime() - session.startedAt.getTime()) / 1000);

    await prisma.studySession.update({
      where: { id: sessionId },
      data: {
        endedAt,
        durationSeconds,
      },
    });
  }
}

export default new StudySessionService();
