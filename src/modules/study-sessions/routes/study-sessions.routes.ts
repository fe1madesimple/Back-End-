// src/modules/study-sessions/routes/study-session.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import {startSession} from '../controller/study-sessions.controller';

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




export default studySessionRouter;