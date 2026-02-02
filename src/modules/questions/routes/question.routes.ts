import { Router } from "express";
import { protect } from "@/shared/middleware/auth.middleware";
import { getModuleQuestions } from "../controller/question.controller";

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


export default questionRouter