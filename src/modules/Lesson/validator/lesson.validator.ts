import { z } from 'zod';

export const trackVideoSchema = z.object({
  body: z.object({
    currentTime: z.number().min(0).int(),
  }),
});

export const trackTimeSchema = z.object({
  body: z.object({
    seconds: z.number().min(0).int(),
  }),
});