// src/modules/content/interface/content.interface.ts

export interface SubjectDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  progressColor: string;
  progress: {
    progressPercent: number;
    status: string;
    totalTimeSeconds: number;
    lastAccessedAt: Date | null;
  };
  modules: Array<{
    id: string;
    name: string;
    slug: string;
    order: number;
    lessonsCount: number;
    completedLessons: number;
    status: string;
  }>;
  stats: {
    totalModules: number;
    completedModules: number;
    totalLessons: number;
    completedLessons: number;
    averageQuizScore: number;
  };
}

export interface SubjectWithProgress {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string;
  progressColor: string;
  order: number;
  progress: {
    progressPercent: number;
    status: string;
    totalTimeSeconds: number;
    lastAccessedAt: Date | null;
  };
}

