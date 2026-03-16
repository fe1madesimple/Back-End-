// src/modules/practise/routes/practise.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import {
  getPastQuestions,
  startPractice,
  getPracticeQuestion,
  submitPractice,
  getPracticeResults,
  getPracticeAttemptReview,
  failSimulation,
  getEssayQuestions,
} from '../controller/practise.controller';
import {
  pastQuestionsQuerySchema,
  startPracticeSchema,
  getPracticeQuestionSchema,
  submitPracticeSchema,
  sessionIdParamSchema,
  attemptReviewSchema,
} from '../validators/practise.validators';
import { gate, gateLesson } from '@/shared/middleware/gate.middleware';

const practiceRouter = Router();

/**
 * @swagger
 * /api/v1/practice/past-questions:
 *   get:
 *     summary: Get paginated past exam question cards
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: subject
 *         schema: { type: string }
 *       - in: query
 *         name: year
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 9 }
 *     responses:
 *       200:
 *         description: Returns questions[], pagination, and filters (subjects[], years[]) for dropdowns
 */
practiceRouter.get(
  '/past-questions',
  protect,
  validate(pastQuestionsQuerySchema),
  gate('STANDARD'),
  getPastQuestions
);

/**
 * @swagger
 * /api/v1/practice/start:
 *   post:
 *     summary: Start a practice session
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Picks 8 random ESSAY questions from subject + year, creates PracticeSession.
 *       session.startedAt is the timer — no extra model needed.
 *       Returns existing incomplete session if found (network recovery).
 *       Frontend navigates to GET /session/:sessionId/question/0 after receiving practiceSessionId.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [subject, year]
 *             properties:
 *               subject:
 *                 type: string
 *                 example: Contract Law
 *               year:
 *                 type: integer
 *                 example: 2023
 *     responses:
 *       201:
 *         description: Returns practiceSessionId, subject, year, totalQuestions, startedAt
 */
practiceRouter.post(
  '/start',
  protect,
  validate(startPracticeSchema),
  gate('STANDARD'),
  startPractice
);

practiceRouter.get('/essay-questions', protect, gate('STANDARD'), getEssayQuestions);

/**
 * @swagger
 * /api/v1/practice/session/{sessionId}/question/{questionIndex}:
 *   get:
 *     summary: Get a question by index — handles all navigation and page reload
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Single endpoint for initial load, box click, next, and previous navigation.
 *       questionIndex is 0-based (box 1 = 0, box 8 = 7).
 *       Backend resolves questionId = session.questionIds[questionIndex].
 *       Frontend manages its own timer — elapsedSeconds is not returned.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: questionIndex
 *         required: true
 *         schema: { type: integer }
 *         description: 0-based box index (0–7)
 *     responses:
 *       200:
 *         description: Question and session context returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 practiceSessionId: { type: string }
 *                 subject: { type: string }
 *                 year: { type: integer }
 *                 totalQuestions: { type: integer }
 *                 currentQuestionIndex: { type: integer, description: "0-based" }
 *                 question:
 *                   type: object
 *                   properties:
 *                     id: { type: string }
 *                     text: { type: string }
 *                     subject: { type: string }
 *                     year: { type: integer }
 *                     examType: { type: string }
 *                     description: { type: string }
 *                     order: { type: integer }
 *                     index: { type: integer, description: "0-based position in session" }
 */
practiceRouter.get(
  '/session/:sessionId/question/:questionIndex',
  protect,
  validate(getPracticeQuestionSchema),
  gate('STANDARD'),
  getPracticeQuestion
);

/**
 * @swagger
 * /api/v1/practice/submit:
 *   post:
 *     summary: Submit answers for AI grading
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Submit 1–5 answers for grading. Submitting more than 5 returns an error
 *       telling the user how many to remove.
 *
 *       Rules:
 *       - Minimum: 1 answer
 *       - Maximum: 5 answers (FE-1 exam standard — attempt 5 of 8 questions)
 *       - Submitting 6 → "Please remove 1 answer"
 *       - Submitting 7 → "Please remove 2 answers"
 *       - Submitting 8 → "Please remove 3 answers"
 *
 *       Scores returned only for answered questions, sorted by questionIndex (box position).
 *       overallScore is 0-100 (used for the donut circle %).
 *       passed = overallScore >= 50.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [practiceSessionId, answers]
 *             properties:
 *               practiceSessionId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 5
 *                 items:
 *                   type: object
 *                   required: [questionIndex, answerText]
 *                   properties:
 *                     questionIndex:
 *                       type: integer
 *                       minimum: 0
 *                       maximum: 7
 *                     answerText:
 *                       type: string
 *                       minLength: 20
 *     responses:
 *       200:
 *         description: Graded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 practiceSessionId: { type: string }
 *                 subject: { type: string }
 *                 year: { type: integer }
 *                 submittedAt: { type: string, format: date-time }
 *                 totalAnswered: { type: integer }
 *                 totalTimeSeconds: { type: integer }
 *                 overallScore: { type: integer, description: "0-100, drives donut circle %" }
 *                 passed: { type: boolean, description: "true if overallScore >= 50" }
 *                 scores:
 *                   type: array
 *                   description: Only answered questions, sorted by box position
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionIndex: { type: integer }
 *                       aiScore: { type: integer, description: "Score out of 20" }
 *                       scoreOutOf: { type: integer, example: 20 }
 *                       band: { type: string }
 *                       appPass: { type: boolean }
 *       400:
 *         description: Too many answers submitted
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "You have answered too many questions. Please remove 1 answer before submitting"
 */
practiceRouter.post(
  '/submit',
  protect,
  validate(submitPracticeSchema),
  gate('STANDARD', { aiLimit: true }),
  submitPractice
);

/**
 * @swagger
 * /api/v1/practice/session/{sessionId}/results:
 *   get:
 *     summary: Get scoreboard for a completed session
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     description: Only attempted questions, sorted by box position. For back-navigation or direct link.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Returns overallScore, passed, scores[], submittedAt, totalTimeSeconds
 */
practiceRouter.get(
  '/session/:sessionId/results',
  protect,
  validate(sessionIdParamSchema),
  gate('STANDARD'),
  getPracticeResults
);

/**
 * @swagger
 * /api/v1/practice/session/{sessionId}/review/{questionIndex}:
 *   get:
 *     summary: Review a single graded attempt with next/previous navigation
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       questionIndex is 0-based within attempted questions only (not the 8-box index).
 *       Returns question, userAnswer, sampleAnswer, aiScore/20, band, feedback,
 *       strengths, improvements, hasNext, hasPrevious.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: questionIndex
 *         required: true
 *         schema: { type: integer }
 *         description: 0-based index within answered attempts only
 *     responses:
 *       200:
 *         description: Returns full review data for one attempt with navigation flags
 */
practiceRouter.get(
  '/session/:sessionId/review/:questionIndex',
  protect,
  validate(attemptReviewSchema),
  gate('STANDARD'),
  getPracticeAttemptReview
);

/**
 * @swagger
 * /api/v1/simulations/{simulationId}/fail:
 *   patch:
 *     summary: Fail an active simulation
 *     description: Called by the frontend when the user leaves the tab. Sets passed=false, records reason and elapsed time.
 *     tags: [Simulations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: simulationId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [reason]
 *             properties:
 *               reason:
 *                 type: string
 *                 enum: [WINDOW_BLUR, TIME_EXPIRED]
 *     responses:
 *       200:
 *         description: Returns simulationId, failed=true, reason and totalTimeSeconds
 */
practiceRouter.patch('/:simulationId/fail', protect, failSimulation);

export default practiceRouter;
