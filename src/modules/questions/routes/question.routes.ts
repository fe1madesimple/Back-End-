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
 *     summary: Submit answer to MCQ question
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: Submit user's answer to a multiple choice question. The answer is immediately graded and the quiz session is updated with the result. Time tracking is mandatory for calculating average time per question in results.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answer
 *               - sessionId
 *               - timeTaken
 *             properties:
 *               answer:
 *                 type: string
 *                 example: "A"
 *                 description: User's selected answer (A, B, C, or D)
 *               sessionId:
 *                 type: string
 *                 example: "session_abc123"
 *                 description: Quiz session ID received from quiz start endpoint
 *               timeTaken:
 *                 type: integer
 *                 example: 18
 *                 description: Time taken to answer in seconds (required)
 *     responses:
 *       200:
 *         description: Answer submitted successfully
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
 *                   example: Answer submitted
 *                 data:
 *                   type: object
 *                   properties:
 *                     attemptId:
 *                       type: string
 *                       example: "attempt_xyz789"
 *                     isCorrect:
 *                       type: boolean
 *                       example: true
 *                     pointsEarned:
 *                       type: integer
 *                       example: 10
 *                     correctAnswer:
 *                       type: string
 *                       example: "B"
 *                       description: The correct answer to the question
 *                     explanation:
 *                       type: string
 *                       nullable: true
 *                       example: "Mens rea refers to the guilty mind or criminal intent..."
 *       404:
 *         description: Question not found
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
