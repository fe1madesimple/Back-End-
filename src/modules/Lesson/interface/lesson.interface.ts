// src/modules/content/interface/lesson.interface.ts

export interface TrackVideoInput {
  currentTime: number;
  videoDuration?: number;
}

export interface LessonDetailResponse {
  id: string;
  title: string;
  slug: string | null;
  content: string | null;
  videoUrl: string | null;
  videoDuration: number | null;
  transcript: string | null;
  order: number;
  module: {
    id: string;
    name: string;
    subjectId: string;
    subjectName: string;
  };
  userProgress: {
    isCompleted: boolean;
    videoWatchedSeconds: number;
    timeSpentSeconds: number;
    lastAccessedAt: Date | null;
  } | null;
  subjectModules: Array<{
    id: string;
    name: string;
    order: number;
    lessons: Array<{
      id: string;
      title: string;
      order: number;
    }>;
  }>;
}

export interface ModuleListResponse {
  modules: Array<{
    id: string;
    name: string;
    slug: string | null;
    order: number;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
    progress: {
      completedLessons: number;
      totalLessons: number;
    };
    lessons: Array<{
      id: string;
      title: string;
      order: number;
    }>;
  }>;
}

// ─── Lesson MCQ Quiz ──────────────────────────────────────────────────────────

export interface LessonMCQItem {
  id: string;
  text: string;
  options: Record<string, string>; // { A: "...", B: "...", C: "...", D: "..." }
  points: number;
}

export interface LessonMCQResponse {
  lessonId: string;
  lessonTitle: string;
  questions: LessonMCQItem[]; // max 7
}

// ─── Single-Essay Lesson Practice ────────────────────────────────────────────
// Source: EssayQuestion model (dedicated 747-question bank).
//
// Flow:
//   1. GET  /lessons/:id/essay     → returns one random EssayQuestion
//   2. Student writes their answer
//   3. POST /lessons/essay/submit  → AI grades → returns FULL review inline
//      The submit response contains everything: question, userAnswer, sampleAnswer,
//      feedback, score, strengths, improvements — frontend renders the review
//      screen directly. No second API call. No separate review endpoint.
//
// History: EssayAttempt saved on submit with source='LESSON_PRACTICE'.
//          This becomes the history record shown on the history page.

export interface LessonEssayQuestion {
  id: string;       // EssayQuestion.id — pass back as essayQuestionId on submit
  text: string;     // the full question prompt
  subject: string;  // e.g. "Contract Law"
}

export interface GetLessonEssayResponse {
  lessonId: string;
  lessonTitle: string;
  subject: string;       // e.g. "Contract Law"  — for the breadcrumb
  moduleOrder: number;   // e.g. 1  → displays as "Module 1"
  moduleName: string;    // e.g. "Formation of Contract"
  lessonOrder: number;   // e.g. 1  → displays as "Lesson 1"
  question: LessonEssayQuestion;
}

export interface SubmitLessonEssayInput {
  lessonId: string;
  essayQuestionId: string; // EssayQuestion.id from GET /lessons/:id/essay
  answerText: string;
}

// This single response powers the entire review screen.
// No follow-up request needed.
export interface SubmitLessonEssayResponse {
  attemptId: string;
  lessonId: string;
  lessonTitle: string;

  // The question (so frontend can display it on the review screen)
  question: LessonEssayQuestion;

  // The student's answer echoed back
  userAnswer: string;

  // Score
  aiScore: number;       // out of 20
  scoreOutOf: 20;
  band: string;          // e.g. "Distinction", "Merit", "Pass", "Fail"
  appPass: boolean;      // score >= 80/100 → 16/20 ("app pass" bar)
  passed: boolean;       // score >= 50/100 → 10/20 (basic pass)

  // Review content
  feedback: object | null;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string | null;

  // Stats
  timeTakenSeconds: number;
  wordCount: number;
}