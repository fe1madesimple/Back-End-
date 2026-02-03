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


// src/modules/content/routes/content.routes.ts

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
  '/lessons/:id/track-video',
  protect,
  validate(trackVideoSchema),
  trackVideoProgress
);

/**
 * @swagger
 * /api/v1/lessons/{id}:
 *   get:
 *     summary: Get lesson details with video, content, and progress
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns complete lesson information including video URL, content, transcript, assets, and user's progress.
 *       
 *       **USED IN:** Video player page (main content area)
 *       
 *       **RESPONSE INCLUDES:**
 *       - Lesson content (markdown)
 *       - Video URL (Cloudinary)
 *       - Video duration (if available in DB, otherwise frontend gets it from video player)
 *       - Transcript text
 *       - PDF/audio assets attached to lesson
 *       - User's progress (videoWatchedSeconds for resume, completion status)
 *       - Module and subject context (for breadcrumb navigation)
 *       
 *       **SIDE EFFECTS:**
 *       This endpoint automatically updates `lastAccessedAt` timestamps for:
 *       - The lesson itself
 *       - The parent module
 *       - The parent subject
 *       
 *       This enables "Recently Viewed" and "Continue Learning" features.
 *       
 *       **FRONTEND IMPLEMENTATION:**
 *       
 *       When user opens a lesson, the frontend should:
 *       
 *       1. **Fetch lesson data:**
 *       ```javascript
 *       const response = await fetch('/api/v1/lessons/LESSON_ID', {
 *         headers: { 'Authorization': 'Bearer TOKEN' }
 *       });
 *       const { data } = await response.json();
 *       const lesson = data.lesson;
 *       ```
 *       
 *       2. **Display video with resume functionality:**
 *       ```javascript
 *       const videoPlayer = document.querySelector('video');
 *       videoPlayer.src = lesson.videoUrl;
 *       
 *       // Resume from saved position
 *       const savedPosition = lesson.progress.videoWatchedSeconds;
 *       if (savedPosition > 0) {
 *         videoPlayer.currentTime = savedPosition; // Jump to 7:30 if saved at 450s
 *       }
 *       ```
 *       
 *       3. **Display lesson content:**
 *       ```javascript
 *       // Render markdown content
 *       document.getElementById('lesson-content').innerHTML = 
 *         markdownToHtml(lesson.content);
 *       
 *       // Show transcript (collapsible/expandable)
 *       document.getElementById('transcript').textContent = lesson.transcript;
 *       ```
 *       
 *       4. **Display downloadable assets:**
 *       ```javascript
 *       lesson.assets.forEach(asset => {
 *         // Create download button for each PDF/audio file
 *         const button = document.createElement('a');
 *         button.href = asset.url;
 *         button.download = asset.title;
 *         button.textContent = `Download ${asset.title}`;
 *       });
 *       ```
 *       
 *       5. **Show completion status:**
 *       ```javascript
 *       if (lesson.progress.isCompleted) {
 *         showCompletionBadge(); // ✓ Completed
 *       } else {
 *         const percentWatched = (lesson.progress.videoWatchedSeconds / lesson.videoDuration) * 100;
 *         showProgressBar(percentWatched); // 52% watched
 *       }
 *       ```
 *       
 *       6. **Start tracking progress:**
 *       After fetching lesson, begin video and time tracking (see track-video and track-time endpoints).
 *       
 *       **VIDEO DURATION HANDLING:**
 *       - If `videoDuration` is null in response, frontend must get it from video player:
 *       ```javascript
 *       videoPlayer.addEventListener('loadedmetadata', () => {
 *         const duration = Math.floor(videoPlayer.duration);
 *         // Send this duration with first track-video ping
 *       });
 *       ```
 *       
 *       **BREADCRUMB NAVIGATION:**
 *       Use subject and module info from response:
 *       ```
 *       Criminal Law > Module 1: Foundations > Lesson 1: Characteristics
 *       ```
 *       
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
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lesson retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     lesson:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clx789abc
 *                         title:
 *                           type: string
 *                           example: "Lesson 1: Characteristics of a Crime"
 *                         slug:
 *                           type: string
 *                           example: characteristics-of-a-crime
 *                         content:
 *                           type: string
 *                           example: "# Characteristics of a Crime\n\n## Introduction\nA crime is conduct prohibited by law..."
 *                           description: Markdown-formatted lesson content
 *                         transcript:
 *                           type: string
 *                           example: "0:00 - Welcome to FE-1 Criminal Law essentials..."
 *                         videoUrl:
 *                           type: string
 *                           example: "https://res.cloudinary.com/demo/video/upload/v1234567890/fe1/criminal-law/lesson-1.mp4"
 *                         videoDuration:
 *                           type: integer
 *                           nullable: true
 *                           example: 863
 *                           description: Duration in seconds (may be null if not yet stored, frontend should get from video player)
 *                         order:
 *                           type: integer
 *                           example: 1
 *                         module:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: clx456def
 *                             name:
 *                               type: string
 *                               example: "Module 1: Foundations of Criminal Law"
 *                             slug:
 *                               type: string
 *                               example: foundations-of-criminal-law
 *                         subject:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: clx123ghi
 *                             name:
 *                               type: string
 *                               example: Criminal Law
 *                             slug:
 *                               type: string
 *                               example: criminal-law
 *                         progress:
 *                           type: object
 *                           properties:
 *                             isCompleted:
 *                               type: boolean
 *                               example: false
 *                             videoWatchedSeconds:
 *                               type: integer
 *                               example: 450
 *                               description: Last watched position (use to resume video)
 *                             timeSpentSeconds:
 *                               type: integer
 *                               example: 600
 *                               description: Total active time spent on this lesson
 *                             completedAt:
 *                               type: string
 *                               format: date-time
 *                               nullable: true
 *                               example: null
 *                         assets:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: clxjkl
 *                               type:
 *                                 type: string
 *                                 enum: [VIDEO, PDF, AUDIO, IMAGE]
 *                                 example: PDF
 *                               title:
 *                                 type: string
 *                                 example: "Characteristics of Crime - Summary Notes.pdf"
 *                               url:
 *                                 type: string
 *                                 example: "https://res.cloudinary.com/demo/image/upload/v1234567890/fe1/criminal-law/lesson-1-notes.pdf"
 *                               fileSize:
 *                                 type: integer
 *                                 example: 245678
 *                                 description: File size in bytes
 *                               mimeType:
 *                                 type: string
 *                                 example: application/pdf
 *       404:
 *         description: Lesson not found
 */
lessonRouter.get(
  '/lessons/:id',
  protect,
  getLessonById
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