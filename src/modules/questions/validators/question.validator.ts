import z from 'zod';

export const attemptQuestionSchema = z.object({
  body: z.object({
    answer: z.string().min(1),
    timeTaken: z.number().int().min(0),
    sessionId: z.string().min(1, 'Session ID is required')
  }),
});

export const submitEssaySchema = z.object({
  body: z.object({
    answer: z.string().min(50, 'Essay must be at least 50 characters'),
    timeTakenSeconds: z.number().int().min(0).optional(),
  }),
});

