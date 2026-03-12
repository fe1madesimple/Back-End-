// src/modules/practise/service/practise.service.ts

import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError } from '@/shared/utils';
import achievementsService from '@/modules/achievement/service/achievements.service';
import {
  PastQuestionsQuery,
  PastQuestionsResponse,
  StartPracticeInput,
  StartPracticeResponse,
  GetPracticeQuestionResponse,
  SubmitPracticeInput,
  SubmitPracticeResponse,
  PracticeResultsResponse,
  PracticeAttemptReviewResponse,
  ClaudeGradingResult,
} from '../interface/practise.interface';

const PRACTICE_TIME_LIMIT = 10800; // 3 hours in seconds

// ── getPastQuestionsService ──────────────────────────────────

export async function getPastQuestionsService(
  query: PastQuestionsQuery
): Promise<PastQuestionsResponse> {
  const { search, subject, year, page = 1, limit = 9 } = query;
  const skip = (page - 1) * limit;

  const where: any = {
    type: 'ESSAY',
    isPublished: true,
    ...(subject && { subject }),
    ...(year && { year }),
    ...(search && {
      OR: [
        { text: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ],
    }),
  };

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      select: {
        id: true,
        subject: true,
        year: true,
        examType: true,
        description: true,
        text: true,
        order: true,
      },
      orderBy: [{ year: 'desc' }, { subject: 'asc' }, { order: 'asc' }],
      skip,
      take: limit,
    }),
    prisma.question.count({ where }),
  ]);

  const [subjectRows, yearRows] = await Promise.all([
    prisma.question.findMany({
      where: { type: 'ESSAY', isPublished: true },
      select: { subject: true },
      distinct: ['subject'],
      orderBy: { subject: 'asc' },
    }),
    prisma.question.findMany({
      where: { type: 'ESSAY', isPublished: true },
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    }),
  ]);

  return {
    questions: questions.map((q) => ({
      id: q.id,
      subject: q.subject,
      year: q.year,
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
      subjects: subjectRows.map((s) => s.subject).filter(Boolean) as string[],
      years: yearRows.map((y) => y.year).filter(Boolean) as number[],
    },
  };
}

// ── startPracticeService ─────────────────────────────────────
// Body receives subject + year directly (from the card the user clicked)
// Picks 8 random questions from that subject + year
// If an incomplete session already exists → returns it (reload / network recovery)

export async function startPracticeService(
  userId: string,
  input: StartPracticeInput
): Promise<StartPracticeResponse> {
  const { subject, year } = input;

  // 1. Check for existing incomplete session (page reload / network recovery)
  const existingSession = await prisma.practiceSession.findFirst({
    where: { userId, subject, year, isCompleted: false },
    orderBy: { createdAt: 'desc' },
  });

  if (existingSession) {
    const questions = await prisma.question.findMany({
      where: { id: { in: existingSession.questionIds } },
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

    // Preserve original order from questionIds array
    const sortedQuestions = existingSession.questionIds
      .map((id, index) => {
        const q = questions.find((q) => q.id === id);
        if (!q) return null;
        return { ...q, index };
      })
      .filter(Boolean) as any[];

    const existingAttempts = await prisma.essayAttempt.findMany({
      where: { userId, source: 'PRACTICE', simulationId: existingSession.id },
      select: { questionId: true },
    });

    const answeredQuestionIds = existingAttempts.map((a) => a.questionId);

    // Recover timer — anchored to first questionId of session
    const timer = await prisma.questionTimer.findFirst({
      where: { userId, questionId: existingSession.questionIds[0]!, endedAt: null },
    });

    const elapsedSeconds = timer
      ? Math.floor((Date.now() - timer.startedAt.getTime()) / 1000)
      : (existingSession.totalTimeSeconds ?? 0);

    return {
      practiceSessionId: existingSession.id,
      subject,
      year,
      timerId: timer?.id ?? '',
      startedAt: existingSession.startedAt,
      elapsedSeconds,
      totalTimeSeconds: PRACTICE_TIME_LIMIT,
      questions: sortedQuestions,
      totalQuestions: sortedQuestions.length,
      answeredQuestionIds,
      currentQuestionIndex: 0,
    };
  }

  // 2. Pick 8 random questions for this subject + year
  const allAvailable = await prisma.question.findMany({
    where: { type: 'ESSAY', isPublished: true, subject, year },
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

  if (allAvailable.length < 5) {
    throw new BadRequestError('Not enough questions available for this subject and year');
  }

  const shuffled = allAvailable.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(8, allAvailable.length));
  const questionIds = selected.map((q) => q.id);

  // 3. Create practice session
  const session = await prisma.practiceSession.create({
    data: { userId, subject, year, questionIds, startedAt: new Date() },
  });

  // 4. Create timer anchored to first question — tracks total elapsed time
  const timer = await prisma.questionTimer.create({
    data: { userId, questionId: questionIds[0]! },
  });

  const questions = selected.map((q, index) => ({ ...q, index }));

  return {
    practiceSessionId: session.id,
    subject,
    year,
    timerId: timer.id,
    startedAt: session.startedAt,
    elapsedSeconds: 0,
    totalTimeSeconds: PRACTICE_TIME_LIMIT,
    questions,
    totalQuestions: questions.length,
    answeredQuestionIds: [],
    currentQuestionIndex: 0,
  };
}

// ── getPracticeQuestionService ───────────────────────────────
// Called on every box click, next, previous, and page reload
// sessionId + questionIndex is enough to rebuild the full screen

export async function getPracticeQuestionService(
  userId: string,
  sessionId: string,
  questionIndex: number
): Promise<GetPracticeQuestionResponse> {
  const session = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.userId !== userId) throw new NotFoundError('Session not found');

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

  // Get elapsed time from live timer
  const timer = await prisma.questionTimer.findFirst({
    where: { userId, questionId: session.questionIds[0]!, endedAt: null },
  });

  const elapsedSeconds = timer
    ? Math.floor((Date.now() - timer.startedAt.getTime()) / 1000)
    : (session.totalTimeSeconds ?? 0);

  // Get all answered questions for box state
  const attempts = await prisma.essayAttempt.findMany({
    where: { userId, source: 'PRACTICE', simulationId: sessionId },
    select: { questionId: true, answerText: true },
  });

  const answeredQuestionIds = attempts.map((a) => a.questionId);
  const savedAttempt = attempts.find((a) => a.questionId === questionId);

  return {
    practiceSessionId: session.id,
    subject: session.subject,
    year: session.year,
    timerId: timer?.id ?? '',
    elapsedSeconds,
    totalTimeSeconds: PRACTICE_TIME_LIMIT,
    question: { ...question, index: questionIndex },
    totalQuestions: session.questionIds.length,
    currentQuestionIndex: questionIndex,
    answeredQuestionIds,
    savedAnswer: savedAttempt?.answerText ?? null,
  };
}

// ── submitPracticeService ────────────────────────────────────
// Stops timer, grades all answers in parallel with Claude
// Saves one EssayAttempt per answer (source: PRACTICE, simulationId: practiceSessionId)
// Marks PracticeSession complete

export async function submitPracticeService(
  userId: string,
  input: SubmitPracticeInput
): Promise<SubmitPracticeResponse> {
  const { practiceSessionId, timerId, answers } = input;

  if (answers.length < 5) {
    throw new BadRequestError('You must answer at least 5 questions before submitting');
  }

  const session = await prisma.practiceSession.findUnique({
    where: { id: practiceSessionId },
  });

  if (!session || session.userId !== userId) throw new NotFoundError('Session not found');
  if (session.isCompleted) throw new BadRequestError('Session already submitted');

  // Stop the timer
  const timer = await prisma.questionTimer.update({
    where: { id: timerId },
    data: { endedAt: new Date() },
  });

  const totalTimeSeconds = Math.floor(
    (timer.endedAt!.getTime() - timer.startedAt.getTime()) / 1000
  );

  // Fetch full question data for all submitted answers
  const questionIds = answers.map((a) => a.questionId);
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
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

  // Grade all in parallel
  const gradingResults = await Promise.all(
    answers.map((answer) => {
      const question = questions.find((q) => q.id === answer.questionId)!;
      return gradeEssayWithClaude(answer.answerText, question.text, question.subject ?? '');
    })
  );

  // Save EssayAttempt for each answer
  // simulationId = practiceSessionId so history queries can group by session
  const timePerQuestion = Math.floor(totalTimeSeconds / answers.length);

  const savedAttempts = await Promise.all(
    answers.map((answer, index) => {
      const grading = gradingResults[index]!;
      const wordCount = answer.answerText.trim().split(/\s+/).length;

      return prisma.essayAttempt.create({
        data: {
          userId,
          questionId: answer.questionId,
          answerText: answer.answerText,
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
          simulationId: practiceSessionId,
        },
      });
    })
  );

  const overallScore = Math.round(
    gradingResults.reduce((sum, r) => sum + r.score, 0) / gradingResults.length
  );

  const passed = overallScore >= 50;

  // Mark session complete
  await prisma.practiceSession.update({
    where: { id: practiceSessionId },
    data: { isCompleted: true, submittedAt: new Date(), totalTimeSeconds },
  });

  achievementsService
    .checkAllAchievements(userId)
    .catch((err) => console.error('Achievement check failed:', err));

  return {
    practiceSessionId,
    subject: session.subject,
    year: session.year,
    totalAnswered: answers.length,
    totalTimeSeconds,
    overallScore,
    passed,
    results: answers.map((answer, index) => {
      const question = questions.find((q) => q.id === answer.questionId)!;
      const grading = gradingResults[index]!;

      return {
        questionId: answer.questionId,
        questionIndex: session.questionIds.indexOf(answer.questionId),
        subject: question.subject,
        year: question.year,
        examType: question.examType,
        questionText: question.text,
        userAnswer: answer.answerText,
        aiScore: grading.score,
        band: grading.band,
        appPass: grading.score >= 80,
        feedback: grading.feedback,
        strengths: grading.strengths,
        improvements: grading.improvements,
        sampleAnswer: grading.sampleAnswer,
        timeTakenSeconds: savedAttempts[index]!.timeTakenSeconds,
        wordCount: savedAttempts[index]!.wordCount,
      };
    }),
  };
}

// ── getPracticeResultsService ────────────────────────────────
// Scoreboard screen — called after grading completes

export async function getPracticeResultsService(
  userId: string,
  sessionId: string
): Promise<PracticeResultsResponse> {
  const session = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.userId !== userId) throw new NotFoundError('Session not found');

  const attempts = await prisma.essayAttempt.findMany({
    where: { userId, source: 'PRACTICE', simulationId: sessionId },
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

  const overallScore =
    attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + (a.aiScore ?? 0), 0) / attempts.length)
      : 0;

  return {
    practiceSessionId: session.id,
    subject: session.subject,
    year: session.year,
    submittedAt: session.submittedAt,
    totalTimeSeconds: session.totalTimeSeconds,
    overallScore,
    passed: overallScore >= 50,
    totalAnswered: attempts.length,
    results: attempts.map((a, index) => ({
      questionId: a.questionId,
      questionIndex: index,
      subject: a.question.subject,
      year: a.question.year,
      examType: a.question.examType,
      questionText: a.question.text,
      userAnswer: a.answerText,
      aiScore: a.aiScore,
      band: a.band,
      appPass: a.appPass,
      feedback: a.feedback as object,
      strengths: a.strengths,
      improvements: a.improvements,
      sampleAnswer: a.sampleAnswer,
      timeTakenSeconds: a.timeTakenSeconds,
      wordCount: a.wordCount,
    })),
  };
}

// ── getPracticeAttemptReviewService ─────────────────────────
// Review screen — question by question with next/previous navigation

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
    where: { userId, source: 'PRACTICE', simulationId: sessionId },
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

  if (questionIndex < 0 || questionIndex >= attempts.length) {
    throw new BadRequestError('Invalid question index');
  }

  const attempt = attempts[questionIndex]!;

  return {
    practiceSessionId: session.id,
    subject: session.subject,
    year: session.year,
    currentQuestionIndex: questionIndex,
    totalAnswered: attempts.length,
    hasNext: questionIndex < attempts.length - 1,
    hasPrevious: questionIndex > 0,
    question: { ...attempt.question, index: questionIndex },
    userAnswer: attempt.answerText,
    aiScore: attempt.aiScore,
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
// Shared between practice and simulation

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
