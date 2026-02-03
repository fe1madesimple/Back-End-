import z from 'zod';

export const moduleIdParamSchema = z.object({
  params: z.object({
    moduleId: z.string().cuid(),
  }),
});

// src/modules/content/validator/content.validator.ts

export const pastQuestionsQuerySchema = z.object({
  query: z.object({
    subject: z.string().optional(),
    year: z
      .string()
      .regex(/^\d{4}$/)
      .optional(),
    examType: z.string().optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});
