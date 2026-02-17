// src/modules/study-sessions/routes/study-session.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import {startSession, endSession, pingSession} from '../controller/study-sessions.controller';

const studySessionRouter = Router();


/**
 * @swagger
 * /api/v1/study-sessions/start:
 *   post:
 *     summary: Start study session
 *     tags: [Study Sessions]
 *     security:
 *       - bearerAuth: []
 *     description: Starts tracking user's active time. Called when app becomes visible. Creates or updates daily session record.
 *     responses:
 *       201:
 *         description: Session started
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
 *                     sessionId:
 *                       type: string
 *                       example: "session_abc123"
 *                     message:
 *                       type: string
 *                       example: "Session in progress"
 */
studySessionRouter.post('/start', protect, startSession);


studySessionRouter.post('/:sessionId/ping', protect, pingSession);


/**
 * @swagger
 * /api/v1/study-sessions/{sessionId}/end:
 *   post:
 *     summary: End study session
 *     tags: [Study Sessions]
 *     security:
 *       - bearerAuth: []
 *     description: Ends active session and updates daily/lifetime totals. Called when user switches tabs or closes app.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session ended
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Session not found
 *       403:
 *         description: Access denied
 */
studySessionRouter.post('/:sessionId/end', protect, endSession);


export default studySessionRouter;