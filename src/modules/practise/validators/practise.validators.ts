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