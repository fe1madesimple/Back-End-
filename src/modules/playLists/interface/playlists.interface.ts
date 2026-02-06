export interface CreatePlaylistRequest {
  name: string;
  description?: string;
}

export interface PlaylistResponse {
  id: string;
  name: string;
  description: string | null;
  podcastCount: number;
  createdAt: Date;
  updatedAt: Date;
}
