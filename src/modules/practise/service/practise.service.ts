import { prisma } from '@/shared/config';
import { AppError, NotFoundError, BadRequestError } from '@/shared/utils';
import {
  MixedChallengeResponse,
  PastQuestionsQuery,
  SubmitEssayInput,
  SubmitEssayResponse,
  QuizResultsResponse,
  TopicChallengeResponse,
  AttemptDetailsResponse,
  EssayAttemptsListResponse,
  SingleAttemptResponse,
} from '../interface/practise.interface';
import { QuickQuizResponse } from '../interface/practise.interface';
import achievementsService from '@/modules/achievement/service/achievements.service';

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

  async getPastQuestions(query: PastQuestionsQuery): Promise<any> {
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
        parentQuestionId: q.id,
        text: q.text,
        year: q.year!,
        subject: q.subject!,
        examType: q.examType!,
        order: q.order,
        description: q.description || q.text.substring(0, 150) + '...',
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
        averageTime: parentQuestion.questionSets[0]?.averageAttemptSeconds,
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
        averageTime: parentQuestion.questionSets[0]?.averageAttemptSeconds,
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
      totalQuestions: parentQuestion.questionSets.length + 1,
      questionId: firstQuestion.id,
      subject: firstQuestion.subject,
      examType: firstQuestion.examType,
      text: firstQuestion.text,
      averageAttemptTimeSeconds: firstQuestion.averageAttemptSeconds,
      parentQuestionId: parentQuestion.id,
    };
  }

  async startPractice(parentQuestionId: string, userId: string): Promise<any> {
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

    const isTimer = await prisma.questionTimer.findFirst({
      where: {
        userId,
        questionId: parentQuestionId,
        isStarted: true,
        endedAt: null,
      },
    });

    if (isTimer) {
      return {
        timeAgo: Math.floor((Date.now() - isTimer.startedAt.getTime()) / 1000),
        isStarted: true,
      };
    }

    const timer = await prisma.questionTimer.create({
      data: {
        userId,
        questionId: firstQuestion.id,
      },
    });

    return {
      timerId: timer.id,
      currentQuestionIndex: 0,
      totalQuestions: parentQuestion.questionSets.length + 1,
      questionId: firstQuestion.id,
      subject: firstQuestion.subject,
      examType: firstQuestion.examType,
      text: firstQuestion.text,
      year: firstQuestion.year,
      averageAttemptTimeSeconds: firstQuestion.averageAttemptSeconds,
      parentQuestionId: parentQuestion.id,
    };
  }

  async submitEssay(
    userId: string,
    input: SubmitEssayInput & { timerId: string }
  ): Promise<SubmitEssayResponse> {
    const { questionId, answerText, timerId, currentQuestionIndex, parentQuestionId } = input;

    const question = await prisma.questionSet.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new NotFoundError('Question not found');
    }

    // END TIMER
    const timer = await prisma.questionTimer.update({
      where: { id: timerId },
      data: { endedAt: new Date() },
    });

    const timeTakenSeconds = Math.floor(
      (timer.endedAt!.getTime() - timer.startedAt.getTime()) / 1000
    );

    const wordCount = answerText.trim().split(/\s+/).length;

    // Call Claude AI for grading
    const aiResponse = await this.gradeEssayWithClaude(answerText, question.text, question.subject);

    console.log(aiResponse);

    const attempt = await prisma.essayAttempt.create({
      data: {
        userId,
        questionId,
        answerText,
        timeTakenSeconds,
        wordCount,
        aiScore: aiResponse.score,
        band: aiResponse.band,
        feedback: aiResponse.feedback,
        strengths: aiResponse.strengths,
        improvements: aiResponse.improvements,
        provider: 'anthropic',
        model: 'claude-sonnet-4-20250514',
        tokensUsed: aiResponse.tokensUsed,
        isSimulation: false,
      },
    });

    // RECALCULATE WITH NEW TIME
    await this.recalculateAverageTime(questionId, timeTakenSeconds);

    const parentQuestion = await prisma.question.findUnique({
      where: { id: parentQuestionId },
      include: { questionSets: { orderBy: { order: 'asc' } } },
    });

    const totalQuestions = parentQuestion?.questionSets.length || 5;
    const nextQuestionIndex = currentQuestionIndex + 1;
    const hasNextQuestion = nextQuestionIndex < totalQuestions;

    achievementsService
      .checkAllAchievements(userId)
      .catch((err) => console.error('Achievement check failed:', err));

    return {
      attemptId: attempt.id,
      userAnswer: answerText,
      aiScore: aiResponse.score,
      band: aiResponse.band,
      feedback: aiResponse.feedback,
      strengths: aiResponse.strengths,
      improvements: aiResponse.improvements,
      sampleAnswer: aiResponse.sampleAnswer,
      currentQuestionIndex,
      nextQuestionIndex: hasNextQuestion ? nextQuestionIndex : null,
      totalQuestions: 5,
      hasNextQuestion,
    };
  }

  async getNextQuestion(
    parentQuestionId: string,
    currentIndex: number,
    userId: string
  ): Promise<any> {
    const parentQuestion = await prisma.question.findUnique({
      where: { id: parentQuestionId },
      include: {
        questionSets: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!parentQuestion) {
      throw new NotFoundError('Question not found');
    }

    const nextIndex = currentIndex + 1;

    const nextQuestion = parentQuestion.questionSets[nextIndex];

    if (!nextQuestion) {
      throw new NotFoundError('No more questions in this set');
    }

    // CREATE NEW TIMER
    const timer = await prisma.questionTimer.create({
      data: {
        userId,
        questionId: nextQuestion.id,
      },
    });

    return {
      timerId: timer.id,
      currentQuestionIndex: nextIndex,
      totalQuestions: parentQuestion.questionSets.length,
      questionId: nextQuestion.id,
      subject: nextQuestion.subject,
      examType: nextQuestion.examType,
      text: nextQuestion.text,
      year: nextQuestion.year,
      averageAttemptTimeSeconds: parentQuestion.averageAttemptTimeSeconds,
      parentQuestionId: parentQuestionId,
    };
  }

  async getAttemptDetails(
    userId: string,
    questionId: string,
    parentQuestionId: string
  ): Promise<AttemptDetailsResponse> {
    const attempt = await prisma.essayAttempt.findFirst({
      where: {
        userId,
        questionId,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        question: true,
      },
    });

    if (!attempt) {
      throw new NotFoundError('No attempt found for this question');
    }

    const parentQuestion = await prisma.question.findUnique({
      where: { id: parentQuestionId },
      include: {
        questionSets: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!parentQuestion) {
      throw new NotFoundError('Question set not found');
    }

    const currentIndex = parentQuestion.questionSets.findIndex((q) => q.id === questionId);
    const totalQuestions = parentQuestion.questionSets.length;

    let sampleAnswer = '';
    if (attempt.feedback && typeof attempt.feedback === 'object') {
      const feedbackObj = attempt.feedback as any;
      sampleAnswer = feedbackObj.sampleAnswer || 'Sample answer not available';
    }

    return {
      attemptId: attempt.id,
      userAnswer: attempt.answerText,
      aiScore: attempt.aiScore!,
      band: attempt.band!,
      feedback: attempt.feedback,
      strengths: attempt.strengths,
      improvements: attempt.improvements,
      sampleAnswer,
      timeTakenSeconds: attempt.timeTakenSeconds,
      wordCount: attempt.wordCount,
      createdAt: attempt.createdAt,
      currentQuestionIndex: currentIndex,
      totalQuestions,
      subject: parentQuestion.subject!,
      examType: parentQuestion.examType!,
      questionText: attempt.question.text,
      hasNextQuestion: currentIndex < totalQuestions - 1,
      hasPreviousQuestion: currentIndex > 0,
    };
  }

  private async recalculateAverageTime(questionId: string, newTime: number) {
    const attempts = await prisma.essayAttempt.findMany({
      where: { questionId },
      select: { timeTakenSeconds: true },
    });

    let avgTime: number;

    if (attempts.length === 0) {
      // First attempt: average with default 30 mins
      avgTime = Math.round((1800 + newTime) / 2);
    } else {
      // Include new time in calculation
      const total = attempts.reduce((sum, a) => sum + a.timeTakenSeconds, 0) + newTime;
      avgTime = Math.round(total / (attempts.length + 1));
    }

    await prisma.questionSet.update({
      where: { id: questionId },
      data: { averageAttemptSeconds: avgTime },
    });
  }

  private async gradeEssayWithClaude(answerText: string, questionText: string, subject: string) {
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

  async getAllEssayAttempts(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<EssayAttemptsListResponse> {
    const skip = (page - 1) * limit;

    const total = await prisma.essayAttempt.count({
      where: { userId, isSimulation: false },
    });

    const attempts = await prisma.essayAttempt.findMany({
      where: { userId, isSimulation: false },
      include: {
        question: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    return {
      attempts: attempts.map((a) => ({
        id: a.id,
        questionId: a.questionId,
        subject: a.question.subject || 'General',
        examType: a.question.examType || 'Essay',
        year: a.question.year,
        answerText: a.answerText,
        timeTakenSeconds: a.timeTakenSeconds,
        wordCount: a.wordCount,
        aiScore: a.aiScore!,
        band: a.band!,
        feedback: a.feedback,
        strengths: a.strengths,
        improvements: a.improvements,
        createdAt: a.createdAt,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getSingleAttempt(userId: string, attemptId: string): Promise<SingleAttemptResponse> {
    const attempt = await prisma.essayAttempt.findUnique({
      where: { id: attemptId },
      include: {
        question: true,
      },
    });

    if (!attempt) {
      throw new NotFoundError('Attempt not found');
    }

    if (attempt.userId !== userId) {
      throw new BadRequestError('Access denied');
    }

    return {
      id: attempt.id,
      questionId: attempt.questionId,
      answerText: attempt.answerText,
      timeTakenSeconds: attempt.timeTakenSeconds,
      wordCount: attempt.wordCount,
      aiScore: attempt.aiScore!,
      band: attempt.band!,
      feedback: attempt.feedback,
      strengths: attempt.strengths,
      improvements: attempt.improvements,
      tokensUsed: attempt.tokensUsed,
      isSimulation: attempt.isSimulation,
      createdAt: attempt.createdAt,
      question: {
        id: attempt.question.id,
        subject: attempt.question.subject!,
        examType: attempt.question.examType!,
        description: attempt.question.description!,
        text: attempt.question.text,
        year: attempt.question.year!,
      },
    };
  }
}

export default new Practise();
