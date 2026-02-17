import z from 'zod';

export const moduleIdParamSchema = z.object({
  params: z.object({
    moduleId: z.string().cuid(),
  }),
});

export const pastQuestionsQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    subject: z.string().optional(),
    year: z
      .string()
      .regex(/^\d{4}$/)
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined)),
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

export const submitSimulationAnswerSchema = z.object({
  body: z.object({
    simulationId: z.string().min(1, 'Simulation ID is required'),
    questionId: z.string().min(1, 'Question ID is required'),
    answerText: z.string().min(50, 'Answer must be at least 50 characters'),
    timerId: z.string().min(1, 'Timer ID is required'),
    currentQuestionIndex: z.number().int().min(0).max(4),
  }),
});

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