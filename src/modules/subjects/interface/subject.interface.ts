// src/modules/content/interface/content.interface.ts

export interface SubjectWithProgress {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order: number;
  progress: {
    progressPercent: number;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    totalTimeSeconds: number;
    lastAccessedAt: Date | null;
  } | null;
}

export interface SubjectDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  progress: {
    progressPercent: number;
    status: string;
    totalTimeSeconds: number;
    lastAccessedAt: Date | null;
  } | null;
  modules: {
    id: string;
    name: string;
    slug: string;
    order: number;
    lessonsCount: number;
    completedLessons: number;
    status: string;
  }[];
  stats: {
    totalModules: number;
    completedModules: number;
    totalLessons: number;
    completedLessons: number;
    averageQuizScore: number;
  };
}