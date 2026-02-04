

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

