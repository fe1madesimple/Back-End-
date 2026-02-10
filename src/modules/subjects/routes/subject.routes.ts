// src/modules/content/routes/content.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware'; 
import { getSubjects, getSubjectById, getModulesBySubject} from '../controller/subject.controller';


const subjectRouter = Router();



/**
 * @swagger
 * /api/v1/subjects:
 *   get:
 *     summary: Get all FE-1 subjects with user progress
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all 8 FE-1 subjects with user's current progress. Response includes subject details (name, color, icon), progress percentage (0-100%), status (NOT_STARTED, IN_PROGRESS, COMPLETED), total time spent on subject, and last accessed date.
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
 *                             example: clx123abc
 *                           name:
 *                             type: string
 *                             example: Criminal Law
 *                           slug:
 *                             type: string
 *                             example: criminal-law
 *                           description:
 *                             type: string
 *                             example: Study of crimes, defenses, and criminal procedure in Irish law
 *                           icon:
 *                             type: string
 *                             nullable: true
 *                             example: gavel
 *                           color:
 *                             type: string
 *                             example: "#FF1493"
 *                             description: Subject brand color (hex code)
 *                           progressColor:
 *                             type: string
 *                             example: "#FF1493"
 *                             description: Progress bar color (hex code)
 *                           order:
 *                             type: integer
 *                             example: 1
 *                           progress:
 *                             type: object
 *                             properties:
 *                               progressPercent:
 *                                 type: number
 *                                 example: 56
 *                                 description: Progress percentage (0-100). Returns 0 if no progress.
 *                               status:
 *                                 type: string
 *                                 enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
 *                                 example: IN_PROGRESS
 *                               totalTimeSeconds:
 *                                 type: integer
 *                                 example: 29700
 *                                 description: Total time spent in seconds. Returns 0 if no progress.
 *                               lastAccessedAt:
 *                                 type: string
 *                                 format: date-time
 *                                 nullable: true
 *                                 example: "2026-02-10T14:30:00Z"
 */
subjectRouter.get('/', protect, getSubjects);


/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   get:
 *     summary: Get subject details with modules and stats
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     description: Returns subject information, progress, module list, and statistics.
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
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Subject retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                       example: Criminal Law
 *                     slug:
 *                       type: string
 *                     description:
 *                       type: string
 *                     color:
 *                       type: string
 *                       example: "#FF1493"
 *                     progressColor:
 *                       type: string
 *                       example: "#FF1493"
 *                     progress:
 *                       type: object
 *                       properties:
 *                         progressPercent:
 *                           type: number
 *                           example: 56
 *                         status:
 *                           type: string
 *                           example: IN_PROGRESS
 *                         totalTimeSeconds:
 *                           type: integer
 *                           example: 29340
 *                         lastAccessedAt:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                     modules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           slug:
 *                             type: string
 *                           order:
 *                             type: integer
 *                           lessonsCount:
 *                             type: integer
 *                           completedLessons:
 *                             type: integer
 *                           status:
 *                             type: string
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalModules:
 *                           type: integer
 *                           example: 12
 *                         completedModules:
 *                           type: integer
 *                           example: 4
 *                         totalLessons:
 *                           type: integer
 *                           example: 48
 *                         completedLessons:
 *                           type: integer
 *                           example: 22
 *                         averageQuizScore:
 *                           type: integer
 *                           example: 72
 *       404:
 *         description: Subject not found
 */
subjectRouter.get('/:id', protect, getSubjectById);



/**
 * @swagger
 * /api/v1/subjects/{subjectId}/modules:
 *   get:
 *     summary: Get all modules in a subject
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all modules within a subject with user progress tracking. Includes module details, total lessons vs completed lessons, progress percentage, and status badges (Completed, In Progress, Not Started).
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Modules retrieved successfully
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
 *                   example: Modules retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: mod_123
 *                       name:
 *                         type: string
 *                         example: Module 1: Foundations of Criminal Law
 *                       slug:
 *                         type: string
 *                         example: foundations
 *                       description:
 *                         type: string
 *                         example: Core principles and elements of criminal liability
 *                       order:
 *                         type: integer
 *                         example: 1
 *                       totalLessons:
 *                         type: integer
 *                         example: 5
 *                       completedLessons:
 *                         type: integer
 *                         example: 3
 *                       progressPercent:
 *                         type: number
 *                         example: 60
 *                         description: Progress percentage (0-100). Returns 0 if no progress.
 *                       status:
 *                         type: string
 *                         enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
 *                         example: IN_PROGRESS
 */
subjectRouter.get('/:subjectId/modules', protect, getModulesBySubject);

export default subjectRouter;  