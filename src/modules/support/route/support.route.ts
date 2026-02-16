// src/modules/support/routes/support.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { scheduleOnboardingCall } from '../controller/support.controller';
scheduleOnboardingCall

const supportRouter = Router();


/**
 * @swagger
 * /api/v1/support/schedule-call:
 *   post:
 *     summary: Schedule onboarding call
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     description: Request 15-min onboarding call. Sends notification to support team.
 *     responses:
 *       200:
 *         description: Call request received
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
 *                     message:
 *                       type: string
 *                     emailSent:
 *                       type: boolean
 */
supportRouter.post('/schedule-call', protect, scheduleOnboardingCall);

export default supportRouter;