import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError } from '@/shared/utils';
import {
  MixedPracticeResponse,
  MixedChallengeResponse,
  PastQuestionsListResponse,
  PastQuestionsQuery,
  PastQuestionDetailResponse,
  QuizResultsResponse,
} from '../interface/practise.interface';
import { QuickQuizResponse } from '../interface/practise.interface';

class Practise {
  async getQuickQuiz(userId: string): Promise<QuickQuizResponse> {
    const session = await prisma.quizSession.create({
      data: {
        userId,
        quizType: 'QUICK_QUIZ',
        totalQuestions: 5,
      },
    });

    const totalCount = await prisma.question.count({
      where: { type: 'MCQ', isPublished: true },
    });

    const limit = Math.min(5, totalCount);

    const randomQuestions = (await prisma.$queryRaw`
    SELECT id, text, options, "order"
    FROM questions
    WHERE type = 'MCQ' AND "isPublished" = true
    ORDER BY RANDOM()
    LIMIT ${limit}
  `) as Array<{
      id: string;
      text: string;
      options: any;
      order: number;
    }>;

    return {
      sessionId: session.id,
      questions: randomQuestions,
      totalAvailable: totalCount,
    };
  }

  async getMixedChallenge(userId: string): Promise<MixedChallengeResponse> {
    const session = await prisma.quizSession.create({
      data: {
        userId,
        quizType: 'MIXED_CHALLENGE',
        totalQuestions: 15,
      },
    });

    const totalCount = await prisma.question.count({
      where: { type: 'MCQ', isPublished: true },
    });

    const limit = Math.min(15, totalCount);

    const randomQuestions = (await prisma.$queryRaw`
    SELECT q.id, q.text, q.options, q."order",
           s.name as "subjectName", m.name as "moduleName"
    FROM questions q
    LEFT JOIN modules m ON q."moduleId" = m.id
    LEFT JOIN subjects s ON m."subjectId" = s.id
    WHERE q.type = 'MCQ' AND q."isPublished" = true
    ORDER BY RANDOM()
    LIMIT ${limit}
  `) as Array<{
      id: string;
      text: string;
      options: any;
      order: number;
      subjectName: string;
      moduleName: string;
    }>;

    return {
      sessionId: session.id,
      questions: randomQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options,
        order: q.order,
        subject: q.subjectName,
        module: q.moduleName,
      })),
      totalAvailable: totalCount,
    };
  }

  async getMixedPractice(subjectId: string): Promise<MixedPracticeResponse> {
    // Verify subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId, isPublished: true },
    });

    if (!subject) {
      throw new NotFoundError('Subject not found');
    }

    // Get total question count across all modules in subject
    const totalCount = await prisma.question.count({
      where: {
        module: {
          subjectId,
          isPublished: true,
        },
        type: 'MCQ',
        isPublished: true,
      },
    });

    if (totalCount === 0) {
      throw new NotFoundError('No questions available for this subject');
    }

    // Get 15 random questions from all modules (or less if fewer available)
    const limit = Math.min(10, totalCount);

    const randomQuestions = await prisma.$queryRaw<
      Array<{
        id: string;
        text: string;
        options: string;
        order: number;
        moduleName: string;
      }>
    >`
  SELECT q.id, q.text, q.options, q."order", m.name as "moduleName"
  FROM questions q
  INNER JOIN modules m ON q."moduleId" = m.id
  WHERE m."subjectId" = ${subjectId}
    AND q.type = 'MCQ'
    AND q."isPublished" = true
    AND m."isPublished" = true
  ORDER BY RANDOM()
  LIMIT ${limit}
`;

    // Count how many unique modules are represented
    const uniqueModules = new Set(randomQuestions.map((q) => q.moduleName)).size;

    return {
      subjectId: subject.id,
      subjectName: subject.name,
      questions: randomQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        options: JSON.parse(q.options as string),
        order: q.order,
        moduleName: q.moduleName,
      })),
      totalAvailable: totalCount,
      modulesIncluded: uniqueModules,
    };
  }

  async getTopicChallenge(userId: string, subjectId: string) {
    const session = await prisma.quizSession.create({
      data: {
        userId,
        quizType: 'TOPIC_CHALLENGE',
        totalQuestions: 10,
      },
    });

    const questions = await prisma.question.findMany({
      where: {
        type: 'MCQ',
        isPublished: true,
        module: {
          subjectId,
        },
      },
      select: {
        id: true,
        text: true,
        options: true,
        order: true,
      },
      orderBy: { order: 'asc' },
      take: 10,
    });

    return {
      sessionId: session.id,
      questions,
      totalAvailable: questions.length,
    };
  }

  async getPastQuestions(query: PastQuestionsQuery): Promise<PastQuestionsListResponse> {
    const { search, subject, year, examType, page = 1, limit = 9 } = query;

    // Build filter conditions
    const where: any = {
      type: 'ESSAY',
      year: { not: null }, // Only past questions have year
    };

    if (subject) {
      where.subject = subject;
    }

    if (year) {
      where.year = year;
    }

    if (examType) {
      where.examType = examType;
    }

    if (search) {
      where.OR = [
        {
          text: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          subject: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Get total count
    const total = await prisma.question.count({ where });

    // Get paginated questions
    const skip = (page - 1) * limit;
    const questions = await prisma.question.findMany({
      where,
      select: {
        id: true,
        text: true,
        year: true,
        subject: true,
        examType: true,
        order: true,
      },
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
      skip,
      take: limit,
    });

    // Get unique filter values for frontend dropdowns
    const allPastQuestions = await prisma.question.findMany({
      where: {
        type: 'ESSAY',
        year: { not: null },
      },
      select: {
        subject: true,
        year: true,
        examType: true,
      },
    });

    const subjects = [...new Set(allPastQuestions.map((q) => q.subject).filter(Boolean))];
    const years = [...new Set(allPastQuestions.map((q) => q.year).filter(Boolean))].sort(
      (a, b) => b! - a!
    );
    const examTypes = [...new Set(allPastQuestions.map((q) => q.examType).filter(Boolean))];

    return {
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        year: q.year!,
        subject: q.subject!,
        examType: q.examType!,
        order: q.order,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        subjects: subjects as string[],
        years: years as number[],
        examTypes: examTypes as string[],
      },
    };
  }

  async getPastQuestionById(
    questionId: string,
    userId: string
  ): Promise<PastQuestionDetailResponse> {
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
        type: 'ESSAY',
        isPublished: true,
      },
      include: {
        attempts: {
          where: { userId },
          select: {
            id: true,
            answer: true,
            aiScore: true,
            band: true,
            appPass: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!question) {
      throw new NotFoundError('Past question not found');
    }

    if (!question.year) {
      throw new BadRequestError('This is not a past question');
    }

    return {
      id: question.id,
      text: question.text,
      year: question.year,
      subject: question.subject!,
      examType: question.examType!,
      order: question.order,
      userAttempts: question.attempts.map((attempt) => ({
        id: attempt.id,
        answer: attempt.answer,
        aiScore: attempt.aiScore,
        band: attempt.band,
        appPass: attempt.appPass,
        createdAt: attempt.createdAt,
      })),
    };
  }

  async getQuizResults(userId: string, attemptIds: string[]): Promise<QuizResultsResponse> {
    const attempts = await prisma.questionAttempt.findMany({
      where: {
        id: { in: attemptIds },
        userId,
      },
      select: {
        isCorrect: true,
        timeTakenSeconds: true,
        createdAt: true,
      },
    });

    const total = attempts.length;
    const correct = attempts.filter((a) => a.isCorrect).length; // ← FIXED
    const percentage = Math.round((correct / total) * 100);

    let message = '';
    if (percentage <= 20) {
      message = 'Every expert was once a beginner!';
    } else if (percentage <= 40) {
      message = "Don't worry - practice makes perfect!";
    } else if (percentage <= 60) {
      message = 'Good effort!';
    } else if (percentage < 100) {
      message = 'Congratulation!';
    } else {
      message = 'Congratulation!';
    }

    let badge = null;
    if (percentage === 100) {
      badge = {
        unlocked: true,
        title: 'Perfect Score!',
        description: 'You answered all questions correctly. Keep this momentum going!',
      };
    }

    const avgTimePerQuestion =
      attempts.length > 0
        ? Math.round(
            attempts.reduce((sum, a) => sum + (a.timeTakenSeconds || 0), 0) / attempts.length
          )
        : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const last7DaysAttempts = await prisma.questionAttempt.findMany({
      where: {
        userId,
        createdAt: { gte: sevenDaysAgo },
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const dailyActivity = new Map<string, boolean>();
    last7DaysAttempts.forEach((attempt) => {
      const dateKey = attempt.createdAt.toISOString().split('T')[0];
      if (dateKey) {
        dailyActivity.set(dateKey, true);
      }
    });

    let quizStreak = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      if (dateKey && dailyActivity.has(dateKey)) {
        quizStreak++;
      } else {
        break;
      }
    }

    return {
      score: {
        correct,
        total,
        percentage,
      },
      message,
      badge,
      performance: {
        accuracyRate: percentage,
        avgTimePerQuestion,
        quizStreak,
      },
      actions: {
        tryAgain: true,
        nextQuiz: true,
      },
    };
  }
}

export default new Practise();
