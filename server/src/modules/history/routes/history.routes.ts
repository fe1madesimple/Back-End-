// // src/modules/history/routes/history.routes.ts

// import { Router } from 'express';
// import { protect } from '@/shared/middleware/auth.middleware';
// import {
//   getHistoryStats,
//   getHistoryFeed,
//   getMCQSessionDetail,
//   getEssayAttemptDetail,
//   getSimulationDetail,
// } from '../controller/history.controller';
// import { gate,  } from '@/shared/middleware/gate.middleware';

// const historyRouter = Router();



// /**
//  * @swagger
//  * /api/v1/history/stats:
//  *   get:
//  *     summary: Get history page stats — essay count, simulation count, MCQ batch count
//  *     tags: [History]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Powers the 3 stat cards at the top of the history page:
//  *
//  *       - **Essay Practice**: LESSON_PRACTICE attempts only + average score out of 20
//  *       - **Simulations**: count of completed PracticeSession records (any number of questions)
//  *       - **MCQ Batches**: total completed sessions + best accuracy score ever
//  *
//  *       Call this once when the history page loads.
//  *     responses:
//  *       200:
//  *         description: History stats
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 essayPractice:
//  *                   type: object
//  *                   properties:
//  *                     total: { type: integer, example: 18 }
//  *                     avgScore: { type: integer, example: 14, description: "Average score out of 20" }
//  *                 simulations:
//  *                   type: object
//  *                   properties:
//  *                     total: { type: integer, example: 3, description: "Completed practice sessions" }
//  *                 mcqBatches:
//  *                   type: object
//  *                   properties:
//  *                     total: { type: integer, example: 42 }
//  *                     bestScore: { type: integer, example: 92, description: "Best accuracy % ever achieved" }
//  */
// historyRouter.get('/stats', protect, gate('STANDARD'), getHistoryStats);


// /**
//  * @swagger
//  * /api/v1/history:
//  *   get:
//  *     summary: Get paginated history feed — all activity or filtered by type
//  *     tags: [History]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns a paginated, date-sorted list of all student activity.
//  *       Powers the main feed under the 4 tabs (All / MCQ Batches / Essay Practice / Simulations).
//  *
//  *       Each item includes enough data to render the card:
//  *       - subject, type (MCQ/ESSAY/SIMULATION), source (FROM_LESSON/FROM_PRACTICE/SIMULATION)
//  *       - title, date, year, score, passed/appPass
//  *
//  *       Use the returned `id` to fetch the detail:
//  *       - MCQ card        → GET /history/mcq/:id
//  *       - Essay card      → GET /history/essay/:id
//  *       - Simulation card → GET /history/simulation/:id
//  *     parameters:
//  *       - in: query
//  *         name: type
//  *         schema:
//  *           type: string
//  *           enum: [all, mcq, essay, simulation]
//  *           default: all
//  *       - in: query
//  *         name: page
//  *         schema: { type: integer, default: 1 }
//  *       - in: query
//  *         name: limit
//  *         schema: { type: integer, default: 12, maximum: 50 }
//  *     responses:
//  *       200:
//  *         description: Paginated history feed
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 items:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       id: { type: string }
//  *                       type:
//  *                         type: string
//  *                         enum: [MCQ, ESSAY, SIMULATION]
//  *                       source:
//  *                         type: string
//  *                         enum: [FROM_LESSON, FROM_PRACTICE, SIMULATION]
//  *                       subject: { type: string }
//  *                       title: { type: string }
//  *                       date: { type: string, format: date-time }
//  *                       year: { type: integer, nullable: true }
//  *                       score: { type: integer, nullable: true }
//  *                       passed: { type: boolean, nullable: true }
//  *                       appPass: { type: boolean, nullable: true }
//  *                 pagination:
//  *                   type: object
//  *                   properties:
//  *                     page: { type: integer }
//  *                     limit: { type: integer }
//  *                     total: { type: integer }
//  *                     totalPages: { type: integer }
//  *                     hasNext: { type: boolean }
//  *                     hasPrev: { type: boolean }
//  */
// historyRouter.get('/', protect, gate('STANDARD'), getHistoryFeed);



// /**
//  * @swagger
//  * /api/v1/history/mcq/{sessionId}:
//  *   get:
//  *     summary: Get MCQ session detail — for the detail modal
//  *     tags: [History]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns the full detail of a completed MCQ quiz session.
//  *       Powers the modal shown when a student taps an MCQ batch card.
 
