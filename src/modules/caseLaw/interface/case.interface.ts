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

export interface RelatedCaseResponse {
  id: string;
  caseName: string;
  citation: string;
  facts: string;
  relationshipType: string | null;
}

export interface CaseDetailResponse {
  id: string;
  caseName: string;
  citation: string;
  year: number;
  court: string;
  jurisdiction: string;
  frequency: string;
  subjects: string[];
  topics: string[];

  // Tab 1: Summary
  facts: string;

  // Tab 2: Principle & Application
  issue: string;
  ruling: string;
  reasoning: string;
  significance: string;
  principleAndApplication: string | null;
  examTip: string | null;

  // Tab 3: Exam Relevance
  examRelevance: string | null;
  appearsInPapers: string[];

  // Tab 4: Related Cases
  relatedCases: RelatedCaseResponse[];

  isSaved: boolean;
}

