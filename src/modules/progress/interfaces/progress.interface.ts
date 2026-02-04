

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
    