//  *       Returns each question with: text, user's answer, correct answer, isCorrect, explanation.
//  *       Questions are ordered as they were answered (index 1 of N).
//  *     parameters:
//  *       - in: path
//  *         name: sessionId
//  *         required: true
//  *         schema: { type: string }
//  *     responses:
//  *       200:
//  *         description: MCQ session detail
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 sessionId: { type: string }
//  *                 subject: { type: string }
//  *                 source:
//  *                   type: string
//  *                   enum: [FROM_LESSON, FROM_PRACTICE]
//  *                 attemptedAt: { type: string, format: date-time }
//  *                 correctAnswers: { type: integer }
//  *                 totalQuestions: { type: integer }
//  *                 accuracyPercent: { type: integer }
//  *                 questions:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       index: { type: integer }
//  *                       total: { type: integer }
//  *                       questionText: { type: string }
//  *                       userAnswer: { type: string, nullable: true }
//  *                       userAnswerText: { type: string }
//  *                       correctAnswer: { type: string }
//  *                       correctAnswerText: { type: string }
//  *                       isCorrect: { type: boolean }
//  *                       explanation: { type: string, nullable: true }
//  */
// historyRouter.get('/mcq/:sessionId', protect, gate('STANDARD'), getMCQSessionDetail);



// /**
//  * @swagger
//  * /api/v1/history/essay/{attemptId}:
//  *   get:
//  *     summary: Get essay attempt detail — for the detail screen
//  *     tags: [History]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns the full review data for a single essay attempt.
//  *       Works for both FROM_LESSON and FROM_PRACTICE sources.
//  *       For simulation accordion detail, use GET /history/simulation/:id instead.
//  *     parameters:
//  *       - in: path
//  *         name: attemptId
//  *         required: true
//  *         schema: { type: string }
//  *     responses:
//  *       200:
//  *         description: Full essay attempt review
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 attemptId: { type: string }
//  *                 subject: { type: string }
//  *                 source:
//  *                   type: string
//  *                   enum: [FROM_LESSON, FROM_PRACTICE, SIMULATION]
//  *                 attemptedAt: { type: string, format: date-time }
//  *                 timeTakenMinutes: { type: integer }
//  *                 passed: { type: boolean }
//  *                 appPass: { type: boolean }
//  *                 aiScore: { type: integer, description: "Out of 20" }
//  *                 scoreOutOf: { type: integer, example: 20 }
//  *                 band: { type: string }
//  *                 questionText: { type: string }
//  *                 year: { type: integer, nullable: true }
//  *                 examType: { type: string, nullable: true }
//  *                 userAnswer: { type: string }
//  *                 sampleAnswer: { type: string, nullable: true }
//  *                 feedback: { type: object, nullable: true }
//  *                 strengths:
//  *                   type: array
//  *                   items: { type: string }
//  *                 improvements:
//  *                   type: array
//  *                   items: { type: string }
//  *                 overallComment: { type: string, nullable: true }
//  */
// historyRouter.get('/essay/:attemptId', protect, gate('STANDARD'), getEssayAttemptDetail);


// /**
//  * @swagger
//  * /api/v1/history/simulation/{simulationId}:
//  *   get:
//  *     summary: Get simulation detail — all answered essays, accordion-ready
//  *     tags: [History]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns all essay attempts submitted under a simulation in one response.
//  *       Frontend renders an accordion with prev/next navigation from this single call —
//  *       no additional API calls needed when navigating between questions.
//  *
//  *       simulationId here is actually a PracticeSession.id.
//  *       Attempts are ordered chronologically.
//  *     parameters:
//  *       - in: path
//  *         name: simulationId
//  *         required: true
//  *         schema: { type: string }
//  *         description: PracticeSession.id from the history feed simulation item
//  *     responses:
//  *       200:
//  *         description: Full simulation detail
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 simulationId: { type: string }
//  *                 subject: { type: string, nullable: true }
//  *                 year: { type: integer, nullable: true }
//  *                 startedAt: { type: string, format: date-time }
//  *                 totalTimeMinutes: { type: integer, nullable: true }
//  *                 overallScore: { type: integer, nullable: true }
//  *                 passed: { type: boolean, nullable: true }
//  *                 totalAnswered: { type: integer }
//  *                 attempts:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       attemptId: { type: string }
//  *                       index: { type: integer }
//  *                       total: { type: integer }
//  *                       questionText: { type: string }
//  *                       subject: { type: string, nullable: true }
//  *                       year: { type: integer, nullable: true }
//  *                       examType: { type: string, nullable: true }
//  *                       userAnswer: { type: string }
//  *                       wordCount: { type: integer }
//  *                       timeTakenMinutes: { type: integer }
//  *                       aiScore: { type: integer }
//  *                       scoreOutOf: { type: integer, example: 20 }
//  *                       band: { type: string }
//  *                       passed: { type: boolean }
//  *                       appPass: { type: boolean }
//  *                       sampleAnswer: { type: string, nullable: true }
//  *                       feedback: { type: object, nullable: true }
//  *                       strengths:
//  *                         type: array
//  *                         items: { type: string }
//  *                       improvements:
//  *                         type: array
//  *                         items: { type: string }
//  */
// historyRouter.get('/simulation/:simulationId', protect, gate('STANDARD'), getSimulationDetail);

// export default historyRouter;