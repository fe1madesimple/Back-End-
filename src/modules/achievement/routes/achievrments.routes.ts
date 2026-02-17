// src/modules/achievements/routes/achievement.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getAllAchievements, getUserAchievements } from '../controller/achievements.controller';

const achievementRouter = Router();


/**
 * @swagger
 * /api/v1/achievements:
 *   get:
 *     summary: Get all achievements
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all 41 seeded achievements available in the platform.
 *     responses:
 *       200:
 *         description: Achievements retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: cmkrsa95u0000vqm8ezas0326
 *                       title:
 *                         type: string
 *                         example: First Lesson Completed
 *                       description:
 *                         type: string
 *                         example: You completed your first lesson!
 *                       type:
 *                         type: string
 *                         enum: [LESSON_MILESTONE, STREAK_MILESTONE, QUIZ_ACCURACY, EXAM_SIMULATION, SUBJECT_MASTERY, PRACTICE_MILESTONE, TIME_ACHIEVEMENT, IMPROVEMENT_ACHIEVEMENT, VIDEO_ENGAGEMENT, CASE_LAW_MASTERY, COMBO_ACHIEVEMENT]
 *                         example: LESSON_MILESTONE
 *                       condition:
 *                         type: object
 *                         example: { "lessonsCompleted": 1 }
 *                       icon:
 *                         type: string
 *                         example: 🎯
 *       401:
 *         description: Unauthorized
 */
achievementRouter.get('/', protect, getAllAchievements);




/**
 * @swagger
 * /api/v1/achievements/unlocked:
 *   get:
 *     summary: Get current user's unlocked achievements
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all achievements the current user has unlocked, ordered by most recently unlocked.
 *     responses:
 *       200:
 *         description: User achievements retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: cmkrsa95u0001vqm8ezas0327
 *                       unlockedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-02-17T14:54:27.006Z
 *                       achievement:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: cmkrsa95u0000vqm8ezas0326
 *                           title:
 *                             type: string
 *                             example: First Lesson Completed
 *                           description:
 *                             type: string
 *                             example: You completed your first lesson!
 *                           type:
 *                             type: string
 *                             example: LESSON_MILESTONE
 *                           icon:
 *                             type: string
 *                             example: 🎯
 *       401:
 *         description: Unauthorized
 */
achievementRouter.get('/unlocked', protect, getUserAchievements);

export default achievementRouter;
