import { z } from 'zod';

export const startSessionSchema = z.object({
  body: z.object({
    subjectId: z.string().cuid(),
    moduleId: z.string().cuid().optional(),
    sessionType: z.enum(['LESSON', 'PRACTICE', 'REVIEW']),
  }),
});
