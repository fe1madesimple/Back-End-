import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils';
import { sendSuccess } from '@/shared/utils/response';
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
