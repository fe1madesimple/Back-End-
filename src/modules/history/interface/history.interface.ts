// ─── PATCH: Update history.interface.ts ──────────────────────────────────────

// HistoryItemSource — add FROM_PRACTICE
export type HistoryItemType = 'MCQ' | 'ESSAY' | 'SIMULATION';
export type HistoryItemSource = 'FROM_LESSON' | 'FROM_PRACTICE' | 'SIMULATION';
//                                                ↑ NEW          ↑ keep for legacy Simulation model

// HistoryStatsResponse — rename fullSimulations → simulations, remove completed field
export interface HistoryStatsResponse {
  essayPractice: {
    total: number;
    avgScore: number; // out of 20
  };
  simulations: {
    // ← renamed from fullSimulations
    total: number; // count of completed PracticeSessions
  };
  mcqBatches: {
    total: number;
    bestScore: number;
  };
}

// HistoryFeedItem — unchanged shape, source now includes FROM_PRACTICE
export interface HistoryFeedItem {
  id: string;
  type: HistoryItemType;
  source: HistoryItemSource;
  subject: string;
  title: string;
  date: string;
  year: number | null;
  score: number | null;
  passed: boolean | null;
  appPass: boolean | null;
}

// HistoryFeedResponse — unchanged
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
