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
 * /api/v1/podcasts/stats:
 *   get:
 *     summary: Get user's overall podcast listening stats
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns totalStarted, totalCompleted, totalInProgress, totalListenedHours
 */
router.get('/stats', protect, podcastController.getPodcastStats.bind(podcastController));




/**
 * @swagger
 * /api/v1/podcasts:
 *   get:
 *     summary: Get all podcasts (paginated)
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *           example: Criminal Law
 *         description: Filter by subject name (case insensitive)
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
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 269
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 50
 *                         totalPages:
 *                           type: integer
 *                           example: 6
 *                     subjects:
 *                       type: array
 *                       description: All available subject names for filter pills
 *                       items:
 *                         type: string
 *                       example: ["Company Law", "Contract Law", "Criminal Law"]
 */
router.get('/', protect, podcastController.getAllPodcasts.bind(podcastController));

/**
 * @swagger
 * /api/v1/podcasts/{id}/progress:
 *   post:
 *     summary: Track podcast listen progress
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
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
 *             required: [listenedSeconds]
 *             properties:
 *               listenedSeconds:
 *                 type: integer
 *                 description: Total seconds listened so far
 *                 example: 240
 *     responses:
 *       200:
 *         description: Progress tracked. isCompleted becomes true at 90% listened.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     podcastId:
 *                       type: string
 *                     listenedSeconds:
 *                       type: integer
 *                     isCompleted:
 *                       type: boolean
 *                     completedAt:
 *                       type: string
 *                       nullable: true
 *                     percentageListened:
 *                       type: integer
 *                       example: 45
 */
router.post('/:id/progress', protect, podcastController.trackProgress.bind(podcastController));

/**
 * @swagger
 * /api/v1/podcasts/{id}/progress:
 *   get:
 *     summary: Get user's progress on a specific podcast
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
 *         description: Returns listenedSeconds, isCompleted, percentageListened
 */
router.get('/:id/progress', protect, podcastController.getProgress.bind(podcastController));

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