// src/modules/study-sessions/service/study-session.service.ts

import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError } from '@/shared/utils';
import { StartSessionRequest, StartSessionResponse } from '../interface/study-session.interface';

class StudySessionService {
  async startSession(userId: string, data: StartSessionRequest): Promise<StartSessionResponse> {
    const { subjectId, moduleId, sessionType } = data;

    // Verify subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId, isPublished: true },
      select: { id: true, name: true },
    });

    if (!subject) {
      throw new NotFoundError('Subject not found');
    }

    // Verify module if provided
    let module = null;
    if (moduleId) {
      module = await prisma.module.findUnique({
        where: { id: moduleId, subjectId, isPublished: true },
        select: { id: true, name: true },
      });

      if (!module) {
        throw new NotFoundError('Module not found');
      }
    }

    // Check if user has an active session
    const activeSession = await prisma.studySession.findFirst({
      where: {
        userId,
        endedAt: null,
      },
    });

    if (activeSession) {
      throw new BadRequestError(
        'You already have an active study session. Please end it before starting a new one.'
      );
    }

    // Create new session
    const session = await prisma.studySession.create({
      data: {
        userId,
        subjectId,
        moduleId: moduleId || null,
        sessionType,
        startedAt: new Date(),
      },
    });

    return {
      sessionId: session.id,
      startedAt: session.startedAt,
      subject: {
        id: subject.id,
        name: subject.name,
      },
      module: module
        ? {
            id: module.id,
            name: module.name,
          }
        : undefined,
    };
  }
}

export default new StudySessionService();
