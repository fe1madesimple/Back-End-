// src/modules/study-sessions/routes/study-session.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import { startSessionSchema } from '../validator/study-sessions.validator';
import { startSession, pingSession} from '../controller/study-sessions.controller';

const studySessionRouter = Router();

/**
 * @swagger
 * /api/v1/study-sessions/start:
 *   post:
 *     summary: Start a new study session
 *     tags: [Study Sessions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Starts a new focused study session for tracking study time and activity.
 *
 *       **USE CASE:**
 *       - User clicks "Start Study Session" button
 *       - User selects subject and optionally module
 *       - Session tracks time and activity
 *       - User can only have ONE active session at a time
 *
 *       **WHAT IS A STUDY SESSION:**
 *       A study session is a focused study period that:
 *       - Has a clear start and end time
 *       - Tracks what subject/module was studied
 *       - Records lessons completed and questions attempted
 *       - Earns points based on duration and activity
 *       - Can be used for analytics and gamification
 *
 *       **SESSION TYPES:**
 *       - `LESSON`: Watching video lessons
 *       - `PRACTICE`: Doing practice quizzes
 *       - `REVIEW`: Reviewing notes/past questions
 *
 *       **FRONTEND IMPLEMENTATION:**
 *       ```javascript
 *       // User clicks "Start Studying Criminal Law"
 *       async function startStudySession(subjectId, moduleId = null) {
 *         const response = await fetch('/api/v1/study-sessions/start', {
 *           method: 'POST',
 *           headers: { 'Content-Type': 'application/json' },
 *           body: JSON.stringify({
 *             subjectId,
 *             moduleId, // Optional
 *             sessionType: 'LESSON' // or 'PRACTICE' or 'REVIEW'
 *           })
 *         });
 *
 *         const { sessionId, startedAt, subject, module } = response.data;
 *
 *         // Store sessionId in localStorage for pinging
 *         localStorage.setItem('activeSessionId', sessionId);
 *
 *         // Display active session indicator
 *         showSessionTimer(startedAt);
 *         showSessionBanner(`Studying: ${subject.name}`);
 *
 *         // Start pinging every 30 seconds (Endpoint 22)
 *         startSessionPinging(sessionId);
 *       }
 *
 *       function showSessionTimer(startedAt) {
 *         const startTime = new Date(startedAt);
 *
 *         setInterval(() => {
 *           const now = new Date();
 *           const elapsed = Math.floor((now - startTime) / 1000);
 *           const hours = Math.floor(elapsed / 3600);
 *           const minutes = Math.floor((elapsed % 3600) / 60);
 *           const seconds = elapsed % 60;
 *
 *           document.getElementById('session-timer').textContent =
 *             `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
 *         }, 1000);
 *       }
 *
 *       function startSessionPinging(sessionId) {
 *         window.sessionPingInterval = setInterval(() => {
 *           fetch(`/api/v1/study-sessions/${sessionId}/ping`, {
 *             method: 'POST',
 *             body: JSON.stringify({ isActive: !document.hidden })
 *           });
 *         }, 30000); // Every 30 seconds
 *       }
 *       ```
 *
 *       **UI DISPLAY:**
 *       When session is active, show:
 *       - Session timer (00:45:32)
 *       - Subject/module name
 *       - "End Session" button
 *       - Session type badge
 *
 *       **RESTRICTIONS:**
 *       - User can only have ONE active session at a time
 *       - Must end current session before starting new one
 *       - If user tries to start while one is active, they get error
 *
 *       **ERROR HANDLING:**
 *       ```javascript
 *       try {
 *         await startStudySession(subjectId);
 *       } catch (error) {
 *         if (error.message.includes('active study session')) {
 *           showModal('You have an active session. End it first?', () => {
 *             endSession(); // Endpoint 23
 *           });
 *         }
 *       }
 *       ```
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subjectId
 *               - sessionType
 *             properties:
 *               subjectId:
 *                 type: string
 *                 example: clx123abc
 *               moduleId:
 *                 type: string
 *                 example: clx456def
 *                 description: Optional - if studying specific module
 *               sessionType:
 *                 type: string
 *                 enum: [LESSON, PRACTICE, REVIEW]
 *                 example: LESSON
 *     responses:
 *       201:
 *         description: Study session started successfully
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
 *                   example: Study session started
 *                 data:
 *                   type: object
 *                   properties:
 *                     sessionId:
 *                       type: string
 *                       example: clxses123
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-02-04T10:30:00Z"
 *                     subject:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clx123abc
 *                         name:
 *                           type: string
 *                           example: Criminal Law
 *                     module:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clx456def
 *                         name:
 *                           type: string
 *                           example: "Module 1: Foundations"
 *       400:
 *         description: User already has an active session
 *       404:
 *         description: Subject or module not found
 */
