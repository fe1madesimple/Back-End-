import { Router } from "express"; 
import { protect } from "@/shared/middleware/auth.middleware";
import { getLessonById, trackVideoProgress, trackTimeSpent } from "../controller/lesson.controller";
import { trackVideoSchema, trackTimeSchema } from "../validator/lesson.validator";
import { validate } from "@/shared/middleware/validation";

const lessonRouter = Router();

/**
 * @swagger
 * /api/v1/lessons/{id}:
 *   get:
 *     summary: Get lesson content and video
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns complete lesson details including video URL, transcript, and content.
 *       
 *       **Used in:** Lesson video player (Image 14 - main content area)
 *       
 *       **Response includes:**
 *       - Cloudinary video URL
 *       - Video duration (for progress calculation)
 *       - Transcript text
 *       - Lesson content (markdown)
 *       - User's watch progress (resume from where left off)
 *       - Associated PDFs/assets
 *       
 *       **Also updates:**
 *       - Lesson last accessed timestamp
 *       - Module last accessed timestamp
 *       - Subject last accessed timestamp
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     lesson:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         title:
 *                           type: string
 *                           example: Lesson 1: Characteristics of a Crime
 *                         content:
 *                           type: string
 *                           description: Markdown content
 *                         transcript:
 *                           type: string
 *                         videoUrl:
 *                           type: string
 *                           example: https://res.cloudinary.com/.../lesson-1.mp4
 *                         videoDuration:
 *                           type: integer
 *                           example: 863
 *                           description: Duration in seconds
 *                         progress:
 *                           type: object
 *                           properties:
 *                             isCompleted:
 *                               type: boolean
 *                             videoWatchedSeconds:
 *                               type: integer
 *                               example: 450
 *                               description: Resume from this position
 *                             timeSpentSeconds:
 *                               type: integer
 *                         assets:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               type:
 *                                 type: string
 *                                 example: PDF
 *                               title:
 *                                 type: string
 *                               url:
 *                                 type: string
 */
lessonRouter.get('/lessons/:id', protect, getLessonById);


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
 *       **FRONTEND IMPLEMENTATION:**
 *       
 *       ```javascript
 *       // 1. Get video element and lesson data
 *       const videoPlayer = document.querySelector('video');
 *       const lessonId = 'lesson_id_here';
 *       const videoDuration = videoPlayer.duration; // e.g., 863 seconds
 *       
 *       // 2. On video load, resume from saved position
 *       fetch(`/api/v1/lessons/${lessonId}`)
 *         .then(res => res.json())
 *         .then(data => {
 *           const savedPosition = data.data.lesson.progress.videoWatchedSeconds;
 *           if (savedPosition > 0) {
 *             videoPlayer.currentTime = savedPosition; // Jump to saved position
 *           }
 *         });
 *       
 *       // 3. Track progress every 10 seconds while playing
 *       let trackingInterval;
 *       
 *       videoPlayer.addEventListener('play', () => {
 *         trackingInterval = setInterval(() => {
 *           const currentTime = Math.floor(videoPlayer.currentTime);
 *           
 *           fetch(`/api/v1/lessons/${lessonId}/track-video`, {
 *             method: 'POST',
 *             headers: { 'Content-Type': 'application/json' },
 *             body: JSON.stringify({ currentTime })
 *           });
 *         }, 10000); // Every 10 seconds
 *       });
 *       
 *       videoPlayer.addEventListener('pause', () => {
 *         clearInterval(trackingInterval);
 *         
 *         // Send final position on pause
 *         const currentTime = Math.floor(videoPlayer.currentTime);
 *         fetch(`/api/v1/lessons/${lessonId}/track-video`, {
 *           method: 'POST',
 *           body: JSON.stringify({ currentTime })
 *         });
 *       });
 *       
 *       // 4. Send final position when user leaves page
 *       window.addEventListener('beforeunload', () => {
 *         const currentTime = Math.floor(videoPlayer.currentTime);
 *         
 *         // Use sendBeacon for reliable delivery
 *         navigator.sendBeacon(
 *           `/api/v1/lessons/${lessonId}/track-video`,
 *           JSON.stringify({ currentTime })
 *         );
 *       });
 *       ```
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
 *     responses:
 *       200:
 *         description: Progress tracked successfully
 */
lessonRouter.post(
  '/lessons/:id/track-video',
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
 *       **FRONTEND IMPLEMENTATION:**
 *       
 *       ```javascript
 *       let timeCounter = 0;
 *       let isActive = true;
 *       
 *       // Start timer when lesson loads
 *       const timingInterval = setInterval(() => {
 *         if (isActive) {
 *           timeCounter += 30; // 30 seconds elapsed
 *           
 *           fetch(`/api/v1/lessons/${lessonId}/track-time`, {
 *             method: 'POST',
 *             body: JSON.stringify({ seconds: 30 })
 *           });
 *         }
 *       }, 30000); // Every 30 seconds
 *       
 *       // Pause timer when tab loses focus (Page Visibility API)
 *       document.addEventListener('visibilitychange', () => {
 *         if (document.hidden) {
 *           isActive = false; // Tab inactive, pause timer
 *         } else {
 *           isActive = true; // Tab active, resume timer
 *         }
 *       });
 *       
 *       // Clean up when user leaves
 *       window.addEventListener('beforeunload', () => {
 *         clearInterval(timingInterval);
 *       });
 *       ```
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
lessonRouter.post(
  '/lessons/:id/track-time',
  protect,
  validate(trackTimeSchema),
  trackTimeSpent
);