import { prisma } from '@/shared/config';
import { AppError, NotFoundError, BadRequestError } from '@/shared/utils';
import {
  MixedPracticeResponse,
  MixedChallengeResponse,
  PastQuestionsListResponse,
  PastQuestionsQuery,
  PastQuestionDetailResponse,
} from '../interface/practise.interface';
import { QuickQuizResponse } from '../interface/practise.interface';

class Practise {
  private async updateUserQuizStats(userId: string) {
    const allSessions = await prisma.quizSession.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      select: {
        correctAnswers: true,
        totalQuestions: true,
      },
    });

    const scores = allSessions.map((s) => Math.round((s.correctAnswers / s.totalQuestions) * 100));

    const averageScore =
      scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0;
    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

    await prisma.user.update({
      where: { id: userId },
      data: {
        averageQuizScore: averageScore,
        highestQuizScore: highestScore,
        lowestQuizScore: lowestScore,
      },
    });
  }
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



  async getQuizResults(userId: string, sessionId: string): Promise<QuizResultsResponse> {
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId, userId },
      include: {
        attempts: {
          select: {
            isCorrect: true,
            timeTakenSeconds: true,
          },
        },
      },
    });

    if (!session) {
      throw new AppError('Quiz session not found');
    }

    await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    const total = session.totalQuestions;
    const answered = session.questionsAnswered;
    const correct = session.correctAnswers;
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
    if (percentage === 100 && answered === total) {
      badge = {
        unlocked: true,
        title: 'Perfect Score!',
        description: 'You answered all questions correctly. Keep this momentum going!',
      };
    }

    const avgTimePerQuestion =
      session.attempts.length > 0
        ? Math.round(session.totalTimeSeconds / session.attempts.length)
        : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let quizStreak = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const hasActivity = await prisma.quizSession.count({
        where: {
          userId,
          isCompleted: true,
          completedAt: { gte: dayStart, lte: dayEnd },
        },
      });

      if (hasActivity > 0) {
        quizStreak++;
      } else {
        break;
      }
    }

    await this.updateUserQuizStats(userId, percentage);

    return {
      score: {
        correct,
        total,
        answered,
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
