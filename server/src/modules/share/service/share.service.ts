import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import crypto from 'crypto';
 
class ShareService {
 
  // ─── generateToken ──────────────────────────────────────────────────────────
  // Called by logged-in user to create a shareable link.
  // type: 'ESSAY' | 'SIMULATION' | 'MCQ'
  // resourceId: the attemptId / practiceSessionId / quizSessionId
 
  async generateToken(
    userId: string,
    type: 'ESSAY' | 'SIMULATION' | 'MCQ',
    resourceId: string
  ) {
    // Validate resource belongs to this user before generating token
    await this.validateOwnership(userId, type, resourceId);
 
    // Check if a valid token already exists for this resource — reuse it
    const existing = await prisma.shareToken.findFirst({
      where: {
        userId,
        type,
        resourceId,
        expiresAt: { gt: new Date() },
      },
    });
 
    if (existing) {
      return {
        shareToken: existing.token,
        shareUrl: `${process.env.FRONTEND_URL}/share/${existing.token}`,
        expiresAt: existing.expiresAt,
        type: existing.type,
      };
    }
 
    // Generate a random URL-safe token
    const token = crypto.randomBytes(16).toString('hex'); // 32 char hex string
 
    // 2 days from now
    const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
 
    await prisma.shareToken.create({
      data: { token, userId, type, resourceId, expiresAt },
    });
 
    return {
      shareToken: token,
      shareUrl: `${process.env.FRONTEND_URL}/share/${token}`,
      expiresAt,
      type,
    };
  }
 
  // ─── resolveToken ────────────────────────────────────────────────────────────
  // Called with no auth — resolves token and returns the public result.
  // Increments viewCount on every access.
 
