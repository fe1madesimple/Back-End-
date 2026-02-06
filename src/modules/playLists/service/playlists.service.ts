import { prisma } from '@/shared/config';
import {
  CreatePlaylistRequest,
  PlaylistResponse,
    GetPlaylistsResponse,
  AddPodcastToPlaylistResponse
} from '../interface/playlists.interface';
import { NotFoundError, BadRequestError } from '@/shared/utils';

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

  async addPodcastToPlaylist(
    userId: string,
    playlistId: string,
    podcastId: string
  ): Promise<AddPodcastToPlaylistResponse> {
    // Check playlist exists and belongs to user
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      select: { id: true, userId: true },
    });

    if (!playlist) {
      throw new NotFoundError('Playlist not found');
    }

    if (playlist.userId !== userId) {
      throw new BadRequestError('You do not have access to this playlist');
    }

    // Check podcast exists
    const podcast = await prisma.podcast.findUnique({
      where: { id: podcastId },
      select: { id: true },
    });

    if (!podcast) {
      throw new NotFoundError('Podcast not found');
    }

    // Check if already in playlist
    const existing = await prisma.playlistPodcast.findUnique({
      where: {
        playlistId_podcastId: {
          playlistId,
          podcastId,
        },
      },
    });

    if (existing) {
      throw new BadRequestError('Podcast already in playlist');
    }

    // Get current max order
    const maxOrder = await prisma.playlistPodcast.findFirst({
      where: { playlistId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const nextOrder = (maxOrder?.order ?? 0) + 1;

    // Add to playlist
    await prisma.playlistPodcast.create({
      data: {
        playlistId,
        podcastId,
        order: nextOrder,
      },
    });

    return {
      message: 'Podcast added to playlist',
      playlistId,
      podcastId,
    };
  }
}

export default new PlaylistService();
