import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getLessonById, trackVideoProgress, trackTimeSpent,getModulesBySubject } from '../controller/lesson.controller';
import { trackVideoSchema, trackTimeSchema } from '../validator/lesson.validator';
import { validate } from '@/shared/middleware/validation';

const lessonRouter = Router();



/**
 * @swagger
 * /api/v1/lessons/{subjectId}:
 *   get:
 *     summary: Get all modules with lessons for a subject
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all modules for a subject with lesson list, progress status, and completion count. Used for module list screen showing expandable/collapsible modules with lesson titles.
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Modules retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Modules retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     modules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                             example: "Module 1: Foundations of Criminal Law"
 *                           slug:
 *                             type: string
 *                           order:
 *                             type: integer
 *                           status:
 *                             type: string
 *                             enum: [COMPLETED, IN_PROGRESS, NOT_STARTED]
 *                             example: COMPLETED
 *                           progress:
 *                             type: object
 *                             properties:
 *                               completedLessons:
 *                                 type: integer
 *                                 example: 5
 *                               totalLessons:
 *                                 type: integer
 *                                 example: 5
 *                           lessons:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                 title:
 *                                   type: string
 *                                   example: "Lesson 1: Characteristics of a Crime"
 *                                 order:
 *                                   type: integer
 *       404:
 *         description: Subject not found
 */
lessonRouter.get('/modules/:subjectId', protect, getModulesBySubject);



/**
 * @swagger
 * /api/v1/lessons/{id}/track-video:
 *   post:
 *     summary: Track video watch progress
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Updates user's video watch position. Called by frontend video player.
 *
 *       **AUTO-COMPLETION:**
 *       - Video watched >= 90% → Lesson automatically marked complete
 *       - Module progress recalculated
 *       - Subject progress updated
 *       - No "Mark as Complete" button needed
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson ID
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
 *                 example: 450
 *                 description: Current video position in seconds
 *               videoDuration:
 *                 type: integer
 *                 example: 863
 *                 description: |
 *                   Total video duration in seconds (optional).
 *                   Frontend should send this on first ping.
 *                   Backend will save it for future calculations.
 *     responses:
 *       200:
 *         description: Progress tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Video progress tracked
 *       404:
 *         description: Lesson not found
 */
lessonRouter.post(
  '/:id/track-video',
  protect,
  validate(trackVideoSchema),
  trackVideoProgress
);


/**
 * @swagger
 * /api/v1/lessons/{id}/track-time:
 *   post:
 *     summary: Track time spent on lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Tracks time user spends on lesson (watching video, reading content).
 *
 *
 *       **This contributes to:**
 *       - Subject total time (Image 16: "8h 15m")
 *       - Dashboard daily time (Image 13: "2 Hours time spent today")
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
 *               - seconds
 *             properties:
 *               seconds:
 *                 type: integer
 *                 example: 30
 *                 description: Seconds elapsed since last ping (usually 30)
 *     responses:
 *       200:
 *         description: Time tracked successfully
 */
lessonRouter.post('/:id/track-time', protect, validate(trackTimeSchema), trackTimeSpent);



  /**
   * @swagger
   * /api/v1/lessons/{id}:
   *   get:
   *     summary: Get lesson details with sidebar navigation
   *     tags: [Lessons]
   *     security:
   *       - bearerAuth: []
   *     description: Returns complete lesson details including video URL, content (markdown), transcript, user progress, and all modules/lessons for sidebar navigation.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Lesson ID
   *     responses:
   *       200:
   *         description: Lesson retrieved successfully
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
   *                     id:
   *                       type: string
   *                     title:
   *                       type: string
   *                       example: "Lesson 1: Characteristics of a Crime"
   *                     slug:
   *                       type: string
   *                     content:
   *                       type: string
   *                       nullable: true
   *                       description: Lesson content in markdown format
   *                     videoUrl:
   *                       type: string
   *                       nullable: true
   *                     videoDuration:
   *                       type: integer
   *                       nullable: true
   *                     transcript:
   *                       type: string
   *                       nullable: true
   *                     order:
   *                       type: integer
   *                     module:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         name:
   *                           type: string
   *                         subjectId:
   *                           type: string
   *                         subjectName:
   *                           type: string
   *                     userProgress:
   *                       type: object
   *                       nullable: true
   *                       properties:
   *                         isCompleted:
   *                           type: boolean
   *                         videoWatchedSeconds:
   *                           type: integer
   *                         timeSpentSeconds:
   *                           type: integer
   *                         lastAccessedAt:
   *                           type: string
   *                           format: date-time
   *                           nullable: true
   *                     subjectModules:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: string
   *                           name:
   *                             type: string
   *                           order:
   *                             type: integer
   *                           lessons:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: string
   *                                 title:
   *                                   type: string
   *                                 order:
   *                                   type: integer
   */
  lessonRouter.get('/:id', protect, getLessonById);

export default lessonRouter;
