// src/modules/practise/practise.interface.ts

export interface PastQuestionsQuery {
  search?: string;
  subject?: string;
  year?: number;
  page?: number;
  limit?: number;
}

export interface PastQuestionCard {
  id: string;
  subject: string | null;
  year: number | null;
  examType: string | null;
  description: string | null;
  text: string;
  order: number;
}

export interface PastQuestionsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PastQuestionsFilters {
  subjects: string[];
  years: number[];
}

export interface PastQuestionsResponse {
  questions: PastQuestionCard[];
  pagination: PastQuestionsPagination;
  filters: PastQuestionsFilters;
}
