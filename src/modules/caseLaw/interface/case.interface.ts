import { CaseJurisdiction, CaseFrequency } from '@prisma/client';

export interface CaseSearchQuery {
  search?: string;
  subject?: string;
  jurisdiction?: CaseJurisdiction;
  frequency?: CaseFrequency;
  page?: number;
  limit?: number;
}

export interface CaseCardResponse {
  id: string;
  caseName: string;
  citation: string;
  year: number;
  court: string;
  jurisdiction: CaseJurisdiction;
  frequency: CaseFrequency;
  subjects: string[];
  topics: string[];
  facts: string;
  isSaved: boolean;
}

export interface CaseSearchResponse {
  cases: CaseCardResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
