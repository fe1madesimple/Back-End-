import { z } from 'zod';
import { CaseJurisdiction } from '@prisma/client';

export const searchCasesSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    subject: z.string().optional(),
    jurisdiction: z
      .string()
      .optional()
      .transform((val) => (val ? (val.toUpperCase() as CaseJurisdiction) : undefined)),
    year: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined)),
    caseName: z.string().optional(),
    citation: z.string().optional(),
    frequency: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
      }),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 20)),
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

export const toggleReviewSchema = z.object({
  params: z.object({
    caseId: z.string().cuid(),
  }),
});
