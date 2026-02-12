import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError, ForbiddenError } from '@/shared/utils';
import {
  EndSessionRequest,
  EndSessionResponse,
  StartSessionRequest,
  StartSessionResponse,
} from '../interface/study-session.interface';

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
}

export default new StudySessionService();