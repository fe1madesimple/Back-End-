

export interface DashboardStatsResponse {
  overallProgress: {
    totalSubjects: number;
    completedSubjects: number;
    averageProgress: number;
  };
  todayActivity: {
    timeSpentSeconds: number;
    lessonsCompleted: number;
    questionsAttempted: number;
  };
  weekActivity: {
    totalTimeSeconds: number;
    lessonsCompleted: number;
    questionsAttempted: number;
    averageScore: number;
  };
  recentActivity: {
    type: 'LESSON' | 'QUIZ' | 'ESSAY';
    title: string;
    subjectName: string;
    timestamp: Date;
  }[];
  upcomingGoals: {
    targetExamDate: Date | null;
    daysUntilExam: number | null;
    dailyStudyGoal: number;
    todayProgress: number;
  };
}

export interface SubjectProgressDetailResponse {
  subject: {
    id: string;
    name: string;
    progressPercent: number;
    status: string;
    totalTimeSeconds: number;
    lastAccessedAt: Date | null;
  };
  modules: {
    id: string;
    name: string;
    progressPercent: number;
    status: string;
    completedLessons: number;
    totalLessons: number;
    quizAverage: number | null;
  }[];
  performance: {
    totalLessonsCompleted: number;
    totalLessons: number;
    totalQuestionsAttempted: number;
    averageQuizScore: number;
    timeSpentThisWeek: number;
    completionRate: number;
  };
  recentLessons: {
    id: string;
    title: string;
    moduleName: string;
    completedAt: Date;
  }[];
}