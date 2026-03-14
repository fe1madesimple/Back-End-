// src/modules/history/service/history.service.ts

import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import {
  HistoryStatsResponse,
  HistoryFeedResponse,
  HistoryFeedItem,
  HistoryItemSource,
  MCQSessionDetailResponse,
  EssayAttemptDetailResponse,
  SimulationDetailResponse,
  SimulationEssayItem,
} from '../interface/history.interface';

class HistoryService {
  // ─── Stats Bar ──────────────────────────────────────────────────────────────
  // Powers the 3 stat cards at the top of the history page.

  async getStats(userId: string): Promise<HistoryStatsResponse> {
    const [essayAttempts, simulations, quizSessions] = await Promise.all([
      // Essay practice — all sources (LESSON_PRACTICE + PRACTICE)
      prisma.essayAttempt.findMany({
        where: { userId },
        select: { aiScore: true },
      }),

      // Full simulations
      prisma.simulation.findMany({
        where: { userId },
        select: { id: true, passed: true, totalTimeSeconds: true },
      }),

      // MCQ batch sessions — completed ones only
      prisma.quizSession.findMany({
        where: { userId, isCompleted: true },
        select: { correctAnswers: true, totalQuestions: true },
      }),
    ]);

    // Essay stats
    const totalEssays = essayAttempts.length;
    const avgScore =
      totalEssays > 0
        ? Math.round(
            essayAttempts.reduce((sum, a) => {
              // aiScore stored as 0-100; convert to /20 for display
              const score20 = a.aiScore !== null ? Math.round((a.aiScore / 100) * 20) : 0;
              return sum + score20;
            }, 0) / totalEssays
          )
        : 0;

    // Simulation stats
    const completedSims = simulations.filter((s) => s.totalTimeSeconds !== null);

    // MCQ stats
    const totalMCQBatches = quizSessions.length;
    const bestScore =
      quizSessions.length > 0
        ? Math.max(
            ...quizSessions.map((s) =>
              s.totalQuestions > 0 ? Math.round((s.correctAnswers / s.totalQuestions) * 100) : 0
            )
          )
        : 0;

    return {
      essayPractice: {
        total: totalEssays,
        avgScore,
      },
      fullSimulations: {
        total: simulations.length,
        completed: completedSims.length,
      },
      mcqBatches: {
        total: totalMCQBatches,
        bestScore,
      },
    };
  }

  // ─── Activity Feed ───────────────────────────────────────────────────────────
  // Paginated list of all activity, filterable by type.
  // type query param: 'all' | 'mcq' | 'essay' | 'simulation'

