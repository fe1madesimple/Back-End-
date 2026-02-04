

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

export interface StudyStreakResponse {
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
  dailyGoal: {
    targetHours: number;
    todayProgress: number;
    todayMinutes: number;
    goalMet: boolean;
  };
  weekActivity: {
    date: string;
    minutesStudied: number;
    goalMet: boolean;
  }[];
  monthCalendar: {
    date: string;
    minutesStudied: number;
    goalMet: boolean;
  }[];
  streakHistory: {
    startDate: Date;
    endDate: Date;
    lengthDays: number;
  }[];
}


export interface WeeklySummaryResponse {
  weekRange: {
    startDate: string;
    endDate: string;
  };
  summary: {
    totalTimeSeconds: number;
    totalLessonsCompleted: number;
    totalQuestionsAttempted: number;
    averageQuizScore: number;
    daysStudied: number;
    dailyGoalsMet: number;
  };
  dailyBreakdown: {
    date: string;
    dayName: string;
    timeSeconds: number;
    lessonsCompleted: number;
    questionsAttempted: number;
    quizScore: number | null;
    goalMet: boolean;
  }[];
  topSubjects: {
    subjectName: string;
    timeSeconds: number;
    lessonsCompleted: number;
  }[];
  achievements: {
    type: string;
    title: string;
    description: string;
  }[];
}