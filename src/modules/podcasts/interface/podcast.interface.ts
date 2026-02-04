

export interface PodcastListResponse {
  podcasts: {
    id: string;
    title: string;
    description: string | null; // ← Add | null
    subject: string | null; // ← Add | null
    audioUrl: string;
    thumbnail: string | null;
    duration: number | null;
    order: number;
  }[];
  total: number;
}

export interface PodcastDetailResponse {
  podcast: {
    id: string;
    title: string;
    description: string | null;
    subject: string | null;
    audioUrl: string;
    thumbnail: string | null;
    duration: number | null;
    order: number;
  };
  progress: {
    listenedSeconds: number;
    isCompleted: boolean;
    completedAt: Date | null;
  } | null;
}

export interface TrackPodcastRequest {
  currentTime: number;
  audioDuration?: number;
}