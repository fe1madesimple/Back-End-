export interface QuizResultsResponse {
  score: {
    correct: number;
    total: number;
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
    avgTimePerQuestion: number;
    quizStreak: number;
  };
  actions: {
    tryAgain: boolean;
    nextQuiz: boolean;
  };
}
