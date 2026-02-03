import { prisma } from '@/shared/config';
import { AppError, NotFoundError } from '@/shared/utils';
import { string, number } from 'zod';
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
}
