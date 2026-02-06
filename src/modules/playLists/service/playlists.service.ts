import { prisma } from '@/shared/config';
import { CreatePlaylistRequest, PlaylistResponse } from '../interface/playlists.interface';

class PlaylistService {
  async createPlaylist(userId: string, data: CreatePlaylistRequest): Promise<PlaylistResponse> {
    const playlist = await prisma.playlist.create({
      data: {
        userId,
        name: data.name,
        description: data.description,
      },
      include: {
        _count: {
          select: { podcasts: true },
        },
      },
    });

    return {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      podcastCount: playlist._count.podcasts,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
    };
  }
}

export default new PlaylistService();
