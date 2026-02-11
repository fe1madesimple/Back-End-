import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getLessonById, trackVideoProgress, trackTimeSpent } from '../controller/lesson.controller';
import { trackVideoSchema, trackTimeSchema } from '../validator/lesson.validator';
import { validate } from '@/shared/middleware/validation';

const lessonRouter = Router();

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
 *
 *       **FRONTEND IMPLEMENTATION:**
 *
 *       Frontend must get video duration and send it with tracking data.
 *
 *       ```javascript
 *       // 1. Get video element and lesson data
 *       const videoPlayer = document.querySelector('video');
 *       const lessonId = 'lesson_id_here';
 *       let videoDuration = null;
 *
 *       // 2. Get duration when video loads
 *       videoPlayer.addEventListener('loadedmetadata', () => {
 *         videoDuration = Math.floor(videoPlayer.duration); // Duration in seconds
 *       });
 *
 *       // 3. On video load, resume from saved position
 *       fetch(`/api/v1/lessons/${lessonId}`)
 *         .then(res => res.json())
 *         .then(data => {
 *           const savedPosition = data.data.lesson.progress.videoWatchedSeconds;
 *           if (savedPosition > 0) {
 *             videoPlayer.currentTime = savedPosition; // Jump to saved position
 *           }
 *         });
 *
 *       // 4. Track progress every 10 seconds while playing
 *       let trackingInterval;
 *
 *       videoPlayer.addEventListener('play', () => {
 *         trackingInterval = setInterval(() => {
 *           if (videoPlayer.paused) return; // Skip if paused
 *
 *           const currentTime = Math.floor(videoPlayer.currentTime);
 *
 *           fetch(`/api/v1/lessons/${lessonId}/track-video`, {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify({
 *               currentTime,
 *               videoDuration // Backend saves this on first ping
 *             })
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
 *           headers: { 'Content-Type': 'application/json' },
 *           body: JSON.stringify({ currentTime, videoDuration })
 *         });
 *       });
 *
 *       // 5. Send final position when user leaves page
 *       window.addEventListener('beforeunload', () => {
 *         const currentTime = Math.floor(videoPlayer.currentTime);
 *
 *         // Use sendBeacon for reliable delivery on page exit
 *         const data = JSON.stringify({ currentTime, videoDuration });
 *         const blob = new Blob([data], { type: 'application/json' });
 *         navigator.sendBeacon(
 *           `/api/v1/lessons/${lessonId}/track-video`,
 *           blob
 *         );
 *       });
 *
 *       // 6. IMPORTANT: Handle tab visibility changes
 *       // Video continues playing when tab hidden, so keep tracking
 *       document.addEventListener('visibilitychange', () => {
 *         if (document.hidden) {
 *           // Tab hidden - tracking continues (video still playing)
 *           console.log('Tab hidden but tracking continues');
 *         } else {
 *           // Tab visible again
 *           console.log('Tab visible again');
 *         }
 *       });
 *       ```
 *
 *       **HOW IT WORKS:**
 *
 *       1. **Video loads** → Frontend gets duration from `video.duration`
 *       2. **Every 10 seconds** → Frontend sends current position + duration
 *       3. **Backend checks** → If position >= 90% of duration → Mark complete
 *       4. **Progress cascades** → Lesson → Module → Subject (all automatic)
 *       5. **User returns** → Backend returns saved position, video resumes from there
 *
 *       **COMPLETION CALCULATION:**
 *       - Video duration: 863 seconds (14:23)
 *       - User watched: 776 seconds (12:56)
 *       - Percentage: 776 / 863 = 90%
 *       - Status: COMPLETED ✅
 *
 *       **WHAT GETS UPDATED:**
 *       - `UserLessonProgress.videoWatchedSeconds` = current position
 *       - `UserLessonProgress.isCompleted` = true (if >= 90%)
 *       - `UserModuleProgress.progressPercent` = recalculated
 *       - `UserModuleProgress.completedLessons` = incremented
 *       - `UserSubjectProgress.progressPercent` = recalculated
 *
 *       **EDGE CASES HANDLED:**
 *       - Video paused → Send final position immediately
 *       - User leaves page → sendBeacon ensures delivery
 *       - Tab hidden → Tracking continues (video still playing)
 *       - No duration provided → Uses stored duration from DB (if exists)
 *       - First ping with duration → Backend saves duration for future use
 *
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
lessonRouter.get('/lessons/:id', protect, getLessonById);

export default lessonRouter;
