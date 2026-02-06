import { z } from 'zod';

export const createPlaylistSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Playlist name is required').max(100, 'Name too long'),
    description: z.string().max(500, 'Description too long').optional(),
  }),
});
