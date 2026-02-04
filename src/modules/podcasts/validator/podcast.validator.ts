import z from 'zod';

export const podcastsQuerySchema = z.object({
  query: z.object({
    subject: z.string().optional(),
  }),
});


export const trackPodcastSchema = z.object({
  body: z.object({
    currentTime: z.number().min(0).int(),
    audioDuration: z.number().int().optional(),
  }),
});