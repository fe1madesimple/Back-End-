import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).optional(),
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

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain uppercase')
      .regex(/[a-z]/, 'Must contain lowercase')
      .regex(/[0-9]/, 'Must contain number'),
  }),
});

export const deleteAccountSchema = z.object({
  body: z.object({
    password: z.string().min(1, 'Password is required'),
    confirmation: z.string().refine((val) => val === 'DELETE', {
      message: 'Must type DELETE to confirm'
    }),
  }),
});

export const completeOnboardingSchema = z.object({
  body: z.object({
    focusSubjects: z
      .array(z.string())
      .min(1, 'Please select at least one subject')
      .max(8, 'You can select up to 8 subjects'),
    targetExamDate: z
      .string()
      .datetime()
      .optional()
      .refine(
        (date) => !date || new Date(date) > new Date(),
        'Target exam date must be in the future'
      ),
    dailyStudyGoal: z
      .number()
      .int()
      .min(1, 'Daily study goal must be at least 1 hour')
      .max(24, 'Daily study goal cannot exceed 24 hours')
      .optional(),
  }),
});