studySessionRouter.post('/start', protect, validate(startSessionSchema), startSession);



/**
 * @swagger
 * /api/v1/study-sessions/{sessionId}/ping:
 *   post:
 *     summary: Ping active study session to keep it alive
 *     tags: [Study Sessions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Sends a heartbeat ping to keep the study session alive and track whether user is actively studying.
 *       
 *       **USE CASE:**
 *       - Called automatically every 30 seconds by frontend
 *       - Tracks if user is actively on the page (not idle)
 *       - Used to calculate accurate study time
 *       - Prevents counting time when user is away
 *       
 *       **HOW IT WORKS:**
 *       - Frontend pings every 30 seconds while session is active
 *       - Sends `isActive: true` if tab is visible
 *       - Sends `isActive: false` if tab is hidden/minimized
 *       - Backend records last ping time
 *       - If no ping for >5 minutes, session considered abandoned
 *       
 *       **FRONTEND IMPLEMENTATION:**
 *       ```javascript
 *       let sessionId = localStorage.getItem('activeSessionId');
 *       let isTabActive = true;
 *       
 *       // Track tab visibility
 *       document.addEventListener('visibilitychange', () => {
 *         isTabActive = !document.hidden;
 *       });
 *       
 *       // Ping every 30 seconds
 *       const pingInterval = setInterval(async () => {
 *         if (sessionId) {
 *           try {
 *             await fetch(`/api/v1/study-sessions/${sessionId}/ping`, {
 *               method: 'POST',
 *               headers: { 'Content-Type': 'application/json' },
 *               body: JSON.stringify({ isActive: isTabActive })
 *             });
 *           } catch (error) {
 *             console.error('Session ping failed:', error);
 *             // If session not found, clear local storage
 *             if (error.status === 404) {
 *               localStorage.removeItem('activeSessionId');
 *               clearInterval(pingInterval);
 *             }
 *           }
 *         }
 *       }, 30000); // Every 30 seconds
 *       
 *       // Stop pinging when session ends
 *       function endSession() {
 *         clearInterval(pingInterval);
 *         // ... end session logic
 *       }
 *       
 *       // Use sendBeacon on page unload for reliability
 *       window.addEventListener('beforeunload', () => {
 *         if (sessionId) {
 *           const data = JSON.stringify({ isActive: false });
 *           const blob = new Blob([data], { type: 'application/json' });
 *           navigator.sendBeacon(
 *             `/api/v1/study-sessions/${sessionId}/ping`,
 *             blob
 *           );
 *         }
 *       });
 *       ```
 *       
 *       **WHY PINGING IS IMPORTANT:**
 *       - Prevents inflated study time (counting idle time)
 *       - Detects abandoned sessions (auto-end after 5 min idle)
 *       - Accurate analytics and leaderboards
 *       - Fair points/rewards calculation
 *       
 *       **INACTIVE DETECTION:**
 *       If no ping received for 5+ minutes:
 *       - Session considered abandoned
 *       - Can be auto-ended by cleanup job
 *       - Duration calculated up to last ping
 *       
 *       **RATE LIMITING:**
 *       - Frontend should ping every 30 seconds
 *       - Don't ping more frequently (unnecessary load)
 *       - Don't ping less frequently (inaccurate tracking)
 *       
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Study session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether user is actively on the page (tab visible)
 *     responses:
 *       200:
 *         description: Session ping recorded successfully
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
 *                   example: Session ping recorded
 *       404:
 *         description: Study session not found
 *       400:
 *         description: Session has already ended
 *       403:
 *         description: Access denied (not your session)
 */
studySessionRouter.post(
  '/:sessionId/ping',
  protect,
  pingSession
);

export default studySessionRouter;
