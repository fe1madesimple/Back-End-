import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError} from '@/shared/utils';
import {
  MixedPracticeResponse,
  MixedChallengeResponse,
  PastQuestionsListResponse,
    PastQuestionsQuery,
  PastQuestionDetailResponse
} from '../interface/practise.interface';
import { QuickQuizResponse } from '../interface/practise.interface';


class Practise {
  async getQuickQuiz(): Promise<QuickQuizResponse> {
  // Get total question count across all subjects
  const totalCount = await prisma.question.count({
    where: {
      type: 'MCQ',
    },
  });

  if (totalCount === 0) {
    throw new NotFoundError('No questions available');
  }

  // Get 5 random questions (or less if fewer available)
  const limit = Math.min(5, totalCount);

  const randomQuestions = await prisma.$queryRaw<
    Array<{
      id: string;
      text: string;
      options: string;
      order: number;
      subjectName: string;
      moduleName: string;
    }>
  >`
    SELECT 
      q.id, 
      q.text, 
      q.options, 
      q."order",
      s.name as "subjectName",
      m.name as "moduleName"
    FROM questions q
    LEFT JOIN modules m ON q."moduleId" = m.id
    LEFT JOIN subjects s ON m."subjectId" = s.id
    WHERE q.type = 'MCQ'
    ORDER BY RANDOM()
    LIMIT ${limit}
  ` as Array<{
    id: string;
    text: string;
    options: string;
    order: number;
    subjectName: string;
    moduleName: string;
  }>;

  return {
    questions: randomQuestions.map((q) => ({
      id: q.id,
      text: q.text,
      options: JSON.parse(q.options),
      order: q.order,
      subject: q.subjectName,
      module: q.moduleName,
    })),
    totalAvailable: totalCount,
  };
}

  async getMixedChallenge(): Promise<MixedChallengeResponse> {
  // Get total question count across all subjects
  const totalCount = await prisma.question.count({
    where: {
      type: 'MCQ',
    },
  });

  if (totalCount === 0) {
    throw new NotFoundError('No questions available');
  }

  // Get 15 random questions 
  const limit = Math.min(15, totalCount);

  const randomQuestions = await prisma.$queryRaw<
    Array<{
      id: string;
      text: string;
      options: string;
      order: number;
      subjectName: string;
      moduleName: string;
    }>
  >`
    SELECT 
      q.id, 
      q.text, 
      q.options, 
      q."order",
      s.name as "subjectName",
      m.name as "moduleName"
    FROM questions q
    LEFT JOIN modules m ON q."moduleId" = m.id
    LEFT JOIN subjects s ON m."subjectId" = s.id
    WHERE q.type = 'MCQ'
    ORDER BY RANDOM()
    LIMIT ${limit}
  ` as Array<{
    id: string;
    text: string;
    options: string;
    order: number;
    subjectName: string;
    moduleName: string;
  }>;

  return {
    questions: randomQuestions.map((q) => ({
      id: q.id,
      text: q.text,
      options: JSON.parse(q.options as string),
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

  async getPastQuestions(query: PastQuestionsQuery): Promise<PastQuestionsListResponse> {
    const { subject, year, examType, page = 1, limit = 10 } = query;

    // Build filter conditions
    const where: any = {
      type: 'ESSAY',
      isPublished: true,
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
        isPublished: true,
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
      total,
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
}

export default new Practise();
