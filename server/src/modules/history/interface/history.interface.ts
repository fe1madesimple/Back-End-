// src/modules/history/interface/history.interface.ts

// ─── Stats Bar ────────────────────────────────────────────────────────────────

export interface HistoryStatsResponse {
  essayPractice: {
    total: number; // LESSON_PRACTICE attempts only
    avgScore: number; // out of 20
  };
  simulations: {
    // completed PracticeSession records
    total: number;
  };
  mcqBatches: {
    total: number;
    bestScore: number; // best accuracy % across all sessions
  };
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

export type HistoryItemType = 'MCQ' | 'ESSAY' | 'SIMULATION';
export type HistoryItemSource = 'FROM_LESSON' | 'FROM_PRACTICE' | 'SIMULATION';

export interface HistoryFeedItem {
  id: string; // attemptId / sessionId / practiceSessionId
  type: HistoryItemType;
  source: HistoryItemSource;
  subject: string;
  title: string;
  date: string; // ISO date string
  year: number | null;
  score: number | null; // accuracy % for MCQ, score/20 for essay/sim
  passed: boolean | null; // null for MCQ
  appPass: boolean | null;
}

export interface HistoryFeedResponse {
  items: HistoryFeedItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ─── MCQ Session Detail ───────────────────────────────────────────────────────

export interface MCQDetailQuestion {
  index: number; // 1-based
  total: number;
  questionText: string;
  userAnswer: string | null; // option key e.g. 'A'
  userAnswerText: string; // option text
  correctAnswer: string; // e.g. 'B'
  correctAnswerText: string;
  isCorrect: boolean;
  explanation: string | null;
}

export interface MCQSessionDetailResponse {
  sessionId: string;
  subject: string;
  source: HistoryItemSource;
  attemptedAt: string;
  correctAnswers: number;
  totalQuestions: number;
  accuracyPercent: number;
  questions: MCQDetailQuestion[];
}

// ─── Essay Attempt Detail ─────────────────────────────────────────────────────

export interface EssayAttemptDetailResponse {
  attemptId: string;
  subject: string;
  source: HistoryItemSource;
  attemptedAt: string;
  timeTakenMinutes: number;
  passed: boolean;
  appPass: boolean;
  aiScore: number; // out of 20
  scoreOutOf: 20;
  band: string;
  questionText: string;
  year: number | null;
  examType: string | null;
  userAnswer: string;
  sampleAnswer: string | null;
  feedback: object | null;
  strengths: string[];
  improvements: string[];
  overallComment: string | null;
}

// ─── Simulation Detail ────────────────────────────────────────────────────────
// Powers accordion view — all answered essays returned in one call.
// Frontend prev/next navigation needs no further API calls.

export interface SimulationEssayItem {
  attemptId: string;
  index: number; // 1-based
  total: number; // total answered (max 5)
  questionText: string;
  subject: string | null;
  year: number | null;
  examType: string | null;
  userAnswer: string;
  wordCount: number;
  timeTakenMinutes: number;
  aiScore: number; // out of 20
  scoreOutOf: 20;
  band: string;
  passed: boolean;
  appPass: boolean;
  sampleAnswer: string | null;
  feedback: object | null;
  strengths: string[];
  improvements: string[];
}

export interface SimulationDetailResponse {
  simulationId: string; // practiceSessionId
  subject: string | null;
  year: number | null;
  startedAt: string;
  totalTimeMinutes: number | null;
  overallScore: number | null; // 0-100
  passed: boolean | null;
  totalAnswered: number;
  attempts: SimulationEssayItem[];
}
