import { prisma } from '@/shared/config';
import { AppError, NotFoundError } from '@/shared/utils';
import { MixedPracticeResponse, TopicChallengeResponse } from '../interface/practise.interface';
import { QuickQuizResponse } from '../interface/practise.interface';

class Practise {
  // src/modules/content/service/content.service.ts

  async getQuickQuiz(moduleId: string): Promise<QuickQuizResponse> {
    // Verify module exists
    const module = await prisma.module.findUnique({
      where: { id: moduleId, isPublished: true },
      include: {
        subject: {
          select: { name: true },
        },
      },
    });

    if (!module) {
      throw new NotFoundError('Module not found');
    }

    // Get total question count
    const totalCount = await prisma.question.count({
      where: {
        moduleId,
        type: 'MCQ',
        isPublished: true,
      },
    });

    if (totalCount === 0) {
      throw new AppError('No questions available for this module');
    }

    // Get 5 random questions (or less if fewer available)
    const limit = Math.min(5, totalCount);

    const randomQuestions = await prisma.$queryRaw<
      Array<{ id: string; text: string; options: string; order: number }>
    >`
  SELECT id, text, options, "order"
  FROM questions
  WHERE "moduleId" = ${moduleId}
    AND type = 'MCQ'
    AND "isPublished" = true
  ORDER BY RANDOM()
  LIMIT ${limit}
`;

    return {
      moduleId: module.id,
      moduleName: module.name,
      subjectName: module.subject.name,
      questions: randomQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        options: JSON.parse(q.options as string),
        order: q.order,
      })),
      totalAvailable: totalCount,
    };
  }

  async getTopicChallenge(moduleId: string): Promise<TopicChallengeResponse> {
    // Verify module exists
    const module = await prisma.module.findUnique({
      where: { id: moduleId, isPublished: true },
      include: {
        subject: {
          select: { name: true },
        },
      },
    });

    if (!module) {
      throw new NotFoundError('Module not found');
    }

    // Get total question count
    const totalCount = await prisma.question.count({
      where: {
        moduleId,
        type: 'MCQ',
        isPublished: true,
      },
    });

    if (totalCount === 0) {
      throw new NotFoundError('No questions available for this module');
    }

    // Get 10 random questions (or less if fewer available)
    const limit = Math.min(10, totalCount);

    const randomQuestions = await prisma.$queryRaw<
      Array<{ id: string; text: string; options: string; order: number }>
    >`
    SELECT id, text, options, "order"
    FROM questions
    WHERE "moduleId" = ${moduleId}
      AND type = 'MCQ'
      AND "isPublished" = true
    ORDER BY RANDOM()
    LIMIT ${limit}
  `;

    return {
      moduleId: module.id,
      moduleName: module.name,
      subjectName: module.subject.name,
      questions: randomQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        options: JSON.parse(q.options as string),
        order: q.order,
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
    const limit = Math.min(15, totalCount);

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
}


export default new Practise();