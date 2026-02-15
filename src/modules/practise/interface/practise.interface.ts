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


// src/modules/practice/interfaces/practice.interface.ts

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
    description: string;
    questionCount: number;
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

export interface QuestionDetail {
  id: string;
  type: string;
  subject: string;
  year: number;
  examType: string;
  description: string;
  text: string;
  order: number;
  averageTime: number
}

export interface PastQuestionDetailResponse {
  parentQuestion: QuestionDetail;
  questions: QuestionDetail[];
  averageAttemptTimeSeconds: number;
  userPreviousAttempts: Array<{
    id: string;
    questionId: string;
    aiScore: number;
    band: string;
    createdAt: Date;
  }>;
}

export interface StartPracticeResponse {
  timerId: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  questionId: string;
  subject: string;
  examType: string;
  text: string;
  averageAttemptTimeSeconds: number;
}

export interface SubmitEssayInput {
  questionId: string;
  answerText: string;
  timeTakenSeconds: number;
  currentQuestionIndex: number;
  parentQuestionId: string;
}

export interface SubmitEssayResponse {
  attemptId: string;
  userAnswer: string;
  aiScore: number;
  band: string;
  feedback: any;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string;
  currentQuestionIndex: number;
  nextQuestionIndex: number | null;
  totalQuestions: number;
  hasNextQuestion: boolean;
}

export interface NextQuestionResponse {
  timerId: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  questionId: string;
  subject: string;
  examType: string;
  text: string;
  averageAttemptTimeSeconds: number;
}

export interface AttemptDetailsResponse {
  attemptId: string;
  userAnswer: string;
  aiScore: number;
  band: string;
  feedback: any;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string;
  timeTakenSeconds: number;
  wordCount: number;
  createdAt: Date;
  currentQuestionIndex: number;
  totalQuestions: number;
  subject: string;
  examType: string;
  questionText: string;
  hasNextQuestion: boolean;
  hasPreviousQuestion: boolean;
}


export interface QuickQuizResponse {
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
    subject: string;
    module: string;
  }>;
  totalAvailable: number;
}

export interface QuizResultsResponse {
  score: {
    correct: number;
    total: number;
    answered: number;
    percentage: number;
  };
  message: string;
  badge: {
    unlocked: boolean;
    title: string;
    description: string;
  } | null;
  performance: {
    accuracyRate: number;
    avgTimerPerQuestion:  number;
    quizStreak: number;
  }
}




// simulation interface

// src/modules/practice/interfaces/simulation.interface.ts

export interface StartSimulationResponse {
  simulationId: string;
  startedAt: Date;
  totalTimeSeconds: number; // 10800 (3 hours)
  questions: Array<{
    questionId: string;
    questionIndex: number;
    subject: string;
    examType: string;
    text: string;
  }>;
}

export interface SubmitSimulationAnswerInput {
  simulationId: string;
  questionId: string;
  answerText: string;
  timeTakenSeconds: number;
  currentQuestionIndex: number;
}

export interface SubmitSimulationAnswerResponse {
  attemptId: string;
  saved: true;
  timeTakenSeconds: number;
  currentQuestionIndex: number;
  nextQuestionIndex: number | null;
  hasNextQuestion: boolean;
  nextQuestion: {
    questionId: string;
    questionIndex: number;
    subject: string;
    examType: string;
    text: string;
  } | null;
}

export interface GetSimulationQuestionResponse {
  currentQuestionIndex: number;
  totalQuestions: number;
  questionId: string;
  subject: string;
  examType: string;
  text: string;
  userAnswer: string | null;
  isSubmitted: boolean;
  timeTakenSeconds: number | null;
  canEdit: boolean;
}

export interface FinishSimulationResponse {
  simulationId: string;
  overallScore: number;
  passed: boolean;
  passThreshold: number; // 50
  appPassThreshold: number; // 80
  totalTimeSeconds: number;
  averageTimePerQuestion: number;
  results: Array<{
    questionId: string;
    questionIndex: number;
    subject: any;
    userAnswer: string;
    timeTakenSeconds: number;
    aiScore: number;   
    band: string;
    feedback: any;
    strengths: string[];
    improvements: string[];
    sampleAnswer: string;
  }>;
}

export interface FailSimulationResponse {
  failed: true;
  reason: string;
  message: string;
}