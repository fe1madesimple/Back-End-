import { z } from 'zod';
import { CaseJurisdiction, CaseFrequency } from '@prisma/client';

export const searchCasesSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    subject: z.string().optional(),
    jurisdiction: z.nativeEnum(CaseJurisdiction).optional(),
    frequency: z.nativeEnum(CaseFrequency).optional(),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 10)),
  }),
});

export const getCaseDetailsSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const getSavedCasesSchema = z.object({
  query: z.object({
    subject: z.string().optional(),
  }),
});

export const saveCaseSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});