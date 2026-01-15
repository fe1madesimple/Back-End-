export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  profileColor?: string;
  targetExamDate?: string;
  dailyStudyGoal?: number;
  focusSubjects?: string[];
}

export interface UpdatePreferencesInput {
  emailReminders?: boolean;
  studyStreakAlerts?: boolean;
  podcastRecommendations?: boolean;
  showRelevantEpisodes?: boolean;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface DeleteAccountInput {
  password: string;
  confirmation: string; // Must be "DELETE"
}
