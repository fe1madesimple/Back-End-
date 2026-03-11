import { CaseJurisdiction } from '@prisma/client';

export interface CaseSearchQuery {
  search?: string;
  subject?: string;
  jurisdiction?: CaseJurisdiction;
  year?: number;
  caseName?: string;
  citation?: string;
  frequency?: 'High' | 'Low';
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
  isFrequentlyTested: boolean;
  frequencyLabel: 'High Frequency' | 'Rare';
  subjects: string[];
  topics: string[];
  fullSummary: string | null;
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

export interface CaseDetailResponse {
  id: string;
  caseName: string;
  citation: string;
  year: number;
  court: string;
  jurisdiction: CaseJurisdiction;
  jurisdictionDisplay: string;
  isFrequentlyTested: boolean;
  frequencyLabel: 'High Frequency' | 'Rare';
  examRelevance: 'High' | 'Rare';
  subjects: string[];
  topics: string[];
  fullSummary: string | null;
  legalPrinciple: string | null;
  keyQuote: string | null;
  appearsInPapers: string[];
  isSaved: boolean;
  savedAt: Date | null;
}

export interface CaseFiltersResponse {
  years: number[];
  caseNames: string[];
  jurisdictions: { value: CaseJurisdiction; label: string }[];
  citations: string[];
  frequency: { value: string; label: string }[];
}

export interface SavedCaseCardResponse {
  id: string;
  caseName: string;
  citation: string;
  year: number;
  court: string;
  jurisdiction: CaseJurisdiction;
  isFrequentlyTested: boolean;
  frequencyLabel: 'High Frequency' | 'Rare';
  subjects: string[];
  topics: string[];
  fullSummary: string | null;
  savedAt: Date;
  lastReviewedAt: Date | null;
  isReviewed: boolean;
}

export interface SavedCasesListResponse {
  cases: SavedCaseCardResponse[];
  total: number;
}

export interface SaveCaseResponse {
  message: string;
  isSaved: boolean;
}

export interface ToggleReviewResponse {
  isReviewed: boolean;
  lastReviewedAt: Date | null;
}
