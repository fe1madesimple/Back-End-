import z from 'zod';

export const podcastsQuerySchema = z.object({
  query: z.object({
    subject: z.string().optional(),
  }),
});