// src/modules/history/routes/history.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import {
  getHistoryStats,
  getHistoryFeed,
  getMCQSessionDetail,
  getEssayAttemptDetail,
  getSimulationDetail,
} from '../controller/history.controller';

const historyRouter = Router();

/**
 * @swagger
 * /api/v1/history/stats:
 *   get:
 *     summary: Get history page stats — essay count, simulation count, MCQ batch count
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Powers the 3 stat cards at the top of the history page:
 *
 *       - **Essay Practice**: total attempts + average score out of 20
 *       - **Full Simulations**: total + completed 3hr simulations count
 *       - **MCQ Batches**: total completed sessions + best accuracy score
 *
 *       Call this once when the history page loads.
 *     responses:
 *       200:
 *         description: History stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 essayPractice:
 *                   type: object
 *                   properties:
 *                     total: { type: integer, example: 18 }
 *                     avgScore: { type: integer, example: 64, description: "Average score out of 20" }
 *                 fullSimulations:
 *                   type: object
 *                   properties:
 *                     total: { type: integer, example: 3 }
 *                     completed: { type: integer, example: 3 }
 *                 mcqBatches:
 *                   type: object
 *                   properties:
 *                     total: { type: integer, example: 42 }
 *                     bestScore: { type: integer, example: 92, description: "Best accuracy % ever achieved" }
 */
historyRouter.get('/stats', protect, getHistoryStats);

/**
 * @swagger
 * /api/v1/history:
 *   get:
 *     summary: Get paginated history feed — all activity or filtered by type
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns a paginated, date-sorted list of all student activity.
 *       Powers the main feed under the 4 tabs (All / MCQ Batches / Essay Practice / Simulations).
 *
 *       Each item includes enough data to render the card:
 *       - subject, type (MCQ/ESSAY/SIMULATION), source (FROM_LESSON/STANDARD_SET/SIMULATION)
 *       - title (lesson title or question snippet), date, year (e.g. "2022 Paper")
 *       - score (out of 20 for essay, accuracy % for MCQ), passed/appPass status
 *
 *       Use the returned `id` to fetch the detail modal:
 *       - MCQ card  → `GET /history/mcq/:id`
 *       - Essay card → `GET /history/essay/:id`
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, mcq, essay, simulation]
 *           default: all
 *         description: Filter by activity type (tab selection)
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 12, maximum: 50 }
 *     responses:
 *       200:
 *         description: Paginated history feed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string, description: "Use to fetch detail modal" }
 *                       type:
 *                         type: string
 *                         enum: [MCQ, ESSAY, SIMULATION]
 *                       source:
 *                         type: string
 *                         enum: [FROM_LESSON, STANDARD_SET, SIMULATION]
 *                       subject: { type: string, example: "Contract Law" }
 *                       title: { type: string, example: "Offer & Acceptance Fundamentals" }
 *                       date: { type: string, format: date-time }
 *                       year: { type: integer, nullable: true, example: 2022 }
 *                       score:
 *                         type: integer
 *                         nullable: true
 *                         description: "Score out of 20 (essay/simulation) or accuracy % (MCQ)"
 *                       passed: { type: boolean, nullable: true }
 *                       appPass: { type: boolean, nullable: true }
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page: { type: integer }
 *                     limit: { type: integer }
 *                     total: { type: integer }
 *                     totalPages: { type: integer }
 *                     hasNext: { type: boolean }
 *                     hasPrev: { type: boolean }
 */
historyRouter.get('/', protect, getHistoryFeed);

/**
 * @swagger
 * /api/v1/history/mcq/{sessionId}:
 *   get:
 *     summary: Get MCQ session detail — for the detail modal
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns the full detail of a completed MCQ quiz session.
 *       Powers the modal shown when a student taps an MCQ batch card.
 *
 *       Returns:
 *       - subject, source, date, score summary (X/Y correct · Z% accuracy)
 *       - Each question with: text, user's answer, correct answer, isCorrect, explanation
 *       - Questions are ordered as they were answered (index 1 of N)
 *
 *       The modal shows questions collapsed by default (just "Question N of N" + tick/cross).
 *       On expand: shows question text, the chosen answer (highlighted), and explanation.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema: { type: string }
 *         description: QuizSession.id from the history feed item
 *     responses:
 *       200:
 *         description: MCQ session detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId: { type: string }
 *                 subject: { type: string, example: "Criminal Law" }
 *                 source:
 *                   type: string
 *                   enum: [FROM_LESSON, STANDARD_SET]
 *                 attemptedAt: { type: string, format: date-time }
 *                 correctAnswers: { type: integer, example: 4 }
 *                 totalQuestions: { type: integer, example: 5 }
 *                 accuracyPercent: { type: integer, example: 80 }
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       index: { type: integer, example: 1 }
 *                       total: { type: integer, example: 5 }
 *                       questionText: { type: string }
 *                       userAnswer: { type: string, nullable: true, example: "A" }
 *                       userAnswerText: { type: string }
 *                       correctAnswer: { type: string, example: "B" }
 *                       correctAnswerText: { type: string }
 *                       isCorrect: { type: boolean }
 *                       explanation: { type: string, nullable: true }
 */
