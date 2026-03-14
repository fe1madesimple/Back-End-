// src/modules/history/interface/history.interface.ts

// ─── Stats Bar ────────────────────────────────────────────────────────────────
// Powers the 3 stat cards at the top of the history page.

export interface HistoryStatsResponse {
  essayPractice: {
    total: number;          // "18" in card
    avgScore: number;       // 64  → "Avg. score 64%"
  };
  fullSimulations: {
    total: number;          // "3" in card
    completed: number;      // "Completed 3hr simulations"
  };
  mcqBatches: {
    total: number;          // "42" in card
    bestScore: number;      // 92  → "Best score 92%"
  };
}

// ─── Activity Feed (paginated list) ──────────────────────────────────────────
// Powers the main feed under the tabs (All / MCQ Batches / Essay Practice / Simulations).
// type = 'MCQ' | 'ESSAY' | 'SIMULATION'
// source = 'FROM_LESSON' | 'STANDARD_SET' | 'SIMULATION'

export type HistoryItemType = 'MCQ' | 'ESSAY' | 'SIMULATION';
export type HistoryItemSource = 'FROM_LESSON' |  'SIMULATION';

export interface HistoryFeedItem {
  id: string;               // sessionId or attemptId — used to fetch detail modal
  type: HistoryItemType;
  source: HistoryItemSource;
  subject: string;          // e.g. "Contract Law"
  title: string;            // e.g. "Offer & Acceptance Fundamentals"
  date: string;             // ISO date string
  year: number | null;      // e.g. 2022 — shown as "2022 Paper"
  score: number | null;     // percentage (0-100) for essay/simulation; accuracy for MCQ
  passed: boolean | null;   // null for MCQ (no pass/fail)
  appPass: boolean | null;  // essay/simulation "app pass" threshold
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
// Powers the MCQ detail modal (ww1.png / ww2.png).
// Shown when user taps an MCQ batch card.

export interface MCQDetailQuestion {
  index: number;              // 1-based (Question 1 of 5)
  total: number;
  questionText: string;
  userAnswer: string | null;  // the option key they picked e.g. "A"
  userAnswerText: string;     // the option text
  correctAnswer: string;      // e.g. "B"
  correctAnswerText: string;
  isCorrect: boolean;
  explanation: string | null;
}

export interface MCQSessionDetailResponse {
  sessionId: string;
  subject: string;
  source: HistoryItemSource;
  attemptedAt: string;        // ISO datetime
  correctAnswers: number;     // e.g. 4
  totalQuestions: number;     // e.g. 5
  accuracyPercent: number;    // e.g. 80
  questions: MCQDetailQuestion[];
}

// ─── Essay Attempt Detail ─────────────────────────────────────────────────────
// Powers the essay detail screen (ww3.png).
// Shown when user taps an essay practice card.

export interface EssayAttemptDetailResponse {
  attemptId: string;
  subject: string;
  source: HistoryItemSource;
  attemptedAt: string;          // ISO datetime
  timeTakenMinutes: number;
  passed: boolean;
  appPass: boolean;
  aiScore: number;              // out of 20
  scoreOutOf: 20;
  band: string;

  // The question
  questionText: string;
  year: number | null;
  examType: string | null;

  // The student's answer
  userAnswer: string;

  // AI review
  sampleAnswer: string | null;
  feedback: object | null;      // structured feedback object
  strengths: string[];
  improvements: string[];
  overallComment: string | null; // derived from feedback if present
}

// ─── Simulation Detail ────────────────────────────────────────────────────────
// Powers the simulation detail screen — accordion view with all answered essays.
// Unlike a single essay attempt, a simulation has multiple EssayAttempts
// all linked by the same simulationId. Frontend receives ALL questions in one
// response so prev/next accordion navigation needs no further API calls.

export interface SimulationEssayItem {
  attemptId: string;            // EssayAttempt.id
  index: number;                // 1-based position (1 of 5)
  total: number;                // total answered (max 5)

  // The question
  questionText: string;
  subject: string | null;
  year: number | null;
  examType: string | null;

  // The student's answer
  userAnswer: string;
  wordCount: number;
  timeTakenMinutes: number;

  // Score
  aiScore: number;              // out of 20
  scoreOutOf: 20;
  band: string;
  passed: boolean;              // aiScore (raw) >= 50
  appPass: boolean;             // aiScore (raw) >= 80

  // AI review
  sampleAnswer: string | null;
  feedback: object | null;
  strengths: string[];
  improvements: string[];
}

export interface SimulationDetailResponse {
  simulationId: string;
  subject: string | null;       // null = mixed subjects
  year: number | null;
  startedAt: string;            // ISO datetime
  totalTimeMinutes: number | null;
  overallScore: number | null;  // percentage 0-100
  passed: boolean | null;
  totalAnswered: number;        // how many essays were answered (max 5)
  // All attempts — send everything so frontend can accordion without extra calls
  attempts: SimulationEssayItem[];
}