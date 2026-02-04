import { getPodcasts, getPodcastById, trackPodcastProgress } from "../controller/podcast.controller";
import { podcastsQuerySchema, trackPodcastSchema } from "../validator/podcast.validator";
import { validate } from "@/shared/middleware/validation";
import { Router } from "express";
import { protect } from "@/shared/middleware/auth.middleware";

const podCastRouter = Router()

/**
 * @swagger
 * /api/v1/podcasts:
 *   get:
 *     summary: Get list of all podcasts
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all published podcasts, optionally filtered by subject.
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject name
 *         example: Criminal Law
 *     responses:
 *       200:
 *         description: Podcasts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     podcasts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           subject:
 *                             type: string
 *                           audioUrl:
 *                             type: string
 *                           thumbnail:
 *                             type: string
 *                             nullable: true
 *                           duration:
 *                             type: integer
 *                             nullable: true
 *                           order:
 *                             type: integer
 *                     total:
 *                       type: integer
 */
podCastRouter.get(
  '/podcasts',
  protect,
  validate(podcastsQuerySchema),
  getPodcasts
);


/**
 * @swagger
 * /api/v1/podcasts/{id}:
 *   get:
 *     summary: Get podcast details with listening progress
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     description: Returns podcast details and user's listening progress for audio player.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podcast retrieved
 *       404:
 *         description: Podcast not found
 */
podCastRouter.get(
  '/podcasts/:id',
  protect,
  getPodcastById
);



// src/modules/content/routes/content.routes.ts

/**
 * @swagger
 * /api/v1/podcasts/{id}/track:
 *   post:
 *     summary: Track podcast listening progress
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Tracks podcast listening position. Call every 30s while playing.
 *       Auto-completes at 90% listened. Frontend sends duration on first ping.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentTime
 *             properties:
 *               currentTime:
 *                 type: integer
 *                 example: 1200
 *               audioDuration:
 *                 type: integer
 *                 example: 2700
 *                 description: Optional - send on first ping
 *     responses:
 *       200:
 *         description: Progress tracked
 *       404:
 *         description: Podcast not found
 */
podCastRouter.post(
  '/podcasts/:id/track',
  protect,
  validate(trackPodcastSchema),
  trackPodcastProgress
);

export default podCastRouter