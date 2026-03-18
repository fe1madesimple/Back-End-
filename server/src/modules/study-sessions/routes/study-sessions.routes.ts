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


/**
 * @swagger
 * /api/v1/study-sessions/{sessionId}/ping:
 *   post:
 *     summary: Ping active study session
 *     tags: [Study Sessions]
 *     security:
 *       - bearerAuth: []
 *     description: Records incremental study time for an active session. Called every 30 seconds by the frontend to prevent data loss if the browser crashes. Updates todayTotalSeconds and lifetimeTotalSeconds, then resets currentSessionStart to now for the next ping window.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *           example: cmkrsa95u0000vqm8ezas0326
 *         description: ID of the active study session
 *     responses:
 *       200:
 *         description: Ping recorded successfully
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
 *                   example: Ping recorded
 *                 data:
 *                   type: null
 *       404:
 *         description: Study session not found
 *       403:
 *         description: Access denied - session does not belong to user
 */
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