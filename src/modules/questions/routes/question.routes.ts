import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getModuleQuestions } from '../controller/question.controller';
import { attemptQuestionSchema, submitEssaySchema } from '../validators/question.validator';
import { attemptQuestion, submitEssay } from '../controller/question.controller';
import { validate } from '@/shared/middleware/validation';

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
questionRouter.post('/:id/attempt', protect, validate(attemptQuestionSchema), attemptQuestion);

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

/**
 * @swagger
 * /api/v1/questions/essays/{id}/submit:
 *   post:
 *     summary: Submit essay for AI grading
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Submit essay answer for comprehensive AI grading via Claude API.
 *
 *       **Used in:** Essay practice pages (Image feinseven, feineight)
 *
 *       **Grading Process:**
 *       1. User writes essay in text area
 *       2. User clicks "Submit Answer"
 *       3. Backend sends essay + question to Claude API
 *       4. Claude grades using FE-1 examiner criteria
 *       5. Returns detailed score breakdown and feedback
 *
 *       **Response includes:**
 *       - Overall score (0-100)
 *       - Breakdown by 5 criteria
 *       - Band classification (e.g., "70-79% Upper Second")
 *       - App pass status (>= 80%)
 *       - Detailed written feedback
 *       - List of strengths
 *       - List of improvements needed
 *       - Next steps to improve
 *
 *       **AI Model:** Claude Sonnet 4 (claude-sonnet-4-20250514)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Essay question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answer
 *             properties:
 *               answer:
 *                 type: string
 *                 minLength: 50
 *                 example: Dr Murphy owes a duty of care to Michael under the principle established in Donoghue v Stevenson...
 *                 description: User's essay answer (minimum 50 characters)
 *               timeTakenSeconds:
 *                 type: integer
 *                 example: 1800
 *                 description: Time taken to write essay (optional, for analytics)
 *     responses:
 *       200:
 *         description: Essay graded successfully
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
 *                     result:
 *                       type: object
 *                       properties:
 *                         attemptId:
 *                           type: string
 *                         overallScore:
 *                           type: number
 *                           example: 75
 *                         breakdown:
 *                           type: object
 *                           properties:
 *                             knowledge:
 *                               type: number
 *                               example: 24
 *                               description: Out of 30
 *                             authorities:
 *                               type: number
 *                               example: 18
 *                               description: Out of 25
 *                             application:
 *                               type: number
 *                               example: 20
 *                               description: Out of 25
 *                             analysis:
 *                               type: number
 *                               example: 10
 *                               description: Out of 15
 *                             structure:
 *                               type: number
 *                               example: 3
 *                               description: Out of 5
 *                         band:
 *                           type: string
 *                           example: 70-79% Upper Second
 *                         appPass:
 *                           type: boolean
 *                           example: false
 *                           description: True if score >= 80%
 *                         feedback:
 *                           type: string
 *                           example: Your answer demonstrates solid knowledge of medical negligence...
 *                         strengths:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Clear IRAC structure", "Good use of Donoghue v Stevenson"]
 *                         improvements:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Add more recent case law", "Deeper critical analysis needed"]
 *                         nextSteps:
 *                           type: string
 *                           example: To reach 80%+ app pass, focus on expanding your critical evaluation...
 */
questionRouter.post('/essays/:id/submit', protect, validate(submitEssaySchema), submitEssay);

export default questionRouter;
