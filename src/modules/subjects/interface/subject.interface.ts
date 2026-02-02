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
