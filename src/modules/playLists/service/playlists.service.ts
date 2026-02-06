import { prisma } from '@/shared/config';
import { CreatePlaylistRequest, PlaylistResponse, GetPlaylistsResponse } from '../interface/playlists.interface';

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

  async getUserPlaylists(userId: string): Promise<GetPlaylistsResponse> {
    const playlists = await prisma.playlist.findMany({
      where: { userId },
      include: {
        podcasts: {
          include: {
            podcast: {
              select: {
                id: true,
                title: true,
                thumbnail: true,
                duration: true,
              },
            },
          },
          orderBy: { order: 'asc' },
          take: 4, // Show first 4 podcasts for preview
        },
        _count: {
          select: { podcasts: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      playlists: playlists.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        podcastCount: p._count.podcasts,
        podcasts: p.podcasts.map((pp) => ({
          id: pp.podcast.id,
          title: pp.podcast.title,
          thumbnail: pp.podcast.thumbnail,
          duration: pp.podcast.duration,
        })),
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
      total: playlists.length,
    };
  }
}

export default new PlaylistService();
