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


/**
 * @swagger
 * /api/v1/subjects/{subjectId}/modules:
 *   get:
 *     summary: Get all modules in a subject
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns all modules within a subject with user's progress.
 *       
 *       **Used in:** Module list page (Image 15 - showing Module 1-8)
 *       
 *       **Response includes:**
 *       - Module details
 *       - Total lessons vs completed lessons (e.g., "5/5", "0/7")
 *       - Progress percentage
 *       - Status badges (Completed, In Progress, Not Started)
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
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
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     modules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                             example: Module 1: Foundations of Criminal Law
 *                           totalLessons:
 *                             type: integer
 *                             example: 5
 *                           completedLessons:
 *                             type: integer
 *                             example: 5
 *                           progressPercent:
 *                             type: number
 *                             example: 100
 *                           status:
 *                             type: string
 *                             enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
 *                             example: COMPLETED
 */
subjectRouter.get('/subjects/:subjectId/modules', protect, getModulesBySubject);

export default subjectRouter;  