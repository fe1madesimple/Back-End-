import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import { createPlaylist, getUserPlaylists } from '../controller/playlists.controller';
import { createPlaylistSchema } from '../validator/playlists.validator';

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

export default playListRouter;
