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
      totalTimeSeconds: 10800, // 3 hours
      questions: selectedQuestions,
    };
  }
}


export default new SimulationService()