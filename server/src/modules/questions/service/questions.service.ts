

import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import { MCQAttemptInput } from '../interface/question.interface';
import achievementsService from '@/modules/achievement/service/achievements.service';

class QuestionsService {
  async getModuleQuestions(moduleId: string) {
    // FIX: Question.moduleId no longer exists — filter via lesson relation instead
    const questions = await prisma.question.findMany({
      where: {
        lesson: { moduleId },
        type: 'MCQ',
        isPublished: true,
      },
      orderBy: [
        { lesson: { order: 'asc' } }, // lesson order within the module
        { order: 'asc' },             // question order within the lesson
      ],
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

    achievementsService
      .checkAllAchievements(userId)
      .catch((err) => console.error('Achievement check failed:', err));

    return {
      attemptId: attempt.id,
      isCorrect,
      pointsEarned,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    };
  }
}

export default new QuestionsService();