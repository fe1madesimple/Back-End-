// src/modules/content/interface/content.interface.ts

export interface SubjectDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;                    // ← Added
  progressColor: string;            // ← Added
  progress: {
    progressPercent: number;        // ← Now always number (0 if no progress)
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
}export interface SubjectDetail {
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

