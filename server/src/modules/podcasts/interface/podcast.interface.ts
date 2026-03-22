export interface PodcastNotes {
  concepts: string[];
  cases: string[];
}

export interface PodcastResponse {
  id: string;
  title: string;
  subjectName: string;
  subjectColor: string;
  audioUrl: string;
  publicId: string;
  duration: number;
  thumbnail: string | null;
  moduleNumber: number | null;
  lessonNumber: number | null;
  part: number | null;
  isBonus: boolean;
  notes: PodcastNotes | null;
  examTip: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PodcastQueryParams {
  subject?: string;
  isBonus?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PodcastPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PodcastListResponse {
  podcasts: any[];
  pagination: PodcastPagination;
  subjects: string[];
}