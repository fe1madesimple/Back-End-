import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import Anthropic, { NotFoundError } from '@anthropic-ai/sdk';

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

  async submitEssay(userId: string, questionId: string, answer: string, timeTaken?: number) {
    const question = await prisma.question.findUnique({
      where: { id: questionId, type: 'ESSAY' },
    });

    if (!question) {
      throw new AppError('Essay question not found');
    }

    // Build Claude prompt
    const systemPrompt = `You are an experienced FE-1 examiner for the Law Society of Ireland, grading exactly as per official examiner reports and regulations from lawsociety.ie.

GRADING CRITERIA (Total 100%):
1. Legal Knowledge & Principles (30%)
2. Use of Authorities (Cases/Statutes) (25%)
3. Application to Question/Facts (25%)
4. Analysis & Critical Evaluation (15%)
5. Structure & Clarity (5%)

SCORE BANDS:
- 80-100%: First Class / Excellent (FE-1 Ready - App Pass)
- 70-79%: Upper Second / Very Good (Strong Real FE-1 Pass)
- 60-69%: Lower Second / Good (Real FE-1 Pass Level)
- 50-59%: Pass in Real FE-1 / Needs Work
- Below 50%: Fail (Not Ready)

Return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "overallScore": 75,
  "breakdown": {
    "knowledge": 24,
    "authorities": 18,
    "application": 20,
    "analysis": 10,
    "structure": 3
  },
  "band": "70-79% Upper Second",
  "appPass": false,
  "feedback": "Your answer demonstrates...",
  "strengths": ["Clear IRAC structure", "Good use of cases"],
  "improvements": ["Add more case law", "Deeper analysis"],
  "nextSteps": "To reach 80%+ app pass..."
}`;

    const userPrompt = `Subject: ${question.subject || 'Law'}
Question: ${question.text}

Student Answer:
${answer}

Grade this answer using FE-1 criteria. Return ONLY the JSON response.`;

    try {
      // Call Claude API
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      // Validate response
      if (!message.content || message.content.length === 0) {
        throw new Error('Empty AI response');
      }

      const contentBlock = message.content[0];

      // Check contentBlock exists before accessing properties
      if (!contentBlock) {
        throw new Error('No content in AI response');
      }

      if (contentBlock.type !== 'text') {
        throw new Error('AI response is not text format');
      }

      const responseText = contentBlock.text;

      // Remove markdown code blocks if present
      const jsonText = responseText
        .replace(/```json\n/g, '')
        .replace(/```\n/g, '')
        .replace(/```/g, '')
        .trim();

      const gradingResult = JSON.parse(jsonText);

      // Validate gradingResult structure
      if (!gradingResult.overallScore || !gradingResult.breakdown || !gradingResult.band) {
        throw new Error('Invalid AI grading format');
      }

      // Save attempt with AI grading
      const attempt = await prisma.questionAttempt.create({
        data: {
          userId,
          questionId,
          answer,
          aiScore: gradingResult.overallScore,
          knowledgeScore: gradingResult.breakdown.knowledge,
          authoritiesScore: gradingResult.breakdown.authorities,
          applicationScore: gradingResult.breakdown.application,
          analysisScore: gradingResult.breakdown.analysis,
          structureScore: gradingResult.breakdown.structure,
          band: gradingResult.band,
          appPass: gradingResult.appPass,
          aiFeedback: gradingResult.feedback,
          strengths: gradingResult.strengths,
          improvements: gradingResult.improvements,
          nextSteps: gradingResult.nextSteps,
          pointsEarned: Math.round(gradingResult.overallScore / 5),
          timeTakenSeconds: timeTaken,
        },
      });

      return {
        attemptId: attempt.id,
        ...gradingResult,
      };
    } catch (error: any) {
      console.error('Claude API error:', error);

      // More specific error messages
      if (error instanceof SyntaxError) {
        throw new Error('AI returned invalid response format. Please try again.');
      }

      if (error.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }

      if (error.status === 401) {
        throw new Error('AI service authentication failed. Please contact support.');
      }

      throw new Error('Failed to grade essay. Please try again.');
    }
  }
}

export default new Questions();