  async getFeed(
    userId: string,
    type: string = 'all',
    page: number = 1,
    limit: number = 12
  ): Promise<HistoryFeedResponse> {
    const skip = (page - 1) * limit;
    const items: HistoryFeedItem[] = [];

    const includeEssay = type === 'all' || type === 'essay';
    const includeMCQ = type === 'all' || type === 'mcq';
    const includeSimulation = type === 'all' || type === 'simulation';

    // ── Fetch all relevant records in parallel
    const [essayAttempts, quizSessions, simulations] = await Promise.all([
      includeEssay
        ? prisma.essayAttempt.findMany({
            where: { userId },
            select: {
              id: true,
              aiScore: true,
              appPass: true,
              source: true,
              createdAt: true,
              // from old Question model (PRACTICE/SIMULATION source)
              question: {
                select: {
                  subject: true,
                  description: true,
                  year: true,
                  text: true,
                },
              },
              // from new EssayQuestion bank (LESSON_PRACTICE source)
              essayQuestion: {
                select: {
                  subject: true,
                  text: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          })
        : Promise.resolve([]),

      includeMCQ
        ? prisma.quizSession.findMany({
            where: { userId, isCompleted: true },
            select: {
              id: true,
              lessonId: true,
              correctAnswers: true,
              totalQuestions: true,
              quizType: true,
              completedAt: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
          })
        : Promise.resolve([]),

      includeSimulation
        ? prisma.simulation.findMany({
            where: { userId },
            select: {
              id: true,
              subject: true,
              year: true,
              overallScore: true,
              passed: true,
              startedAt: true,
            },
            orderBy: { startedAt: 'desc' },
          })
        : Promise.resolve([]),
    ]);

    // ── Map essays to feed items
    for (const attempt of essayAttempts as any[]) {
      const isLessonPractice = attempt.source === 'LESSON_PRACTICE';
      const eq = attempt.essayQuestion;
      const q = attempt.question;

      const subject = isLessonPractice ? (eq?.subject ?? 'Unknown') : (q?.subject ?? 'Unknown');

      const rawTitle = isLessonPractice ? (eq?.text ?? '') : (q?.description ?? q?.text ?? '');

      // Truncate to first ~60 chars as card title
      const title = rawTitle.length > 60 ? rawTitle.slice(0, 60) + '...' : rawTitle;

      const year = isLessonPractice ? null : (q?.year ?? null);

      const source: HistoryItemSource = isLessonPractice ? 'FROM_LESSON' : 'SIMULATION';
      const score = attempt.aiScore !== null ? Math.round((attempt.aiScore / 100) * 20) : null;

      items.push({
        id: attempt.id,
        type: 'ESSAY',
        source,
        subject,
        title,
        date: attempt.createdAt.toISOString(),
        year,
        score,
        passed: attempt.aiScore !== null ? attempt.aiScore >= 50 : null,
        appPass: attempt.appPass ?? null,
      });
    }

    // ── Map MCQ sessions to feed items
    for (const session of quizSessions as any[]) {
      // QuizSession has lessonId not a lesson relation — subject resolved at query time via join
      const subject = (session as any).lessonSubject ?? 'Unknown';
      const lessonTitle = (session as any).lessonTitle ?? null;
      const title = lessonTitle
        ? lessonTitle
        : session.quizType === 'PRACTICE_TAB'
          ? 'Quick Quiz'
          : 'MCQ Session';

      const accuracy =
        session.totalQuestions > 0
          ? Math.round((session.correctAnswers / session.totalQuestions) * 100)
          : 0;

      const source: HistoryItemSource = session.lessonId ? 'FROM_LESSON' : 'SIMULATION';

      items.push({
        id: session.id,
        type: 'MCQ',
        source,
        subject,
        title,
        date: (session.completedAt ?? session.createdAt).toISOString(),
        year: null,
        score: accuracy,
        passed: null,
        appPass: null,
      });
    }

    // ── Map simulations to feed items
    for (const sim of simulations as any[]) {
      const score = sim.overallScore ?? null;
      items.push({
        id: sim.id,
        type: 'SIMULATION',
        source: 'SIMULATION',
        subject: sim.subject ?? 'Mixed',
        title: sim.subject
          ? `${sim.subject}${sim.year ? ` ${sim.year}` : ''} Simulation`
          : 'Full Simulation',
        date: sim.startedAt.toISOString(),
        year: sim.year ?? null,
        score,
        passed: sim.passed ?? null,
        appPass: score !== null ? score >= 80 : null,
      });
    }

    // ── Sort all items by date desc, then paginate
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedItems = items.slice(skip, skip + limit);

    return {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  // ─── MCQ Session Detail ──────────────────────────────────────────────────────
  // Detail modal for a completed QuizSession — shows each question, answer, explanation.

  async getMCQSessionDetail(userId: string, sessionId: string): Promise<MCQSessionDetailResponse> {
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      throw new AppError('MCQ session not found');
    }

    // QuizSession has no lesson relation — fetch subject via lessonId separately.
    let subject = 'Unknown';
    if (session.lessonId) {
      const lesson = await prisma.lesson.findUnique({
        where: { id: session.lessonId },
        select: { module: { select: { subject: { select: { name: true } } } } },
      });
      subject = lesson?.module?.subject?.name ?? 'Unknown';
    }
    const source: HistoryItemSource = session.lessonId ? 'FROM_LESSON' : 'SIMULATION';

    // QuizSession has no questionAttempts relation — fetch via QuestionAttempt model separately.
    const rawAttempts = (await prisma.questionAttempt.findMany({
      where: { sessionId: session.id },
      include: {
        question: {
          select: {
            id: true,
            text: true,
            options: true,
            correctAnswer: true,
            explanation: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })) as any[];

    const questions = rawAttempts.map((attempt: any, index: number) => {
      const q = attempt.question;
      const options = q?.options as Record<string, string> | null;
      const userAnswerKey = attempt.selectedAnswer ?? null;
      const correctAnswerKey = q?.correctAnswer ?? '';

      return {
        index: index + 1,
        total: rawAttempts.length,
        questionText: q?.text ?? '',
        userAnswer: userAnswerKey,
        userAnswerText: userAnswerKey && options ? (options[userAnswerKey] ?? '') : '',
        correctAnswer: correctAnswerKey,
        correctAnswerText: options ? (options[correctAnswerKey] ?? '') : '',
        isCorrect: attempt.isCorrect,
        explanation: q?.explanation ?? null,
      };
    });

    const accuracy =
      session.totalQuestions > 0
        ? Math.round((session.correctAnswers / session.totalQuestions) * 100)
        : 0;

    return {
      sessionId: session.id,
      subject,
      source,
      attemptedAt: (session.completedAt ?? session.createdAt).toISOString(),
      correctAnswers: session.correctAnswers,
      totalQuestions: session.totalQuestions,
      accuracyPercent: accuracy,
      questions,
    };
  }

  // ─── Essay Attempt Detail ────────────────────────────────────────────────────
  // Full review screen for a single essay attempt — shown from history feed card.

  async getEssayAttemptDetail(
    userId: string,
    attemptId: string
  ): Promise<EssayAttemptDetailResponse> {
    const attempt = await prisma.essayAttempt.findUnique({
      where: { id: attemptId },
      include: {
        question: {
          select: {
            text: true,
            subject: true,
            year: true,
            examType: true,
            description: true,
          },
        },
        essayQuestion: {
          select: {
            text: true,
            subject: true,
          },
        },
      },
    });

    if (!attempt || attempt.userId !== userId) {
      throw new AppError('Essay attempt not found');
    }

    const isLessonPractice = attempt.source === 'LESSON_PRACTICE';
    const eq = (attempt as any).essayQuestion;
    const q = attempt.question;

    const subject = isLessonPractice ? (eq?.subject ?? 'Unknown') : (q?.subject ?? 'Unknown');
    const questionText = isLessonPractice ? (eq?.text ?? '') : (q?.text ?? '');
    const year = isLessonPractice ? null : (q?.year ?? null);
    const examType = isLessonPractice ? null : (q?.examType ?? null);
    const source: HistoryItemSource = isLessonPractice ? 'FROM_LESSON' : 'SIMULATION';

    const aiScore20 = attempt.aiScore !== null ? Math.round((attempt.aiScore / 100) * 20) : 0;

    // Extract overallComment from the feedback JSON if it has that key
    const feedbackObj = attempt.feedback as Record<string, any> | null;
    const overallComment =
      feedbackObj?.overallComment ?? feedbackObj?.overall ?? feedbackObj?.comment ?? null;

    return {
      attemptId: attempt.id,
      subject,
      source,
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

  // ─── Simulation Detail ───────────────────────────────────────────────────────
  // Returns ALL essay attempts under a simulation in one call.
  // Frontend renders an accordion with prev/next navigation from this single response.

  async getSimulationDetail(
    userId: string,
    simulationId: string
  ): Promise<SimulationDetailResponse> {
    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
      include: {
        attempts: {
          include: {
            question: {
              select: {
                id: true,
                text: true,
                subject: true,
                year: true,
                examType: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!simulation || simulation.userId !== userId) {
      throw new AppError('Simulation not found');
    }

    const totalAnswered = simulation.attempts.length;

    const attempts: SimulationEssayItem[] = simulation.attempts.map((attempt, index) => {
      const q = attempt.question;
      const rawScore = attempt.aiScore ?? 0;
      const aiScore20 = Math.round((rawScore / 100) * 20);

      return {
        attemptId: attempt.id,
        index: index + 1,
        total: totalAnswered,
        questionText: q.text,
        subject: q.subject ?? null,
        year: q.year ?? null,
        examType: q.examType ?? null,
        userAnswer: attempt.answerText,
        wordCount: attempt.wordCount,
        timeTakenMinutes: Math.round(attempt.timeTakenSeconds / 60),
        aiScore: aiScore20,
        scoreOutOf: 20,
        band: attempt.band ?? '',
        passed: rawScore >= 50,
        appPass: attempt.appPass ?? false,
        sampleAnswer: attempt.sampleAnswer ?? null,
        feedback: attempt.feedback as object | null,
        strengths: attempt.strengths,
        improvements: attempt.improvements,
      };
    });

    const totalTimeMinutes = simulation.totalTimeSeconds
      ? Math.round(simulation.totalTimeSeconds / 60)
      : null;

    return {
      simulationId: simulation.id,
      subject: simulation.subject ?? null,
      year: simulation.year ?? null,
      startedAt: simulation.startedAt.toISOString(),
      totalTimeMinutes,
      overallScore: simulation.overallScore ?? null,
      passed: simulation.passed ?? null,
      totalAnswered,
      attempts,
    };
  }
}

export default new HistoryService();
