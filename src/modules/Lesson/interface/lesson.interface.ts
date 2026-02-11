// src/modules/content/interface/content.interface.ts

export interface TrackVideoInput {
  currentTime: number;
  videoDuration?: number;
}

export interface LessonDetailResponse {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  videoUrl: string | null;
  videoDuration: number | null;
  transcript: string | null;
  order: number;
  module: {
    id: string;
    name: string;
    subjectId: string;
    subjectName: string;
  };
  userProgress: {
    isCompleted: boolean;
    videoWatchedSeconds: number;
    timeSpentSeconds: number;
    lastAccessedAt: Date | null;
  } | null;
  subjectModules: Array<{
    id: string;
    name: string;
    order: number;
    lessons: Array<{
      id: string;
      title: string;
      order: number;
    }>;
  }>;
}