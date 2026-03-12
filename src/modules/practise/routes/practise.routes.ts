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
} from '../controller/practise.controller';
import {
  pastQuestionsQuerySchema,
  startPracticeSchema,
  getPracticeQuestionSchema,
  submitPracticeSchema,
  sessionIdParamSchema,
  attemptReviewSchema,
} from '../validators/practise.validators';

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
practiceRouter.post('/start', protect, validate(startPracticeSchema), startPractice);

/**
 * @swagger
 * /api/v1/practice/session/{sessionId}/question/{questionIndex}:
 *   get:
 *     summary: Get a question by index — handles all navigation and page reload
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Single endpoint for initial load, box click, next, previous, and page reload.
 *       questionIndex is 0-based (box 1 = 0, box 8 = 7).
 *       Backend resolves questionId = session.questionIds[questionIndex].
 *       elapsedSeconds = now - session.startedAt — resyncs frontend timer on reload.
 *       savedAnswer pre-fills textarea if question was already answered.
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
 *         description: Returns question, elapsedSeconds, answeredIndexes[], savedAnswer
 */
practiceRouter.get(
  '/session/:sessionId/question/:questionIndex',
  protect,
  validate(getPracticeQuestionSchema),
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
 *       Minimum 5 answers. No timerId — totalTimeSeconds = now - session.startedAt.
 *       questionIndex (0–7) resolves to questionId via session.questionIds[questionIndex].
 *       Grades all in parallel with Claude. Saves one EssayAttempt per answer
 *       (source=PRACTICE, simulationId=practiceSessionId for history grouping).
 *       Returns scoreboard: only attempted questions sorted by box order.
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
 *                 minItems: 5
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
 *                       minLength: 50
 *     responses:
 *       200:
 *         description: Returns overallScore, passed, submittedAt, totalTimeSeconds, scores[]
 */
practiceRouter.post('/submit', protect, validate(submitPracticeSchema), submitPractice);

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
  getPracticeAttemptReview
);

export default practiceRouter;
