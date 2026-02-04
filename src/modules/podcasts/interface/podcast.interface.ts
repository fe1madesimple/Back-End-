// src/modules/content/interface/content.interface.ts

export interface PodcastListResponse {
  podcasts: {
    id: string;
    title: string;
    description: string;
    subject: string;
    audioUrl: string;
    thumbnail: string | null;
    duration: number | null;
    order: number;
  }[];
  total: number;
}
