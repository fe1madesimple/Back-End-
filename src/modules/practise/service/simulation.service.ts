import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError } from '@/shared/utils';
import {
  FailSimulationResponse,
  StartSimulationResponse,
  SubmitSimulationAnswerInput,
  SubmitSimulationAnswerResponse,
  FinishSimulationResponse,
  GetSimulationQuestionResponse,
} from '../interface/practise.interface';

class SimulationService {
  async startSimulation(userId: string): Promise<StartSimulationResponse> {
    // Get all question sets (parents with 5 children each)
    const allQuestionSets = await prisma.question.findMany({
      where: {
        type: 'ESSAY',
        year: { not: null },
      },
      include: {
        questionSets: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (allQuestionSets.length < 5) {
      throw new BadRequestError('Not enough questions available for simulation');
    }

    // Randomly select 5 question sets
    const shuffled = allQuestionSets.sort(() => Math.random() - 0.5);
    const selectedSets = shuffled.slice(0, 5);

    // Pick first question from each set (which is parent copy)
    const selectedQuestions = selectedSets.map((set, index) => ({
      questionId: set.questionSets[0]!.id,
      questionIndex: index,
      subject: set.questionSets[0]!.subject,
      examType: set.questionSets[0]!.examType,
      text: set.questionSets[0]!.text,
    }));

    // Create simulation record
    const simulation = await prisma.simulation.create({
      data: {
        userId,
        startedAt: new Date(),
      },
    });

    return {
      simulationId: simulation.id,
      startedAt: simulation.startedAt,
      totalTimeSeconds: 10800,
      questions: selectedQuestions,
    };
  }

  async submitSimulationAnswer(
    userId: string,
    input: SubmitSimulationAnswerInput
  ): Promise<SubmitSimulationAnswerResponse> {
    const { simulationId, questionId, answerText, timeTakenSeconds, currentQuestionIndex } = input;

    // Verify simulation exists and belongs to user
    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
    });

    if (!simulation) {
      throw new NotFoundError('Simulation not found');
    }

    if (simulation.userId !== userId) {
      throw new BadRequestError('Access denied');
    }

    if (simulation.endedAt) {
      throw new BadRequestError('Simulation already completed');
    }

    // Check if already submitted
    const existingAttempt = await prisma.essayAttempt.findFirst({
      where: {
        userId,
        questionId,
        simulationId,
      },
    });

    if (existingAttempt) {
      throw new BadRequestError('Question already submitted');
    }

    const wordCount = answerText.trim().split(/\s+/).length;

    // Save attempt WITHOUT AI grading
    const attempt = await prisma.essayAttempt.create({
      data: {
        userId,
        questionId,
        answerText,
        timeTakenSeconds,
        wordCount,
        isSimulation: true,
        simulationId,
      },
    });

    // Get all attempts for this simulation to check progress
    const allAttempts = await prisma.essayAttempt.findMany({
      where: { simulationId },
    });

    const hasNextQuestion = allAttempts.length < 5;
    const nextQuestionIndex = hasNextQuestion ? currentQuestionIndex + 1 : null;

    // Get next question if available
    let nextQuestion = null;
    if (hasNextQuestion && nextQuestionIndex !== null) {
      // Frontend should track question order and pass next questionId
      // For now, return structure for next question
      nextQuestion = {
        questionId: '', // Frontend provides this
        questionIndex: nextQuestionIndex,
        subject: '',
        examType: '',
        text: '',
      };
    }

    return {
      attemptId: attempt.id,
      saved: true,
      timeTakenSeconds,
      currentQuestionIndex,
      nextQuestionIndex,
      hasNextQuestion,
      nextQuestion,
    };
  }

  async getSimulationQuestion(
    userId: string,
    simulationId: string,
    questionId: string,
    questionIndex: number
  ): Promise<GetSimulationQuestionResponse> {
    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
    });

    if (!simulation || simulation.userId !== userId) {
      throw new NotFoundError('Simulation not found');
    }

    const question = await prisma.questionSet.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new NotFoundError('Question not found');
    }

    // Check if user has submitted this question
    const attempt = await prisma.essayAttempt.findFirst({
      where: {
        userId,
        questionId,
        simulationId,
      },
    });

    return {
      currentQuestionIndex: questionIndex,
      totalQuestions: 5,
      questionId: question.id,
      subject: question.subject,
      examType: question.examType,
      text: question.text,
      userAnswer: attempt?.answerText || null,
      isSubmitted: !!attempt,
      timeTakenSeconds: attempt?.timeTakenSeconds || null,
      canEdit: !attempt, 
    };
  }
}

export default new SimulationService();
