import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { PodcastController } from '../controller/podcast.controller';

const router = Router();
const podcastController = new PodcastController();

/**
 * @swagger
 * tags:
 *   name: Podcasts
 *   description: FE-1 podcast episodes and study notes
 */

/**
 * @swagger
 * /api/v1/podcasts:
 *   get:
 *     summary: Get all podcasts
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *           example: Criminal Law
 *         description: Filter by subject name
 *       - in: query
 *         name: isBonus
 *         schema:
 *           type: boolean
 *         description: Filter bonus episodes only
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by episode title
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
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
 *                         $ref: '#/components/schemas/Podcast'
 *                     total:
 *                       type: integer
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.get('/', protect, podcastController.getAllPodcasts.bind(podcastController));


/**
 * @swagger
 * /api/v1/podcasts/{id}:
 *   get:
 *     summary: Get a single podcast by ID
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podcast retrieved successfully
 *       404:
 *         description: Podcast not found
 */
router.get('/:id', protect, podcastController.getPodcastById.bind(podcastController));

export default router;
