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

export interface PlaylistWithPodcastsResponse {
  id: string;
  name: string;
  description: string | null;
  podcastCount: number;
  podcasts: {
    id: string;
    title: string;
    thumbnail: string | null;
    duration: number | null;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GetPlaylistsResponse {
  playlists: PlaylistWithPodcastsResponse[];
  total: number;
}
