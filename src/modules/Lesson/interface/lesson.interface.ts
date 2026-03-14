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

// ─── Lesson MCQ ───────────────────────────────────────────────────────────────

export interface LessonMCQItem {
  id: string;
  text: string;
  options: Record<string, string>;
  points: number;
}

export interface LessonMCQResponse {
  sessionId: string; // QuizSession created on fetch — needed for attemptMCQ
  lessonId: string;
  lessonTitle: string;
  totalQuestions: number;
  questions: LessonMCQItem[];
}

export interface MCQAttemptInput {
  sessionId: string;
  answer: string; // 'A' | 'B' | 'C' | 'D' | '' (empty = skip)
  timeTakenSeconds: number;
}

export interface MCQAttemptResponse {
  attemptId: string;
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string | null;
  isLastQuestion: boolean; // true → frontend shows "View Results" instead of "Continue"
}

export interface QuizResultsResponse {
  sessionId: string;
  score: number; // correct answers — whole number
  total: number; // total questions
  accuracyPercent: number; // whole number, no decimals
  avgTimePerQuestionSeconds: number; // whole number, no decimals
  quizStreak: number; // consecutive days with ≥1 completed session
  motivationalMessage: string;
  badgeUnlocked: boolean; // true only on 100%
  completedAt: string; // ISO string
}

// ─── Lesson Essay ─────────────────────────────────────────────────────────────

export interface LessonEssayQuestion {
  id: string;
  text: string;
  subject: string;
}

export interface GetLessonEssayResponse {
  practiceSessionId: string; // PracticeSession created on fetch — needed for submit
  lessonId: string;
  lessonTitle: string;
  subject: string;
  moduleOrder: number;
  moduleName: string;
  lessonOrder: number;
  question: LessonEssayQuestion;
}

export interface SubmitLessonEssayInput {
  practiceSessionId: string; // replaces lessonId + essayQuestionId
  answerText: string;
}

export interface SubmitLessonEssayResponse {
  attemptId: string;
  lessonId: string;
  lessonTitle: string;
  question: {
    id: string;
    text: string;
    subject: string;
  };
  userAnswer: string;
  aiScore: number;
  scoreOutOf: number;
  band: string;
  appPass: boolean;
  passed: boolean;
  feedback: object | null;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string | null;
  timeTakenSeconds: number;
  wordCount: number;
}
