export interface TopicChallengeResponse {
  moduleId: string;
  moduleName: string;
  subjectName: string;
  questions: {
    id: string;
    text: string;
    options: string[];
    order: number;
  }[];
  totalAvailable: number;
}

export interface MixedPracticeResponse {
  subjectId: string;
  subjectName: string;
  questions: {
    id: string;
    text: string;
    options: string[];
    order: number;
    moduleName: string;
  }[];
  totalAvailable: number;
  modulesIncluded: number;
}

export interface PastQuestionsQuery {
  search?: string;
  subject?: string;
  year?: number;
  examType?: string;
  page?: number;
  limit?: number;
}

export interface PastQuestionsListResponse {
  questions: Array<{
    id: string;
    text: string;
    year: number;
    subject: string;
    examType: string;
    order: number;
  }>;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: {
    subjects: string[];
    years: number[];
    examTypes: string[];
  };
}

export interface QuickQuizResponse {
  sessionId: string;
  questions: Array<{
    id: string;
    text: string;
    options: any;
    order: number;
  }>;
  totalAvailable: number;
}

export interface PastQuestionDetailResponse {
  id: string;
  text: string;
  year: number;
  subject: string;
  examType: string;
  order: number;
  userAttempts: {
    id: string;
    answer: string;
    aiScore: number | null;
    band: string | null;
    appPass: boolean | null;
    createdAt: Date;
  }[];
}

export interface MixedChallengeResponse {
  sessionId: string;
  questions: Array<{
    id: string;
    text: string;
    options: any;
    order: number;
    subject: string;
    module: string;
  }>;
  totalAvailable: number;
}

export interface MCQAttemptInput {
  answer: string;
  sessionId: string;
  timeTaken?: number;
}

export interface TopicChallengeResponse {
  sessionId: string;
  questions: Array<{
    id: string;
    text: string;
    options: any;
    order: number;
  }>;
  totalAvailable: number;
}