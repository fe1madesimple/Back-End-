import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    profileColor: z
      .string()
      .regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color')
      .optional(),
    targetExamDate: z.string().datetime().optional(),
    dailyStudyGoal: z.number().min(1).max(24).optional(),
    focusSubjects: z.array(z.string()).optional(),
  }),
});

export const updatePreferencesSchema = z.object({
  body: z.object({
    emailReminders: z.boolean().optional(),
    studyStreakAlerts: z.boolean().optional(),
    podcastRecommendations: z.boolean().optional(),
    showRelevantEpisodes: z.boolean().optional(),
  }),
});