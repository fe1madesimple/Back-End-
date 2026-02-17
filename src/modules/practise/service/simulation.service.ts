import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError } from '@/shared/utils';
import {
  FailSimulationResponse,
  StartSimulationResponse,
  SubmitSimulationAnswerInput,
  SubmitSimulationAnswerResponse,
  FinishSimulationResponse,
} from '../interface/practise.interface';

class SimulationService {
  async startSimulation(userId: string): Promise<any> {
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

    const shuffled = allQuestionSets.sort(() => Math.random() - 0.5);
    const selectedSets = shuffled.slice(0, 5);

    const selectedQuestions = selectedSets.map((set, index) => ({
      questionId: set.questionSets[0]!.id,
      questionIndex: index,
      subject: set.questionSets[0]!.subject,
      examType: set.questionSets[0]!.examType,
      text: set.questionSets[0]!.text,
    }));

    const questionIds = selectedQuestions.map((q) => q.questionId);

    // Create simulation record
    const simulation = await prisma.simulation.create({
      data: {
        userId,
        startedAt: new Date(),
        questionIds,
      },
    });

    // Get first question
    const firstQuestion = selectedQuestions[0]!;

    // Create timer for first question
    const timer = await prisma.questionTimer.create({
      data: {
        userId,
        questionId: firstQuestion.questionId,
      },
    });

    const nextQuestionId = questionIds[1] ?? null;

    return {
      simulationId: simulation.id,
      startedAt: simulation.startedAt,
      totalTimeSeconds: 10800,
      currentQuestionIndex: 0,
      totalQuestions: questionIds.length,
      questionId: firstQuestion.questionId,
      subject: firstQuestion.subject,
      examType: firstQuestion.examType,
      text: firstQuestion.text,
      userAnswer: null,
      isSubmitted: false,
      canEdit: true,
      nextQuestionId,
      isLastQuestion: questionIds.length === 1,
      timerId: timer.id,
    };
  }

  async submitSimulationAnswer(
    userId: string,
    input: SubmitSimulationAnswerInput & { timerId: string }
  ): Promise<SubmitSimulationAnswerResponse> {
    const { simulationId, questionId, answerText, timerId, currentQuestionIndex } = input;

    const timer = await prisma.questionTimer.update({
      where: { id: timerId },
      data: { endedAt: new Date() },
    });

    const timeTakenSeconds = Math.floor(
      (timer.endedAt!.getTime() - timer.startedAt.getTime()) / 1000
    );

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
  ): Promise<any> {
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

    const attempt = await prisma.essayAttempt.findFirst({
      where: {
        userId,
        questionId,
        simulationId,
      },
    });

    // Derive next question from saved questionIds
    const questionIds: string[] = simulation.questionIds;
    const nextIndex = questionIndex + 1;
    const isLastQuestion = nextIndex >= questionIds.length;
    const nextQuestionId = isLastQuestion ? null : (questionIds[nextIndex] ?? null);

    return {
      currentQuestionIndex: questionIndex,
      totalQuestions: questionIds.length,
      questionId: question.id,
      subject: question.subject,
      examType: question.examType,
      text: question.text,
      userAnswer: attempt?.answerText || null,
      isSubmitted: !!attempt,
      timeTakenSeconds: attempt?.timeTakenSeconds || null,
      canEdit: !attempt,
      nextQuestionId,
      isLastQuestion,
      simulationId: simulation.id,
    };
  }

  async finishSimulation(userId: string, simulationId: string): Promise<FinishSimulationResponse> {
    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
      include: {
        attempts: {
          include: {
            question: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!simulation || simulation.userId !== userId) {
      throw new NotFoundError('Simulation not found');
    }

    if (simulation.endedAt) {
      throw new BadRequestError('Simulation already completed');
    }

    if (simulation.attempts.length !== 5) {
      throw new BadRequestError('All 5 questions must be submitted before finishing');
    }

    // Grade all 5 essays in parallel
    const gradingPromises = simulation.attempts.map((attempt) =>
      this.gradeEssayWithClaude(
        attempt.answerText,
        attempt.question.text,
        attempt.question.subject!
      )
    );

    const gradingResults = await Promise.all(gradingPromises);

    // Update each attempt with AI grading
    await Promise.all(
      simulation.attempts.map((attempt, index) =>
        prisma.essayAttempt.update({
          where: { id: attempt.id },
          data: {
            aiScore: gradingResults[index]!.score,
            band: gradingResults[index]!.band,
            feedback: gradingResults[index]!.feedback,
            strengths: gradingResults[index]!.strengths,
            improvements: gradingResults[index]!.improvements,
            provider: 'anthropic',
            model: 'claude-sonnet-4-20250514',
            tokensUsed: gradingResults[index]!.tokensUsed,
          },
        })
      )
    );

    // Calculate overall score
    const overallScore = Math.round(
      gradingResults.reduce((sum, r) => sum + r.score, 0) / gradingResults.length
    );

    const totalTimeSeconds = simulation.attempts.reduce((sum, a) => sum + a.timeTakenSeconds, 0);
    const averageTimePerQuestion = Math.round(totalTimeSeconds / 5);

    const passed = overallScore >= 50;

    // Update simulation
    await prisma.simulation.update({
      where: { id: simulationId },
      data: {
        endedAt: new Date(),
        totalTimeSeconds,
        overallScore,
        passed,
      },
    });

    return {
      simulationId,
      overallScore,
      passed,
      passThreshold: 50,
      appPassThreshold: 80,
      totalTimeSeconds,
      averageTimePerQuestion,
      results: simulation.attempts.map((attempt, index) => ({
        questionId: attempt.questionId,
        questionIndex: index,
        subject: attempt.question.subject,
        userAnswer: attempt.answerText,
        timeTakenSeconds: attempt.timeTakenSeconds,
        aiScore: gradingResults[index]!.score,
        band: gradingResults[index]!.band,
        feedback: gradingResults[index]!.feedback,
        strengths: gradingResults[index]!.strengths,
        improvements: gradingResults[index]!.improvements,
        sampleAnswer: gradingResults[index]!.sampleAnswer,
      })),
    };
  }

  async failSimulation(
    userId: string,
    simulationId: string,
    reason: string
  ): Promise<FailSimulationResponse> {
    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
    });

    if (!simulation || simulation.userId !== userId) {
      throw new NotFoundError('Simulation not found');
    }

    if (simulation.endedAt) {
      throw new BadRequestError('Simulation already completed');
    }

    // Mark as failed
    await prisma.simulation.update({
      where: { id: simulationId },
      data: {
        endedAt: new Date(),
        passed: false,
        overallScore: 0,
      },
    });

    return {
      failed: true,
      reason,
      message: 'Your simulation has been automatically failed due to leaving the exam window.',
    };
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
}

export default new SimulationService();
