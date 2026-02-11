import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import { MCQAttemptInput } from '@/modules/practise/interface/practise.interface';

// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY!,
// });

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

  async attemptMCQ(userId: string, questionId: string, input: MCQAttemptInput) {
    const { answer, sessionId, timeTaken } = input;

    const question = await prisma.question.findUnique({
      where: { id: questionId, type: 'MCQ' },
    });

    if (!question) {
      throw new AppError('Question not found');
    }

    const isCorrect = answer.toUpperCase() === question.correctAnswer?.toUpperCase();
    const pointsEarned = isCorrect ? question.points : 0;

    const attempt = await prisma.questionAttempt.create({
      data: {
        userId,
        questionId,
        quizSessionId: sessionId,
        answer,
        isCorrect,
        pointsEarned,
        timeTakenSeconds: timeTaken,
      },
    });

    await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        questionsAnswered: { increment: 1 },
        correctAnswers: isCorrect ? { increment: 1 } : undefined,
        totalTimeSeconds: { increment: timeTaken || 0 },
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

export default new Questions();