  async resolveToken(token: string) {
    const shareToken = await prisma.shareToken.findUnique({
      where: { token },
    });
 
    if (!shareToken) {
      throw new AppError('Share link not found', 404);
    }
 
    if (shareToken.expiresAt < new Date()) {
      throw new AppError('This share link has expired', 410);
    }
 
    // Increment view count — fire and forget, don't block response
    prisma.shareToken.update({
      where: { token },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {});
 
    return shareToken;
  }
 
  // ─── getSharedEssay ──────────────────────────────────────────────────────────
 
  async getSharedEssay(token: string) {
    const shareToken = await this.resolveToken(token);
 
    if (shareToken.type !== 'ESSAY') {
      throw new AppError('This link is not for an essay', 400);
    }
 
    const attempt = await prisma.essayAttempt.findUnique({
      where: { id: shareToken.resourceId },
      include: {
        question: {
          select: { text: true, subject: true, year: true, examType: true },
        },
        essayQuestion: {
          select: { text: true, subject: true },
        },
      },
    });
 
    if (!attempt) throw new AppError('Essay not found', 404);
 
    const isLessonPractice = attempt.source === 'LESSON_PRACTICE';
    const q  = attempt.question;
    const eq = attempt.essayQuestion;
 
    const subject      = isLessonPractice ? (eq?.subject ?? 'Unknown') : (q?.subject ?? 'Unknown');
    const questionText = isLessonPractice ? (eq?.text ?? '') : (q?.text ?? '');
    const year         = isLessonPractice ? null : (q?.year ?? null);
    const examType     = isLessonPractice ? null : (q?.examType ?? null);
    const aiScore20    = attempt.aiScore !== null ? Math.round((attempt.aiScore / 100) * 20) : 0;
 
    const feedbackObj   = attempt.feedback as Record<string, any> | null;
    const overallComment =
      feedbackObj?.overallComment ?? feedbackObj?.overall ?? feedbackObj?.comment ?? null;
 
    return {
      type: 'ESSAY',
      sharedBy: await this.getSharedByName(shareToken.userId),
      subject,
      source: isLessonPractice ? 'FROM_LESSON' : 'FROM_PRACTICE',
      attemptedAt: attempt.createdAt.toISOString(),
      timeTakenMinutes: Math.round(attempt.timeTakenSeconds / 60),
      passed: (attempt.aiScore ?? 0) >= 50,
      appPass: attempt.appPass ?? false,
      aiScore: aiScore20,
      scoreOutOf: 20,
      band: attempt.band ?? '',
      questionText,
      year,
      examType,
      userAnswer: attempt.answerText,
      sampleAnswer: attempt.sampleAnswer ?? null,
      feedback: attempt.feedback as object | null,
      strengths: attempt.strengths,
      improvements: attempt.improvements,
      overallComment,
    };
  }
 
  // ─── getSharedSimulation ─────────────────────────────────────────────────────
 
  async getSharedSimulation(token: string) {
    const shareToken = await this.resolveToken(token);
 
    if (shareToken.type !== 'SIMULATION') {
      throw new AppError('This link is not for a simulation', 400);
    }
 
    // practiceSessionId stored in resourceId
    const session = await prisma.practiceSession.findUnique({
      where: { id: shareToken.resourceId },
    });
 
    if (!session) throw new AppError('Simulation not found', 404);
 
    const attempts = await prisma.essayAttempt.findMany({
      where: { practiceSessionId: shareToken.resourceId },
      include: {
        question: {
          select: { id: true, text: true, subject: true, year: true, examType: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
 
    const totalAnswered = attempts.length;
 
    const overallScore =
      totalAnswered > 0
        ? Math.round(attempts.reduce((sum, a) => sum + (a.aiScore ?? 0), 0) / totalAnswered)
        : null;
 
    const essayItems = attempts.map((attempt, index) => {
      const q        = attempt.question;
      const rawScore = attempt.aiScore ?? 0;
      const aiScore20 = Math.round((rawScore / 100) * 20);
 
      return {
        attemptId:       attempt.id,
        index:           index + 1,
        total:           totalAnswered,
        questionText:    q?.text ?? '',
        subject:         q?.subject ?? null,
        year:            q?.year ?? null,
        examType:        q?.examType ?? null,
        userAnswer:      attempt.answerText,
        wordCount:       attempt.wordCount,
        timeTakenMinutes: Math.round(attempt.timeTakenSeconds / 60),
        aiScore:         aiScore20,
        scoreOutOf:      20,
        band:            attempt.band ?? '',
        passed:          rawScore >= 50,
        appPass:         attempt.appPass ?? false,
        sampleAnswer:    attempt.sampleAnswer ?? null,
        feedback:        attempt.feedback as object | null,
        strengths:       attempt.strengths,
        improvements:    attempt.improvements,
      };
    });
 
    return {
      type:         'SIMULATION',
      sharedBy:     await this.getSharedByName(shareToken.userId),
      subject:      session.subject ?? null,
      year:         session.year ?? null,
      startedAt:    session.startedAt.toISOString(),
      totalTimeMinutes: session.totalTimeSeconds
        ? Math.round(session.totalTimeSeconds / 60)
        : null,
      overallScore,
      passed:       overallScore !== null ? overallScore >= 50 : null,
      totalAnswered,
      attempts:     essayItems,
    };
  }
 
  // ─── getSharedMCQ ────────────────────────────────────────────────────────────
 
  async getSharedMCQ(token: string) {
    const shareToken = await this.resolveToken(token);
 
    if (shareToken.type !== 'MCQ') {
      throw new AppError('This link is not for an MCQ session', 400);
    }
 
    const session = await prisma.quizSession.findUnique({
      where: { id: shareToken.resourceId },
    });
 
    if (!session) throw new AppError('MCQ session not found', 404);
 
    // Resolve subject
    let subject = 'Unknown';
    if (session.lessonId) {
      const lesson = await prisma.lesson.findUnique({
        where: { id: session.lessonId },
        select: { module: { select: { subject: { select: { name: true } } } } },
      });
      subject = lesson?.module?.subject?.name ?? 'Unknown';
    }
 
    const rawAttempts = await prisma.questionAttempt.findMany({
      where: { quizSessionId: session.id },
      include: {
        question: {
          select: {
            text: true,
            options: true,
            correctAnswer: true,
            explanation: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
 
    const accuracy =
      session.totalQuestions > 0
        ? Math.round((session.correctAnswers / session.totalQuestions) * 100)
        : 0;
 
    const questions = rawAttempts.map((attempt, index) => {
      const q              = attempt.question;
      const options        = q?.options as Record<string, string> | null;
      const userAnswerKey  = attempt.answer ?? null;
      const correctKey     = q?.correctAnswer ?? '';
 
      return {
        index:           index + 1,
        total:           rawAttempts.length,
        questionText:    q?.text ?? '',
        userAnswer:      userAnswerKey === 'SKIPPED' ? null : userAnswerKey,
        userAnswerText:  userAnswerKey && options && userAnswerKey !== 'SKIPPED'
          ? (options[userAnswerKey] ?? '')
          : '',
        correctAnswer:     correctKey,
        correctAnswerText: options ? (options[correctKey] ?? '') : '',
        isCorrect:         attempt.isCorrect ?? false,
        explanation:       q?.explanation ?? null,
      };
    });
 
    return {
      type:           'MCQ',
      sharedBy:       await this.getSharedByName(shareToken.userId),
      subject,
      attemptedAt:    (session.completedAt ?? session.createdAt).toISOString(),
      correctAnswers: session.correctAnswers,
      totalQuestions: session.totalQuestions,
      accuracyPercent: accuracy,
      questions,
    };
  }
 
  // ─── Private helpers ─────────────────────────────────────────────────────────
 
  private async validateOwnership(
    userId: string,
    type: 'ESSAY' | 'SIMULATION' | 'MCQ',
    resourceId: string
  ) {
    if (type === 'ESSAY') {
      const attempt = await prisma.essayAttempt.findUnique({
        where: { id: resourceId },
        select: { userId: true },
      });
      if (!attempt || attempt.userId !== userId) {
        throw new AppError('Essay attempt not found', 404);
      }
    } else if (type === 'SIMULATION') {
      const session = await prisma.practiceSession.findUnique({
        where: { id: resourceId },
        select: { userId: true },
      });
      if (!session || session.userId !== userId) {
        throw new AppError('Simulation not found', 404);
      }
    } else if (type === 'MCQ') {
      const session = await prisma.quizSession.findUnique({
        where: { id: resourceId },
        select: { userId: true },
      });
      if (!session || session.userId !== userId) {
        throw new AppError('MCQ session not found', 404);
      }
    }
  }
 
  // Returns first name only for "Shared by Viktor" display
  private async getSharedByName(userId: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fullName: true },
    });
    const fullName = user?.fullName ?? 'A student';
    return fullName.split(' ')[0] ?? fullName;
  }
}
 
export default new ShareService();