import { Router } from "express";
import { protect } from "@/shared/middleware/auth.middleware";
import { getModuleQuestions } from "../controller/question.controller";
import { attemptQuestionSchema } from "../validators/question.validator";
import { attemptQuestion } from "../controller/question.controller";
import { validate } from "@/shared/middleware/validation";

const questionRouter = Router()



/**
 * @swagger
 * /api/v1/modules/{moduleId}/questions:
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
questionRouter.get('/modules/:moduleId/questions', protect, getModuleQuestions);



/**
 * @swagger
 * /api/v1/questions/{id}/attempt:
 *   post:
 *     summary: Submit MCQ answer
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Submit answer to MCQ question and receive instant feedback.
 *       
 *       **Used in:** MCQ quiz page (Image feinreone - shows red "Answer Reveal" box after submission)
 *       
 *       **Flow:**
 *       1. User selects an option (A, B, C, or D)
 *       2. User clicks "Submit"
 *       3. Frontend calls this endpoint
 *       4. Backend checks if correct
 *       5. Returns: correct/incorrect, explanation, correct answer
 *       6. Frontend shows result (red box with explanation in image)
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
 *             properties:
 *               answer:
 *                 type: string
 *                 example: A
 *                 description: User's selected option (A, B, C, or D)
 *               timeTakenSeconds:
 *                 type: integer
 *                 example: 45
 *                 description: Time user took to answer (optional)
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: object
 *                       properties:
 *                         attemptId:
 *                           type: string
 *                         isCorrect:
 *                           type: boolean
 *                           example: true
 *                         pointsEarned:
 *                           type: integer
 *                           example: 1
 *                         correctAnswer:
 *                           type: string
 *                           example: A
 *                         explanation:
 *                           type: string
 *                           example: Recklessness involves consciously disregarding a known risk — see R v Cunningham (1957)
 */
questionRouter.post(
  '/questions/:id/attempt',
  protect,
  validate(attemptQuestionSchema),
  attemptQuestion
);

export default questionRouter