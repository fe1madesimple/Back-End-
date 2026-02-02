// src/modules/content/routes/content.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware'; 
import { getSubjects } from '../controller/subject.controller';


const subjectRouter = Router();

/**
 * @swagger
 * /api/v1/subjects:
 *   get:
 *     summary: Get all FE-1 subjects with user progress
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns all 8 FE-1 subjects with user's current progress.
 *
 *       **Used in:** Subjects page (Image 12, 18)
 *
 *       **Response includes:**
 *       - Subject details (name, color, icon)
 *       - Progress percentage (0-100%)
 *       - Status (NOT_STARTED, IN_PROGRESS, COMPLETED)
 *       - Total time spent on subject
 *       - Last accessed date
 *     responses:
 *       200:
 *         description: Subjects retrieved successfully
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
 *                   example: Subjects retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                             example: Criminal Law
 *                           slug:
 *                             type: string
 *                             example: criminal-law
 *                           order:
 *                             type: integer
 *                             example: 1
 *                           progress:
 *                             type: object
 *                             nullable: true
 *                             properties:
 *                               progressPercent:
 *                                 type: number
 *                                 example: 56
 *                               status:
 *                                 type: string
 *                                 enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
 *                               totalTimeSeconds:
 *                                 type: integer
 *                                 example: 29700
 *                               lastAccessedAt:
 *                                 type: string
 *                                 format: date-time
 */
subjectRouter.get('/subjects', protect, getSubjects);

export default subjectRouter;
