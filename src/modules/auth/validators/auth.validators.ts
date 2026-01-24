import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    fullName: z.string().min(2, 'First name must be at least 2 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    email: z
      .string({ message: 'Email is required' })
      .min(1, 'Email is required')
      .email('Please provide a valid email address'),

    code: z
      .string({ message: 'Verification code is required' })
      .min(1, 'Verification code is required')
      .length(4, 'Verification code must be 4 digits')
      .refine((val) => /^\d{4}$/.test(val), {
        message: 'Verification code must contain only digits',
      }),
  }),
});

export const verifyResetCodeSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),
    code: z
      .string()
      .length(4, 'Code must be exactly 4 digits')
      .regex(/^\d{4}$/, 'Code must be numeric'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
  }),
});