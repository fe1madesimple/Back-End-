import z from "zod";


export const attemptQuestionSchema = z.object({
  body: z.object({
    answer: z.string().min(1),
    timeTakenSeconds: z.number().int().min(0).optional(),
  }),
});