historyRouter.get('/mcq/:sessionId', protect, getMCQSessionDetail);

/**
 * @swagger
 * /api/v1/history/essay/{attemptId}:
 *   get:
 *     summary: Get essay attempt detail — for the detail screen
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns the full review data for a single essay attempt.
 *       Powers the full-screen essay review shown from the history feed.
 *
 *       Works for both sources:
 *       - **STANDARD_SET**: from past paper practice (Question model)
 *       - **FROM_LESSON**: from lesson essay practice (EssayQuestion model)
 *
 *       Returns:
 *       - subject, source, date, time taken, score/band/passed
 *       - The original question text (+ year/examType if standard set)
 *       - The student's answer
 *       - The AI sample answer
 *       - Structured feedback: strengths[], improvements[], overallComment
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         required: true
 *         schema: { type: string }
 *         description: EssayAttempt.id from the history feed item
 *     responses:
 *       200:
 *         description: Full essay attempt review data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptId: { type: string }
 *                 subject: { type: string, example: "Contract Law" }
 *                 source:
 *                   type: string
 *                   enum: [FROM_LESSON, STANDARD_SET, SIMULATION]
 *                 attemptedAt: { type: string, format: date-time }
 *                 timeTakenMinutes: { type: integer, example: 40 }
 *                 passed: { type: boolean }
 *                 appPass: { type: boolean }
 *                 aiScore: { type: integer, description: "Score out of 20", example: 13 }
 *                 scoreOutOf: { type: integer, example: 20 }
 *                 band: { type: string, example: "Merit" }
 *                 questionText: { type: string }
 *                 year: { type: integer, nullable: true }
 *                 examType: { type: string, nullable: true }
 *                 userAnswer: { type: string }
 *                 sampleAnswer: { type: string, nullable: true }
 *                 feedback: { type: object, nullable: true }
 *                 strengths:
 *                   type: array
 *                   items: { type: string }
 *                 improvements:
 *                   type: array
 *                   items: { type: string }
 *                 overallComment: { type: string, nullable: true }
 */
historyRouter.get('/essay/:attemptId', protect, getEssayAttemptDetail);

/**
 * @swagger
 * /api/v1/history/simulation/{simulationId}:
 *   get:
 *     summary: Get simulation detail — all answered essays, accordion-ready
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns all essay attempts submitted under a simulation in a single response.
 *       The frontend renders an accordion with prev/next navigation using this data —
 *       no additional API calls are needed when navigating between questions.
 *
 *       Each attempt contains: question text, subject, year, examType, the student's
 *       answer, word count, time taken, AI score out of 20, band, pass/appPass,
 *       sample answer, feedback, strengths, and improvements.
 *
 *       Attempts are ordered chronologically (the order the student answered them).
 *       Use attempt.index and attempt.total to render "Question 1 of 5" labels.
 *
 *       This endpoint is ONLY for simulation cards. For essay practice cards
 *       (single question, source = FROM_LESSON or STANDARD_SET), use
 *       GET /history/essay/:attemptId instead.
 *     parameters:
 *       - in: path
 *         name: simulationId
 *         required: true
 *         schema: { type: string }
 *         description: Simulation.id from the history feed item
 *     responses:
 *       200:
 *         description: Full simulation detail with all answered essay attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 simulationId: { type: string }
 *                 subject: { type: string, nullable: true, description: "null = mixed subjects" }
 *                 year: { type: integer, nullable: true }
 *                 startedAt: { type: string, format: date-time }
 *                 totalTimeMinutes: { type: integer, nullable: true }
 *                 overallScore: { type: integer, nullable: true, description: "0-100 overall %" }
 *                 passed: { type: boolean, nullable: true }
 *                 totalAnswered: { type: integer, description: "Number of essays answered (max 5)" }
 *                 attempts:
 *                   type: array
 *                   description: All answered essays — send everything for accordion navigation
 *                   items:
 *                     type: object
 *                     properties:
 *                       attemptId: { type: string }
 *                       index: { type: integer, description: "1-based position" }
 *                       total: { type: integer, description: "Total attempts in this simulation" }
 *                       questionText: { type: string }
 *                       subject: { type: string, nullable: true }
 *                       year: { type: integer, nullable: true }
 *                       examType: { type: string, nullable: true }
 *                       userAnswer: { type: string }
 *                       wordCount: { type: integer }
 *                       timeTakenMinutes: { type: integer }
 *                       aiScore: { type: integer, description: "Score out of 20" }
 *                       scoreOutOf: { type: integer, example: 20 }
 *                       band: { type: string }
 *                       passed: { type: boolean }
 *                       appPass: { type: boolean }
 *                       sampleAnswer: { type: string, nullable: true }
 *                       feedback: { type: object, nullable: true }
 *                       strengths:
 *                         type: array
 *                         items: { type: string }
 *                       improvements:
 *                         type: array
 *                         items: { type: string }
 */
historyRouter.get('/simulation/:simulationId', protect, getSimulationDetail);

export default historyRouter;