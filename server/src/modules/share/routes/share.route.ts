// import { Router } from 'express';
// import { protect } from '@/shared/middleware/auth.middleware';
// import {
//   generateShareToken,
//   getSharedEssay,
//   getSharedSimulation,
//   getSharedMCQ,
// } from '../controller/share.controller';

// const shareRouter = Router();

// /**
//  * @swagger
//  * /api/v1/share:
//  *   post:
//  *     summary: Generate a shareable link for an essay, simulation, or MCQ result
//  *     tags: [Share]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Creates a public token that allows anyone with the link to view a result
//  *       without logging in. Token expires after 2 days. If a valid token already
//  *       exists for the resource it is reused — no duplicates created.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [type, resourceId]
//  *             properties:
//  *               type:
//  *                 type: string
//  *                 enum: [ESSAY, SIMULATION, MCQ]
//  *               resourceId:
//  *                 type: string
//  *                 description: |
//  *                   ESSAY      → EssayAttempt.id
//  *                   SIMULATION → PracticeSession.id
//  *                   MCQ        → QuizSession.id
//  *     responses:
//  *       200:
//  *         description: Share link generated
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 shareToken: { type: string, example: "a3f9b2c1d4e5..." }
//  *                 shareUrl:
//  *                   type: string
//  *                   example: "https://fe1madesimple.com/share/a3f9b2c1d4e5..."
//  *                 expiresAt: { type: string, format: date-time }
//  *                 type: { type: string, enum: [ESSAY, SIMULATION, MCQ] }
//  */
// shareRouter.post('/', protect, generateShareToken);

// /**
//  * @swagger
//  * /api/v1/share/{token}/essay:
//  *   get:
//  *     summary: View a shared essay result — no login required
//  *     tags: [Share]
//  *     parameters:
//  *       - in: path
//  *         name: token
//  *         required: true
//  *         schema: { type: string }
//  *     responses:
//  *       200:
//  *         description: Shared essay data
//  *       404:
//  *         description: Token not found
//  *       410:
//  *         description: Token expired
//  */
// shareRouter.get('/:token/essay', getSharedEssay);

// /**
//  * @swagger
//  * /api/v1/share/{token}/simulation:
//  *   get:
//  *     summary: View a shared simulation result — no login required
//  *     tags: [Share]
//  *     description: |
//  *       Returns all essay attempts under the simulation in one response.
//  *       Frontend renders the same accordion view as the history simulation detail.
//  *     parameters:
//  *       - in: path
//  *         name: token
//  *         required: true
//  *         schema: { type: string }
//  *     responses:
//  *       200:
//  *         description: Shared simulation data with all attempts
//  *       404:
//  *         description: Token not found
//  *       410:
//  *         description: Token expired
//  */
// shareRouter.get('/:token/simulation', getSharedSimulation);

// /**
//  * @swagger
//  * /api/v1/share/{token}/mcq:
//  *   get:
//  *     summary: View a shared MCQ session result — no login required
//  *     tags: [Share]
//  *     parameters:
//  *       - in: path
//  *         name: token
//  *         required: true
//  *         schema: { type: string }
//  *     responses:
//  *       200:
//  *         description: Shared MCQ session data with all questions
//  *       404:
//  *         description: Token not found
//  *       410:
//  *         description: Token expired
//  */
// shareRouter.get('/:token/mcq', getSharedMCQ);

// export default shareRouter;