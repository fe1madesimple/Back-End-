import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
import { AppError } from '@/shared/utils';
import playlistsService from '../service/playlists.service';

export const createPlaylist = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const data = req.body;

  const playlist = await playlistsService.createPlaylist(userId, data);

  sendSuccess(res, 'Playlist created successfully', playlist, 201);
});

export const getUserPlaylists = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;

  const result = await playlistsService.getUserPlaylists(userId);

  sendSuccess(res, 'Playlists retrieved successfully', result);
});

export const addPodcastToPlaylist = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id } = req.params;
  const { podcastId } = req.body;

  if (!id) throw new AppError('');

  const result = await playlistsService.addPodcastToPlaylist(userId, id, podcastId);

  sendSuccess(res, result.message, result);
});

export const removePodcastFromPlaylist = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
  const { id, podcastId } = req.params;

  if (!id) throw new AppError('podcast id required');

  if (!podcastId) throw new AppError('podcast id required');

  const result = await playlistsService.removePodcastFromPlaylist(userId, id, podcastId);

  sendSuccess(res, result.message, result);
});

export const deletePlaylist = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.user.id;
    const { id } = req.params;
    

    if (!id) throw new AppError("playlists id required")

  const result = await playlistsService.deletePlaylist(userId, id);

  sendSuccess(res, result.message, result);
});