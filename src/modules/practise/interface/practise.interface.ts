// src/modules/practise/interface/practise.interface.ts

// ── Past Questions ───────────────────────────────────────────

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

// ── Practice Session ─────────────────────────────────────────

export interface StartPracticeInput {
  subject: string;
  year: number;
}

export interface PracticeQuestionItem {
  id: string;
  subject: string | null;
  year: number | null;
  examType: string | null;
  text: string;
  description: string | null;
  order: number;
  index: number; // 0–7
}

export interface StartPracticeResponse {
  practiceSessionId: string;
  subject: string;
  year: number;
  timerId: string;
  startedAt: Date;
  elapsedSeconds: number;
  totalTimeSeconds: number; // enforced limit = 10800
  questions: PracticeQuestionItem[];
  totalQuestions: number;
  answeredQuestionIds: string[];
  currentQuestionIndex: number;
}

export interface GetPracticeQuestionResponse {
  practiceSessionId: string;
  subject: string | null;
  year: number | null;
  timerId: string;
  elapsedSeconds: number;
  totalTimeSeconds: number;
  question: PracticeQuestionItem;
  totalQuestions: number;
  currentQuestionIndex: number;
  answeredQuestionIds: string[];
  savedAnswer: string | null;
}

// ── Submit ───────────────────────────────────────────────────

export interface SubmitAnswerItem {
  questionId: string;
  answerText: string;
}

export interface SubmitPracticeInput {
  practiceSessionId: string;
  timerId: string;
  answers: SubmitAnswerItem[];
}

export interface GradingResult {
  questionId: string;
  questionIndex: number;
  subject: string | null;
  year: number | null;
  examType: string | null;
  questionText: string;
  userAnswer: string;
  aiScore: number;
  band: string;
  appPass: boolean;
  feedback: object;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string;
  timeTakenSeconds: number;
  wordCount: number;
}

export interface SubmitPracticeResponse {
  practiceSessionId: string;
  subject: string | null;
  year: number | null;
  totalAnswered: number;
  totalTimeSeconds: number;
  overallScore: number;
  passed: boolean;
  results: GradingResult[];
}

// ── Results / Review ─────────────────────────────────────────

export interface PracticeResultsResponse {
  practiceSessionId: string;
  subject: string | null;
  year: number | null;
  submittedAt: Date | null;
  totalTimeSeconds: number | null;
  overallScore: number | null;
  passed: boolean | null;
  totalAnswered: number;
  results: GradingResult[];
}

export interface PracticeAttemptReviewResponse {
  practiceSessionId: string;
  subject: string | null;
  year: number | null;
  currentQuestionIndex: number;
  totalAnswered: number;
  hasNext: boolean;
  hasPrevious: boolean;
  question: PracticeQuestionItem;
  userAnswer: string;
  aiScore: number | null;
  band: string | null;
  appPass: boolean | null;
  feedback: object | null;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string | null;
  timeTakenSeconds: number;
  wordCount: number;
}

// ── AI Grading ───────────────────────────────────────────────

export interface ClaudeGradingResult {
  score: number;
  band: string;
  feedback: object;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string;
  tokensUsed: number;
}

// ── Simulation (kept) ────────────────────────────────────────

export interface SubmitSimulationAnswerInput {
  simulationId: string;
  questionId: string;
  answerText: string;
  currentQuestionIndex: number;
}

export interface FinishSimulationResponse {
  simulationId: string;
  overallScore: number;
  passed: boolean;
  passThreshold: number;
  appPassThreshold: number;
  totalTimeSeconds: number;
  averageTimePerQuestion: number;
  results: {
    questionId: string;
    questionIndex: number;
    subject: string | null;
    userAnswer: string;
    timeTakenSeconds: number;
    aiScore: number;
    band: string;
    appPass: boolean;
    feedback: object;
    strengths: string[];
    improvements: string[];
    sampleAnswer: string;
  }[];
}

export interface FailSimulationResponse {
  failed: boolean;
  reason: string;
  message: string;
}
