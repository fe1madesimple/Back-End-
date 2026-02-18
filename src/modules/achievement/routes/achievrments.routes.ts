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
 * /api/v1/achievements/user:
 *   get:
 *     summary: Get all achievements with user's unlock status
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     description: Returns all available achievements with indication of whether the current user has unlocked them. Shows both locked and unlocked achievements with unlock timestamps where applicable.
 *     responses:
 *       200:
 *         description: Achievements retrieved successfully
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
 *                   example: User achievements retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: cmlqtnn67000fvqhonsu1ejlu
 *                       title:
 *                         type: string
 *                         example: First Essay Submitted
 *                       description:
 *                         type: string
 *                         example: You've taken your first step!
 *                       icon:
 *                         type: string
 *                         example: 📝
 *                       type:
 *                         type: string
 *                         enum: [LESSON_MILESTONE, STREAK_MILESTONE, QUIZ_ACCURACY, EXAM_SIMULATION, SUBJECT_MASTERY, PRACTICE_MILESTONE, TIME_ACHIEVEMENT, IMPROVEMENT_ACHIEVEMENT, VIDEO_ENGAGEMENT, CASE_LAW_MASTERY, COMBO_ACHIEVEMENT]
 *                         example: PRACTICE_MILESTONE
 *                       isUnlocked:
 *                         type: boolean
 *                         example: true
 *                         description: Whether the user has unlocked this achievement
 *                       unlockedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: 2026-02-18T13:46:32.589Z
 *                         description: Timestamp when the achievement was unlocked. Null if locked.
 *       401:
 *         description: Unauthorized
 */
achievementRouter.get('/user', protect, getUserAchievements);

export default achievementRouter;
