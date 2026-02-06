import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import {
  createPlaylist,
  getUserPlaylists,
  addPodcastToPlaylist,
    removePodcastFromPlaylist,
  deletePlaylist
} from '../controller/playlists.controller';
import {
  createPlaylistSchema,
  addPodcastToPlaylistSchema,
    removePodcastFromPlaylistSchema,
  deletePlaylistSchema
} from '../validator/playlists.validator';

const playListRouter = Router();

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Playlist created successfully
 */
playListRouter.post('/', protect, validate(createPlaylistSchema), createPlaylist);

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Get user's playlists
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Playlists retrieved successfully
 */
playListRouter.get('/', protect, getUserPlaylists);

/**
 * @swagger
 * /playlists/{id}/podcasts:
 *   post:
 *     summary: Add podcast to playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - podcastId
 *             properties:
 *               podcastId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Podcast added successfully
 *       404:
 *         description: Playlist or podcast not found
 */
playListRouter.post(
  '/:id/podcasts',
  protect,
  validate(addPodcastToPlaylistSchema),
  addPodcastToPlaylist
);

/**
 * @swagger
 * /playlists/{id}/podcasts/{podcastId}:
 *   delete:
 *     summary: Remove podcast from playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *       - in: path
 *         name: podcastId
 *         required: true
 *         schema:
 *           type: string
 *         description: Podcast ID
 *     responses:
 *       200:
 *         description: Podcast removed successfully
 *       404:
 *         description: Playlist or podcast not found
 */
playListRouter.delete(
  '/:id/podcasts/:podcastId',
  protect,
  validate(removePodcastFromPlaylistSchema),
  removePodcastFromPlaylist
);


/**
 * @swagger
 * /playlists/{id}:
 *   delete:
 *     summary: Delete playlist and all its contents
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       404:
 *         description: Playlist not found
 */
playListRouter.delete('/:id', protect, validate(deletePlaylistSchema), deletePlaylist);

export default playListRouter;
