import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getModuleQuestions } from '../controller/question.controller';
import { attemptQuestionSchema, } from '../validators/question.validator';
import {  } from '../controller/question.controller';
import { validate } from '@/shared/middleware/validation';
import { attemptMCQ } from '../controller/question.controller';

const questionRouter = Router();


/**
 * @swagger
 * /api/v1/practice/questions/{id}/attempt:
 *   post:
 *     summary: Submit answer to question
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answer
 *               - sessionId
 *             properties:
 *               answer:
 *                 type: string
 *                 example: "A"
 *               sessionId:
 *                 type: string
 *               timeTaken:
 *                 type: integer
 *                 example: 18
 *     responses:
 *       200:
 *         description: Answer submitted
 */
questionRouter.post('/:id/attempt', protect, validate(attemptQuestionSchema), attemptMCQ);

/**
 * @swagger
 * /api/v1/questions/modules/{moduleId}:
 *   get:
 *     summary: Get module MCQ questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns all MCQ questions for a module quiz.
 *
 *       **Used in:** MCQ quiz page (Image feinreone, feinretwo, feinrethree)
 *
 *       **Flow:**
 *       1. User finishes watching all lessons in module
 *       2. User clicks "Take Quiz" or "Complete All Module Questions"
 *       3. Frontend fetches questions from this endpoint
 *       4. Frontend displays questions one by one
 *       5. User submits each answer via POST /questions/:id/attempt
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           text:
 *                             type: string
 *                             example: Which of the following best describes recklessness?
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["A: Awareness of risk...", "B: Mistake in judgment...", "C: Objective test...", "D: Comprehensive failure..."]
 *                           points:
 *                             type: integer
 *                             example: 1
 *                     total:
 *                       type: integer
 *                       example: 5
 */
questionRouter.get('/modules/:moduleId', protect, getModuleQuestions);



export default questionRouter;
