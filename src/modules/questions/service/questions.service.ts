import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

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

  async attemptMCQ(userId: string, questionId: string, answer: string, timeTaken?: number) {
    const question = await prisma.question.findUnique({
      where: { id: questionId, type: 'MCQ' },
    });

    if (!question) {
      throw new AppError('Question not found');
    }

    // Check if correct
    const isCorrect = answer.toUpperCase() === question.correctAnswer?.toUpperCase();
    const pointsEarned = isCorrect ? question.points : 0;

    // Save attempt
    const attempt = await prisma.questionAttempt.create({
      data: {
        userId,
        questionId,
        answer,
        isCorrect,
        pointsEarned,
        timeTakenSeconds: timeTaken,
      },
    });

    return {
      attemptId: attempt.id,
      isCorrect,
      pointsEarned,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    };
  }
}

export default new Questions()