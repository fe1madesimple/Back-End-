// src/modules/practise/service/practise.service.ts

import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError, AppError } from '@/shared/utils';
import achievementsService from '@/modules/achievement/service/achievements.service';
import {
  PastQuestionsQuery,
  PastQuestionsResponse,
  StartPracticeInput,
  StartPracticeResponse,
  SubmitPracticeInput,
  SubmitPracticeResponse,
  PracticeResultsResponse,
  PracticeAttemptReviewResponse,
  ClaudeGradingResult,
  QuestionScoreItem,
} from '../interface/practise.interface';
import { QuestionType, Prisma } from '@prisma/client';

// ── getPastQuestionsService ──────────────────────────────────

export async function getPastQuestionsService(
  query: PastQuestionsQuery
): Promise<PastQuestionsResponse> {
  const { search, subject, sitting, examType, page = 1, limit = 9 } = query;

  const monthOrder: Record<string, number> = {
    March: 0,
    April: 1,
    August: 2,
    October: 3,
    November: 4,
  };

  const where: Prisma.QuestionWhereInput = {
    type: QuestionType.ESSAY,
    isPublished: true,
    lessonId: null,
    year: { not: null },
    ...(subject && { subject }),
    ...(sitting && { sitting }),
    ...(examType && { examType }),
    ...(search && {
      OR: [
        { text: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ],
    }),
  };

  const baseWhere: Prisma.QuestionWhereInput = {
    type: QuestionType.ESSAY,
    isPublished: true,
    lessonId: null,
    year: { not: null },
  };

  const [allQuestions, subjectRows, sittingRows] = await Promise.all([
    prisma.question.findMany({
      where,
      select: {
        id: true,
        subject: true,
        year: true,
        sitting: true,
        examType: true,
        description: true,
        text: true,
        order: true,
      },
    }),
    prisma.question.findMany({
      where: baseWhere,
      select: { subject: true },
      distinct: ['subject'],
      orderBy: { subject: 'asc' },
    }),
    prisma.question.findMany({
      where: baseWhere,
      select: { sitting: true, year: true },
      distinct: ['sitting'],
    }),
  ]);

  // Sort: year desc → month order → subject alpha → question order
  const sorted = allQuestions.sort((a, b) => {
    if ((b.year ?? 0) !== (a.year ?? 0)) return (b.year ?? 0) - (a.year ?? 0);
    const aMonth = (a.sitting ?? '').split(' ')[0] ?? '';
    const bMonth = (b.sitting ?? '').split(' ')[0] ?? '';
    const monthDiff = (monthOrder[aMonth] ?? 99) - (monthOrder[bMonth] ?? 99);
    if (monthDiff !== 0) return monthDiff;
    const subjectDiff = (a.subject ?? '').localeCompare(b.subject ?? '');
    if (subjectDiff !== 0) return subjectDiff;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  // Keep only Q1 (first question) per sitting+subject combination
  const seen = new Set<string>();
  const deduped = sorted.filter((q) => {
    const key = `${q.sitting}::${q.subject}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const total = deduped.length;
  const skip = (page - 1) * limit;
  const questions = deduped.slice(skip, skip + limit);

  const sortedSittings = sittingRows
    .map((r) => ({ sitting: r.sitting, year: r.year }))
    .filter((r): r is { sitting: string; year: number } => r.sitting !== null && r.year !== null)
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      const aMonth = a.sitting.split(' ')[0] ?? '';
      const bMonth = b.sitting.split(' ')[0] ?? '';
      return (monthOrder[aMonth] ?? 99) - (monthOrder[bMonth] ?? 99);
    })
    .map((r) => r.sitting);

  return {
    questions: questions.map((q) => ({
      id: q.id,
      subject: q.subject,
      year: q.year,
      sitting: q.sitting,
      examType: q.examType,
      description: q.description,
      text: q.text,
      order: q.order,
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    filters: {
      subjects: subjectRows.map((s) => s.subject).filter((s): s is string => s !== null),
      sittings: sortedSittings,
    },
  };
}

// ── startPracticeService ─────────────────────────────────────
// Creates session, picks 8 random questions from subject+year.
// Returns only sessionId — frontend drives all navigation from here.
// Recovery: if incomplete session exists for same user+subject+year → returns it.

export async function startPracticeService(
  userId: string,
  input: StartPracticeInput
): Promise<StartPracticeResponse> {
  const { subject, year, sitting } = input;

  const yearInt = typeof year === 'string' ? parseInt(year as any, 10) : year;
  if (isNaN(yearInt)) throw new BadRequestError('Invalid year provided');

  // Recovery: return existing incomplete session for same subject+sitting
  const existingSession = await prisma.practiceSession.findFirst({
    where: {
      userId,
      subject: { equals: subject, mode: 'insensitive' },
      year: yearInt,
      sitting,  // ← ADD
      isCompleted: false,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (existingSession) {
    return {
      practiceSessionId: existingSession.id,
      subject: existingSession.subject!,
      year: existingSession.year!,
      sitting: existingSession.sitting!,  
      totalQuestions: existingSession.questionIds.length,
      startedAt: existingSession.startedAt,
    };
  }

  // Pick up to 8 questions for this subject+sitting only
  const allAvailable = await prisma.question.findMany({
    where: {
      type: 'ESSAY',
      isPublished: true,
      subject: { equals: subject, mode: 'insensitive' },
      year: yearInt,
      sitting,  
    },
    select: { id: true },
  });

  if (allAvailable.length < 5) {
    throw new BadRequestError('Not enough questions available for this subject and sitting');
  }

  const shuffled = allAvailable.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(8, allAvailable.length));
  const questionIds = selected.map((q) => q.id);

  const session = await prisma.practiceSession.create({
    data: {
      userId,
      subject,
      year: yearInt,
      sitting,   
      questionIds,
      startedAt: new Date(),
    },
  });

  return {
    practiceSessionId: session.id,
    subject,
    year: yearInt,
    sitting, 
    totalQuestions: questionIds.length,
    startedAt: session.startedAt,
  };
}

export async function getEssayQuestionsService(filters: {
  subject?: string;
  year?: number | string;
}) {
  const { subject, year } = filters;

  const where: any = {
    type: 'ESSAY',
    isPublished: true,
  };

  if (subject) {
    where.subject = { equals: subject, mode: 'insensitive' };
  }

  if (year !== undefined && year !== null && year !== '') {
    const yearInt = typeof year === 'string' ? parseInt(year as string, 10) : year;
    if (!isNaN(yearInt)) where.year = yearInt;
  }

  const questions = await prisma.question.findMany({
    where,
    select: {
      id: true,
      text: true,
      subject: true,
      year: true,
      examType: true,
      description: true,
    },
    orderBy: [{ subject: 'asc' }, { year: 'desc' }],
  });

  // Also return distinct subjects and years for frontend filter dropdowns
  const allQuestions = await prisma.question.findMany({
    where: { type: 'ESSAY', isPublished: true },
    select: { subject: true, year: true },
  });

  const subjects = [
    ...new Set(allQuestions.map((q) => q.subject).filter(Boolean)),
  ].sort() as string[];

  const years = [...new Set(allQuestions.map((q) => q.year).filter(Boolean))].sort(
    (a, b) => (b as number) - (a as number)
  ) as number[];

  return {
    total: questions.length,
    filters: { subjects, years },
    questions,
  };
}

// ── getPracticeQuestionService ───────────────────────────────
// The single endpoint for ALL navigation: initial load, box click,
// next, previous, and page reload.
// sessionId + questionIndex is enough to fully rebuild the screen.
// elapsedSeconds = now - session.startedAt (no timer model needed).

export async function getPracticeQuestionService(
  userId: string,
  sessionId: string,
  questionIndex: number
): Promise<any> {
  const session = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.userId !== userId) throw new NotFoundError('Session not found');
  if (session.isCompleted) throw new BadRequestError('This session has already been submitted');

  if (questionIndex < 0 || questionIndex >= session.questionIds.length) {
    throw new BadRequestError('Invalid question index');
  }

  const questionId = session.questionIds[questionIndex]!;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: {
      id: true,
      subject: true,
      year: true,
      examType: true,
      text: true,
      description: true,
      order: true,
    },
  });

  if (!question) throw new NotFoundError('Question not found');

  return {
    practiceSessionId: session.id,
    subject: session.subject,
    year: session.year,
    question: { ...question, index: questionIndex },
    totalQuestions: session.questionIds.length,
    currentQuestionIndex: questionIndex,
  };
}
// ── submitPracticeService ────────────────────────────────────
// No timerId — totalTimeSeconds = now - session.startedAt.
// Frontend sends: { practiceSessionId, answers: [{ questionIndex, answerText }] }.
// Backend resolves questionId = session.questionIds[questionIndex].
// Grades all in parallel, saves EssayAttempt per answer.
// Returns scoreboard data: only attempted questions, sorted by questionIndex.

export async function submitPracticeService(
  userId: string,
  input: SubmitPracticeInput
): Promise<SubmitPracticeResponse> {
  const { practiceSessionId, answers } = input;

  // ── Validation: 1–5 answers only ─────────────────────────────────────────
  if (answers.length === 0) {
    throw new BadRequestError('You must answer at least 1 question before submitting');
  }

  if (answers.length > 5) {
    const excess = answers.length - 5;
    throw new BadRequestError(
      `You have answered too many questions. Please remove ${excess} answer${excess > 1 ? 's' : ''} before submitting`
    );
  }

  const session = await prisma.practiceSession.findUnique({
    where: { id: practiceSessionId },
  });

  if (!session || session.userId !== userId) throw new NotFoundError('Session not found');
  if (session.isCompleted) throw new BadRequestError('Session already submitted');

  // Validate all indexes are within bounds
  for (const answer of answers) {
    if (answer.questionIndex < 0 || answer.questionIndex >= session.questionIds.length) {
      throw new BadRequestError(`Invalid question index: ${answer.questionIndex}`);
    }
  }

  // Check for duplicate indexes — each question can only be answered once
  const indexes = answers.map((a) => a.questionIndex);
  const uniqueIndexes = new Set(indexes);
  if (uniqueIndexes.size !== indexes.length) {
    throw new BadRequestError(
      'Duplicate question indexes found — each question can only be answered once'
    );
  }

  // Session IS the timer
  const totalTimeSeconds = Math.floor((Date.now() - session.startedAt.getTime()) / 1000);

  // Resolve questionIds from indexes
  const resolvedAnswers = answers.map((a) => ({
    questionIndex: a.questionIndex,
    questionId: session.questionIds[a.questionIndex]!,
    answerText: a.answerText,
  }));

  // Fetch question texts for grading
  const questionIds = resolvedAnswers.map((a) => a.questionId);
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    select: { id: true, subject: true, year: true, examType: true, text: true },
  });

  // Grade all in parallel
  const gradingResults = await Promise.all(
    resolvedAnswers.map((a) => {
      const question = questions.find((q) => q.id === a.questionId)!;
      return gradeEssayWithClaude(a.answerText, question.text, question.subject ?? '');
    })
  );

  const timePerQuestion = Math.floor(totalTimeSeconds / answers.length);

  // Save one EssayAttempt per answer
  // practiceSessionId groups attempts under this session for history
  // simulationId is null — it only accepts Simulation table IDs
  await Promise.all(
    resolvedAnswers.map((a, index) => {
      const grading = gradingResults[index]!;
      const wordCount = a.answerText.trim().split(/\s+/).length;

      return prisma.essayAttempt.create({
        data: {
          userId,
          questionId: a.questionId,
          answerText: a.answerText,
          timeTakenSeconds: timePerQuestion,
          wordCount,
          aiScore: grading.score,
          band: grading.band,
          appPass: grading.score >= 80,
          feedback: grading.feedback,
          strengths: grading.strengths,
          improvements: grading.improvements,
          sampleAnswer: grading.sampleAnswer,
          provider: 'anthropic',
          model: 'claude-sonnet-4-20250514',
          tokensUsed: grading.tokensUsed,
          source: 'PRACTICE',
          simulationId: null, // ← always null, wrong table
          practiceSessionId: practiceSessionId, // ← correct field (requires migration)
        } as any,
      });
    })
  );

  // Overall score — average of all graded answers
  const overallScore = Math.round(
    gradingResults.reduce((sum, r) => sum + r.score, 0) / gradingResults.length
  );

  const submittedAt = new Date();

  await prisma.practiceSession.update({
    where: { id: practiceSessionId },
    data: { isCompleted: true, submittedAt, totalTimeSeconds },
  });

  achievementsService
    .checkAllAchievements(userId)
    .catch((err) => console.error('Achievement check failed:', err));

  // Scores — only answered questions, sorted by box position
  const scores: QuestionScoreItem[] = resolvedAnswers
    .map((a, index) => {
      const grading = gradingResults[index]!;
      return {
        questionIndex: a.questionIndex,
        aiScore: Math.round((grading.score / 100) * 20),
        scoreOutOf: 20,
        band: grading.band,
        appPass: grading.score >= 80,
      };
    })
    .sort((a, b) => a.questionIndex - b.questionIndex);

  return {
    practiceSessionId,
    subject: session.subject,
    year: session.year,
    submittedAt,
    totalAnswered: answers.length,
    totalTimeSeconds,
    overallScore,
    passed: overallScore >= 50,
    scores,
  };
}

// ── getPracticeResultsService ────────────────────────────────
// Scoreboard fetch for back-navigation or direct link.
// Only returns attempted questions sorted by session box order.

export async function getPracticeResultsService(
  userId: string,
  sessionId: string
): Promise<PracticeResultsResponse> {
  const session = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.userId !== userId) throw new NotFoundError('Session not found');

  const attempts = await prisma.essayAttempt.findMany({
    where: { userId, source: 'PRACTICE', practiceSessionId: sessionId }, // ← fixed
    select: { questionId: true, aiScore: true, band: true, appPass: true },
    orderBy: { createdAt: 'asc' },
  });

  const overallScore =
    attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + (a.aiScore ?? 0), 0) / attempts.length)
      : 0;

  const scores: QuestionScoreItem[] = attempts
    .map((a) => ({
      questionIndex: session.questionIds.indexOf(a.questionId ?? ''),
      aiScore: Math.round(((a.aiScore ?? 0) / 100) * 20),
      scoreOutOf: 20,
      band: a.band ?? '',
      appPass: a.appPass ?? false,
    }))
    .sort((a, b) => a.questionIndex - b.questionIndex);

  return {
    practiceSessionId: session.id,
    subject: session.subject,
    year: session.year,
    submittedAt: session.submittedAt,
    totalTimeSeconds: session.totalTimeSeconds,
    overallScore,
    passed: overallScore >= 50,
    totalAnswered: attempts.length,
    scores,
  };
}

// ── getPracticeAttemptReviewService ─────────────────────────
// Review screen — one attempted question at a time.
// questionIndex here is the position within attempted questions only (0, 1, 2...).
// hasNext/hasPrevious drives the navigation arrows.

export async function getPracticeAttemptReviewService(
  userId: string,
  sessionId: string,
  questionIndex: number
): Promise<PracticeAttemptReviewResponse> {
  const session = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.userId !== userId) throw new NotFoundError('Session not found');

  const attempts = await prisma.essayAttempt.findMany({
    where: { userId, source: 'PRACTICE', practiceSessionId: sessionId }, // ← fixed
    include: {
      question: {
        select: {
          id: true,
          subject: true,
          year: true,
          examType: true,
          text: true,
          description: true,
          order: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  const sortedAttempts = attempts.sort(
    (a, b) =>
      session.questionIds.indexOf(a.questionId ?? '') -
      session.questionIds.indexOf(b.questionId ?? '')
  );

  if (questionIndex < 0 || questionIndex >= sortedAttempts.length) {
    throw new BadRequestError('Invalid question index');
  }

  const attempt = sortedAttempts[questionIndex]!;
  const sessionBoxIndex = session.questionIds.indexOf(attempt.questionId ?? '');

  return {
    practiceSessionId: session.id,
    subject: session.subject,
    year: session.year,
    currentQuestionIndex: questionIndex,
    totalAnswered: sortedAttempts.length,
    hasNext: questionIndex < sortedAttempts.length - 1,
    hasPrevious: questionIndex > 0,
    question: { ...attempt.question!, index: sessionBoxIndex },
    userAnswer: attempt.answerText,
    aiScore: attempt.aiScore !== null ? Math.round((attempt.aiScore / 100) * 20) : null,
    scoreOutOf: 20,
    band: attempt.band,
    appPass: attempt.appPass,
    feedback: attempt.feedback as object | null,
    strengths: attempt.strengths,
    improvements: attempt.improvements,
    sampleAnswer: attempt.sampleAnswer,
    timeTakenSeconds: attempt.timeTakenSeconds,
    wordCount: attempt.wordCount,
  };
}

// ── gradeEssayWithClaude ─────────────────────────────────────
// Shared between practice and simulation.

export async function gradeEssayWithClaude(
  answerText: string,
  questionText: string,
  subject: string
): Promise<ClaudeGradingResult> {
  const GRADING_PROMPT = `You are an experienced FE-1 examiner for the Law Society of Ireland, grading exactly as per official examiner reports from lawsociety.ie for ${subject}.

QUESTION:
${questionText}

STUDENT ANSWER:
${answerText}

Grade this answer according to FE-1 standards:
- Real FE-1 pass mark = 50%
- App standard (excellence threshold) = 80%
- Assess: Legal knowledge (30%), Case law usage (25%), Application (25%), Analysis (15%), Structure (5%)

Return ONLY valid JSON with this exact structure:
{
  "score": 75,
  "band": "Upper Second / Very Good",
  "feedback": {
    "knowledgeScore": 25,
    "authoritiesScore": 20,
    "applicationScore": 22,
    "analysisScore": 12,
    "structureScore": 5,
    "overallComments": "Detailed feedback here..."
  },
  "strengths": ["Point 1", "Point 2", "Point 3"],
  "improvements": ["Point 1", "Point 2", "Point 3"],
  "sampleAnswer": "A comprehensive model answer showing proper IRAC structure..."
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: GRADING_PROMPT }],
    }),
  });

  const data = (await response.json()) as any;
  const content = data.content[0].text;
  const cleaned = content.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);

  return {
    score: parsed.score,
    band: parsed.band,
    feedback: parsed.feedback,
    strengths: parsed.strengths,
    improvements: parsed.improvements,
    sampleAnswer: parsed.sampleAnswer,
    tokensUsed: data.usage.input_tokens + data.usage.output_tokens,
  };
}

export async function failSimulationService(userId: string, simulationId: string, reason: string) {
  const simulation = await prisma.simulation.findUnique({
    where: { id: simulationId },
    select: { id: true, userId: true, startedAt: true, endedAt: true },
  });

  if (!simulation || simulation.userId !== userId) {
    throw new AppError('Simulation not found');
  }

  // Already ended — idempotent, just return current state
  if (simulation.endedAt) {
    return { simulationId, alreadyEnded: true };
  }

  const now = new Date();
  const totalTimeSeconds = Math.floor(
    (now.getTime() - new Date(simulation.startedAt).getTime()) / 1000
  );

  await prisma.simulation.update({
    where: { id: simulationId },
    data: {
      passed: false,
      failReason: reason,
      endedAt: now,
      totalTimeSeconds,
    },
  });

  return { simulationId, failed: true, reason, totalTimeSeconds };
}
