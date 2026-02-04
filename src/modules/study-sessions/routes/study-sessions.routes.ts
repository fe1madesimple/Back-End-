// src/modules/study-sessions/routes/study-session.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import { startSessionSchema } from '../validator/study-sessions.validator';
import { startSession } from '../controller/study-sessions.controller';

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

export default studySessionRouter;
