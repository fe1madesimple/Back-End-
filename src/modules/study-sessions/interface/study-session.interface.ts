// src/modules/study-sessions/interface/study-session.interface.ts

export interface StartSessionRequest {
  subjectId: string;
  moduleId?: string;
  sessionType: 'LESSON' | 'PRACTICE' | 'REVIEW';
}

export interface StartSessionResponse {
  sessionId: string;
  startedAt: Date;
  subject: {
    id: string;
    name: string;
  };
  module?: {
    id: string;
    name: string;
  };
}

export interface PingSessionRequest {
  isActive: boolean;
}

export interface EndSessionRequest {
  lessonsCompleted?: number;
  questionsAttempted?: number;
  notes?: string;
}

export interface EndSessionResponse {
  sessionId: string;
  duration: number;
  pointsEarned: number;
  summary: {
    lessonsCompleted: number;
    questionsAttempted: number;
    timeSpent: string;
  };
}
      