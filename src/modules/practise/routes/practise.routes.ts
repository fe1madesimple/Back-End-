import { Router } from "express";
import { validate } from "@/shared/middleware/validation";
import { getQuickQuiz } from "../controller/practise.controller";
import { protect } from "@/shared/middleware/auth.middleware";
const practiceRouter = Router()



/**
 * @swagger
 * /api/v1/practice/quick-quiz/{moduleId}:
 *   get:
 *     summary: Get 5 random MCQ questions from module
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns 5 random multiple-choice questions from the specified module for quick practice.
 *       
 *       **USE CASE:**
 *       - User completes a module and wants quick review
 *       - User clicks "Quick Quiz" button on module page
 *       - Frontend displays 5 random questions
 *       
 *       **RESPONSE STRUCTURE:**
 *       - Questions returned WITHOUT `correctAnswer` or `explanation`
 *       - User must submit each answer via POST /questions/:id/attempt
 *       - Feedback shown after each submission
 *       
 *       **RANDOMIZATION:**
 *       - Questions selected randomly using SQL RANDOM()
 *       - Different questions each time user takes quiz
 *       - If module has <5 questions, returns all available
 *       
 *       **FRONTEND FLOW:**
 *       ```javascript
 *       // 1. Fetch quiz
 *       const quiz = await fetch('/api/v1/practice/quick-quiz/MODULE_ID');
 *       
 *       // 2. Display questions one by one
 *       quiz.questions.forEach(question => {
 *         // Show question with 4 options (A, B, C, D)
 *       });
 *       
 *       // 3. User selects answer
 *       const answer = 'A';
 *       
 *       // 4. Submit answer
 *       const result = await fetch(`/api/v1/questions/${question.id}/attempt`, {
 *         method: 'POST',
 *         body: JSON.stringify({ answer, timeTakenSeconds: 30 })
 *       });
 *       
 *       // 5. Show feedback (isCorrect, explanation)
 *       if (result.isCorrect) {
 *         showSuccess(result.explanation);
 *       } else {
 *         showError(result.correctAnswer, result.explanation);
 *       }
 *       
 *       // 6. Move to next question
 *       ```
 *       
 *       **SCORING:**
 *       - Each question worth 1 point
 *       - Maximum score: 5 points
 *       - Results tracked in QuestionAttempt table
 *       
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Quick quiz retrieved successfully
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
 *                   example: Quick quiz retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     moduleId:
 *                       type: string
 *                       example: clx123abc
 *                     moduleName:
 *                       type: string
 *                       example: "Module 1: Foundations of Criminal Law"
 *                     subjectName:
 *                       type: string
 *                       example: Criminal Law
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: clx456def
 *                           text:
 *                             type: string
 *                             example: Which of the following best describes recklessness?
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["A: Awareness of risk + unreasonable risk-taking", "B: Mistake in judgment", "C: Objective test", "D: Failure to exercise care"]
 *                           order:
 *                             type: integer
 *                             example: 1
 *                     totalAvailable:
 *                       type: integer
 *                       example: 15
 *                       description: Total MCQ questions available in this module
 *       404:
 *         description: Module not found or no questions available
 */
practiceRouter.get(
  '/practice/quick-quiz/:moduleId',
  protect,
  getQuickQuiz
);







export default practiceRouter