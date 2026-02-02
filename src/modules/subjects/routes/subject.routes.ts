// src/modules/content/routes/content.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware'; 
import { getSubjects, getSubjectById} from '../controller/subject.controller';


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


/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   get:
 *     summary: Get subject details with modules and stats
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns detailed subject information including module list and statistics.
 *       
 *       **Used in:** Subject detail page (Image 16 - Criminal Law Focus Zone)
 *       
 *       **Response includes:**
 *       - Subject info and progress
 *       - List of modules with completion status
 *       - Statistics: total/completed modules, lessons, average quiz score
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject retrieved successfully
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
 *                     subject:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                           example: Criminal Law
 *                         progress:
 *                           type: object
 *                           properties:
 *                             progressPercent:
 *                               type: number
 *                               example: 56
 *                             status:
 *                               type: string
 *                             totalTimeSeconds:
 *                               type: integer
 *                               example: 29700
 *                         modules:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                                 example: Module 1: Foundations
 *                               lessonsCount:
 *                                 type: integer
 *                                 example: 5
 *                               completedLessons:
 *                                 type: integer
 *                                 example: 5
 *                               status:
 *                                 type: string
 *                                 example: COMPLETED
 *                         stats:
 *                           type: object
 *                           properties:
 *                             totalModules:
 *                               type: integer
 *                               example: 8
 *                             completedModules:
 *                               type: integer
 *                               example: 4
 *                             totalLessons:
 *                               type: integer
 *                               example: 32
 *                             completedLessons:
 *                               type: integer
 *                               example: 18
 *                             averageQuizScore:
 *                               type: integer
 *                               example: 72
 *       404:
 *         description: Subject not found
 */
subjectRouter.get('/subjects/:id', protect, getSubjectById);

export default subjectRouter;