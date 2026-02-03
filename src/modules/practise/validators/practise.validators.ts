import z from 'zod';



export const moduleIdParamSchema = z.object({
  params: z.object({
    moduleId: z.string().cuid(),
  }),
});
