import { prisma } from '@/shared/config';
import { AppError, NotFoundError, BadRequestError } from '@/shared/utils';
import {
  MixedChallengeResponse,
  PastQuestionsListResponse,
  PastQuestionsQuery,
  StartPracticeResponse,
  QuizResultsResponse,
  TopicChallengeResponse,
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
        questionsAnswered: true,
      },
    });

    const completedSessions = allSessions.filter((s) => s.questionsAnswered === s.totalQuestions);

    if (completedSessions.length === 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          averageQuizScore: 0,
          highestQuizScore: 0,
          lowestQuizScore: 0,
        },
      });
      return;
    }

    const totalCorrect = completedSessions.reduce((sum, s) => sum + s.correctAnswers, 0);
    const totalQuestions = completedSessions.reduce((sum, s) => sum + s.totalQuestions, 0);
    const averageScore = Math.round((totalCorrect / totalQuestions) * 100);

    const scores = completedSessions.map((s) =>
      Math.round((s.correctAnswers / s.totalQuestions) * 100)
    );
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

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
      options: string;
      order: number;
      subjectName: string;
      moduleName: string;
    }>;

    return {
      sessionId: session.id,
      questions: randomQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
        order: q.order,
        subject: q.subjectName,
        module: q.moduleName,
      })),
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
      options: string;
      order: number;
      subjectName: string;
      moduleName: string;
    }>;

    return {
      sessionId: session.id,
      questions: randomQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
        order: q.order,
        subject: q.subjectName,
        module: q.moduleName,
      })),
      totalAvailable: totalCount,
    };
  }

  async getPastQuestions(query: PastQuestionsQuery): Promise<PastQuestionsListResponse> {
    const { search, subject, year, examType, page = 1, limit = 9 } = query;

    const where: any = {
      type: 'ESSAY',
      year: { not: null },
    };

    if (subject) where.subject = subject;
    if (year) where.year = year;
    if (examType) where.examType = examType;

    if (search) {
      where.OR = [
        { text: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const total = await prisma.question.count({ where });
    const skip = (page - 1) * limit;

    const questions = await prisma.question.findMany({
      where,
      select: {
        id: true,
        description: true,
        text: true,
        year: true,
        subject: true,
        examType: true,
        order: true,
        averageAttemptTimeSeconds: true,
        questionSets: {
          select: { id: true },
        },
      },
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
      skip,
      take: limit,
    });

    const allPastQuestions = await prisma.question.findMany({
      where: { type: 'ESSAY', year: { not: null } },
      select: { subject: true, year: true, examType: true },
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
        description: q.description || q.text.substring(0, 150) + '...',
        averageAttemptTimeSeconds: q.averageAttemptTimeSeconds,
        questionCount: q.questionSets.length + 1,
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
  async getPastQuestionDetail(userId: string, questionId: string): Promise<any> {
    const parentQuestion = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        questionSets: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!parentQuestion) {
      throw new NotFoundError('Question not found');
    }

    const previousAttempts = await prisma.essayAttempt.findMany({
      where: {
        userId,
        questionId: { in: [questionId, ...parentQuestion.questionSets.map((q) => q.id)] },
      },
      select: {
        id: true,
        questionId: true,
        aiScore: true,
        band: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const questions = [
      {
        id: parentQuestion.id,
        type: parentQuestion.type,
        subject: parentQuestion.subject!,
        year: parentQuestion.year!,
        examType: parentQuestion.examType!,
        description: parentQuestion.description || '',
        text: parentQuestion.text,
        order: parentQuestion.order,
        averageTime: 1800,
      },
      ...parentQuestion.questionSets.map((q) => ({
        id: q.id,
        type: q.type,
        subject: q.subject,
        year: q.year,
        examType: q.examType,
        description: q.description,
        text: q.text,
        order: q.order,
        averageTime: 1800,
      })),
    ];

    return {
      parentId: parentQuestion.id,
      questions,
      userPreviousAttempts: previousAttempts.map((a) => ({
        id: a.id,
        questionId: a.questionId,
        aiScore: a.aiScore!,
        band: a.band!,
        createdAt: a.createdAt,
      })),
    };
  }

  async getTopicChallenge(userId: string, subjectId: string): Promise<TopicChallengeResponse> {
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
        module: {
          select: {
            name: true,
            subject: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
      take: 10,
    });

    return {
      sessionId: session.id,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
        order: q.order,
        subject: q.module?.subject.name || 'Unknown Subject',
        module: q.module?.name || 'Unknown Module',
      })),
      totalAvailable: questions.length,
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

    console.log('🔍 SESSION DEBUG:', {
      sessionId: session.id,
      totalTimeSeconds: session.totalTimeSeconds,
      questionsAnswered: session.questionsAnswered,
      attempts: session.attempts,
    });

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
    const percentage = answered > 0 ? Math.round((correct / total) * 100) : 0;

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

    const avgTimerPerQuestion =
      session.questionsAnswered > 0
        ? Math.round(session.totalTimeSeconds / session.questionsAnswered)
        : 0;

    let quizStreak = 0;

    if (answered === total) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

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
            questionsAnswered: session.totalQuestions,
            completedAt: { gte: dayStart, lte: dayEnd },
          },
        });

        if (hasActivity > 0) {
          quizStreak++;
        } else {
          break;
        }
      }
    }

    await this.updateUserQuizStats(userId);

    return {
      score: { correct, total, answered, percentage },
      message,
      badge,
      performance: {
        accuracyRate: percentage,
        avgTimerPerQuestion,
        quizStreak,
      },
    };
  }

  async initiateStartPractice(parentQuestionId: string): Promise<any> {
    const parentQuestion = await prisma.question.findUnique({
      where: { id: parentQuestionId },
      include: {
        questionSets: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!parentQuestion || parentQuestion.questionSets.length === 0) {
      throw new NotFoundError('Question set not found');
    }

    const firstQuestion = parentQuestion.questionSets[0]!;

    return {
      currentQuestionIndex: 0,
      totalQuestions: parentQuestion.questionSets.length,
      questionId: firstQuestion.id,
      subject: firstQuestion.subject,
      examType: firstQuestion.examType,
      text: firstQuestion.text,
      averageAttemptTimeSeconds: parentQuestion.averageAttemptTimeSeconds,
    };
  }

  async startPractice(parentQuestionId: string, userId: string): Promise<StartPracticeResponse> {
    const parentQuestion = await prisma.question.findUnique({
      where: { id: parentQuestionId },
      include: {
        questionSets: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!parentQuestion || parentQuestion.questionSets.length === 0) {
      throw new NotFoundError('Question set not found');
    }

    const firstQuestion = parentQuestion.questionSets[0]!;

    const timer = await prisma.questionTimer.create({
      data: {
        userId,
        questionId: firstQuestion.id,
      },
    });

    return {
      timerId: timer.id,
      currentQuestionIndex: 0,
      totalQuestions: parentQuestion.questionSets.length,
      questionId: firstQuestion.id,
      subject: firstQuestion.subject,
      examType: firstQuestion.examType,
      text: firstQuestion.text,
      averageAttemptTimeSeconds: parentQuestion.averageAttemptTimeSeconds,
    };
  }
}

export default new Practise();
