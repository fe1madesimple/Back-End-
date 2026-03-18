// src/modules/support/interfaces/support.interface.ts

export interface ScheduleBookingResponse {
  message: string;
  emailSent: boolean;
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