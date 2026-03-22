// src/modules/practise/validators/practise.validators.ts

import z from 'zod';

export const pastQuestionsQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    subject: z.string().optional(),
    sitting: z.string().optional(),   
    examType: z.string().optional(), 
    page: z
      .string()
      .regex(/^\d+$/)
      .optional()
      .transform((val) => (val ? parseInt(val) : 1)),
    limit: z
      .string()
      .regex(/^\d+$/)
      .optional()
      .transform((val) => (val ? parseInt(val) : 9)),
  }),
});

export const startPracticeSchema = z.object({
  body: z.object({
    subject: z.string().min(1, 'Subject is required'),
    year: z.number().int().min(1990).max(2030),
  }),
});

export const getPracticeQuestionSchema = z.object({
  params: z.object({
    sessionId: z.string().min(1, 'Session ID is required'),
    questionIndex: z.string().regex(/^\d+$/, 'Must be a number'),
  }),
});

export const submitPracticeSchema = z.object({
  body: z.object({
    practiceSessionId: z.string(),
    answers: z
      .array(
        z.object({
          questionIndex: z.number().int().min(0).max(7),
          answerText: z.string().min(20, 'Answer is too short'),
        })
      )
      .min(1, 'You must answer at least 1 question')
      .max(5, 'You can only submit up to 5 answers'),  // ← changed from min(5) to max(5)
  }),
});

export const sessionIdParamSchema = z.object({
  params: z.object({
    sessionId: z.string().min(1, 'Session ID is required'),
  }),
});

export const attemptReviewSchema = z.object({
  params: z.object({
    sessionId: z.string().min(1, 'Session ID is required'),
    questionIndex: z.string().regex(/^\d+$/, 'Must be a number'),
  }),
});

// Simulation validators (used by simulation.routes.ts)
export const finishSimulationSchema = z.object({
  params: z.object({
    simulationId: z.string().min(1, 'Simulation ID is required'),
  }),
});

export const failSimulationSchema = z.object({
  params: z.object({
    simulationId: z.string().min(1, 'Simulation ID is required'),
  }),
  body: z.object({
    reason: z.string().min(1, 'Reason is required'),
  }),
});
