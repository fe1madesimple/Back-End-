// src/modules/practise/interface/practise.interface.ts

// ── Past Questions ───────────────────────────────────────────

export interface PastQuestionsQuery {
  search?: string;
  subject?: string;
  year?: number;
  page?: number;
  limit?: number;
  sitting?: string;
  examType?: string;
}

export interface PastQuestionCard {
  id: string;
  subject: string | null;
  year: number | null;
  examType: string | null;
  description: string | null;
  sitting: string | null;
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
  sittings: string[];
}

export interface PastQuestionsResponse {
  questions: PastQuestionCard[];
  pagination: PastQuestionsPagination;
  filters: PastQuestionsFilters;
}

// ── Start Practice ───────────────────────────────────────────

export interface StartPracticeInput {
  subject: string;
  year: number;
  sitting: string;
}

export interface StartPracticeResponse {
  practiceSessionId: string;
  subject: string;
  sitting: string;
  year: number;
  totalQuestions: number;
  startedAt: Date; // frontend uses this to sync elapsed timer on reload
}

// ── Get Question ─────────────────────────────────────────────

export interface PracticeQuestionItem {
  id: string;
  subject: string | null;
  year: number | null;
  examType: string | null;
  text: string;
  description: string | null;
  order: number;
  index: number; // 0-based position in session (box number - 1)
}

export interface GetPracticeQuestionResponse {
  practiceSessionId: string;
  subject: string | null;
  year: number | null;
  elapsedSeconds: number; // now - session.startedAt
  question: PracticeQuestionItem;
  totalQuestions: number;
  currentQuestionIndex: number;
  answeredIndexes: number[]; // which box indexes have been answered
  savedAnswer: string | null; // pre-fill textarea on reload
}

// ── Submit Practice ──────────────────────────────────────────

export interface SubmitAnswerItem {
  questionIndex: number; // 0-based index — backend resolves questionId via session.questionIds[index]
  answerText: string;
}

export interface SubmitPracticeInput {
  practiceSessionId: string;
  answers: SubmitAnswerItem[]; // min 5
}

export interface QuestionScoreItem {
  questionIndex: number; // drives Q1, Q2... label on frontend
  aiScore: number; // out of 20
  scoreOutOf: number; // always 20
  band: string;
  appPass: boolean;
}

export interface SubmitPracticeResponse {
  practiceSessionId: string;
  subject: string | null;
  year: number | null;
  submittedAt: Date;
  totalAnswered: number;
  totalTimeSeconds: number;
  overallScore: number; // percentage e.g. 71
  passed: boolean;
  scores: QuestionScoreItem[]; // sorted by questionIndex for scoreboard bars
}

// ── Results (scoreboard fetch) ───────────────────────────────

export interface PracticeResultsResponse {
  practiceSessionId: string;
  subject: string | null;
  year: number | null;
  submittedAt: Date | null;
  totalTimeSeconds: number | null;
  overallScore: number | null;
  passed: boolean | null;
  totalAnswered: number;
  scores: QuestionScoreItem[];
}

// ── Review ───────────────────────────────────────────────────

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
  scoreOutOf: number;
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
