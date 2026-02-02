import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';

class Questions {
  async getModuleQuestions(moduleId: string) {
    const questions = await prisma.question.findMany({
      where: {
        moduleId,
        type: 'MCQ',
        isPublished: true,
      },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        text: true,
        options: true,
        points: true,
        order: true,
      },
    });

    return questions;
  }
}



export default new Questions()