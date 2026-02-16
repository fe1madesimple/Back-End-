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

export interface ModuleStatsResponse {
  module: {
    id: string;
    name: string;
    subjectName: string;
    progressPercent: number;
    status: string;
  };
  lessons: {
    totalLessons: number;
    completedLessons: number;
    averageTimePerLesson: number;
    totalTimeSpent: number;
  };
  quizzes: {
    totalQuestions: number;
    attemptedQuestions: number;
    correctAnswers: number;
    averageScore: number;
    bestScore: number;
    worstScore: number;
  };
  performance: {
    strongTopics: {
      topic: string;
      score: number;
    }[];
    weakTopics: {
      topic: string;
      score: number;
    }[];
    recentAttempts: {
      questionText: string;
      isCorrect: boolean;
      score: number;
      timestamp: Date;
    }[];
  };
  recommendations: {
    type: string;
    message: string;
  }[];
}


export interface SimpleDashboardResponse {
  isNew: boolean;
  examCountdown: {
    daysUntilExam: number;
    examDate: string;
  };
  todayStudy: {
    hoursToday: number;
    targetHours: number;
    progressPercent: number;
  };
  weeklyStreak: {
    currentStreak: number;
    longestStreak: number;
    weekCalendar: Array<{
      day: string;
      hasActivity: boolean;
    }>;
  };
  quizPerformance: {
    averageScore: number;
    highestScore: number;
    lowestScore: number;
  };
  resumeLearning: {
    lessonTitle: string;
    subjectName: string;
    minutesRemaining: number;
    progressPercent: number;
    lessonId: string;
    moduleId: string;
  } | null;
  recommendedPodcasts: Array<{
    id: string;
    title: string;
    subjectName: string;
    durationMinutes: number;
    thumbnail: string;
  }>;
  lifetimeStudyHours: number; 
}


export interface StudyOverviewResponse {
  weekSummary: string; 
  focusSubjects: string[];
  stats: {
    subjectsEnrolled: number;
    lessonsCompleted: number;
    quizAccuracy: number;
    practiceAttempts: number;
    currentStreak: number;
  };
  achievementHint: string; 
}