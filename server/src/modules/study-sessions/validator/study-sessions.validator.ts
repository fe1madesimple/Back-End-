import { z } from 'zod';

export const startSessionSchema = z.object({
  body: z.object({
    subjectId: z.string().cuid(),
    moduleId: z.string().cuid().optional(),
    sessionType: z.enum(['LESSON', 'PRACTICE', 'REVIEW']),
  }),
});


// src/modules/study-sessions/validator/study-session.validator.ts

export const endSessionSchema = z.object({
  body: z.object({
    lessonsCompleted: z.number().int().min(0).optional(),
    questionsAttempted: z.number().int().min(0).optional(),
    notes: z.string().max(500).optional(),
  }),
});