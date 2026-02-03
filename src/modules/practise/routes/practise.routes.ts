import { Router } from "express";
import { getQuickQuiz, getTopicChallenge, getMixedPractice} from "../controller/practise.controller";
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


/**
 * @swagger
 * /api/v1/practice/topic-challenge/{moduleId}:
 *   get:
 *     summary: Get 10 random MCQ questions from module for topic challenge
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns 10 random multiple-choice questions from the specified module for medium-length practice.
 *       
 *       **USE CASE:**
 *       - User wants deeper practice than Quick Quiz (5 questions)
 *       - User clicks "Topic Challenge" button on module page
 *       - Frontend displays 10 random questions
 *       - More comprehensive module review
 *       
 *       **DIFFERENCE FROM QUICK QUIZ:**
 *       - Quick Quiz: 5 questions (fast review)
 *       - Topic Challenge: 10 questions (deeper practice)
 *       - Mixed Practice: 15 questions (comprehensive, cross-module)
 *       
 *       **RESPONSE STRUCTURE:**
 *       - Questions returned WITHOUT `correctAnswer` or `explanation`
 *       - User must submit each answer via POST /questions/:id/attempt
 *       - Feedback shown after each submission
 *       
 *       **RANDOMIZATION:**
 *       - Questions selected randomly using SQL RANDOM()
 *       - Different questions each time user takes challenge
 *       - If module has <10 questions, returns all available
 *       
 *       **FRONTEND FLOW:**
 *       ```javascript
 *       // 1. Fetch challenge
 *       const challenge = await fetch('/api/v1/practice/topic-challenge/MODULE_ID');
 *       
 *       // 2. Display questions one by one
 *       let currentQuestion = 0;
 *       let score = 0;
 *       
 *       challenge.questions.forEach((question, index) => {
 *         // Show question number: "Question 3/10"
 *         // Show question with 4 options
 *       });
 *       
 *       // 3. User selects answer
 *       const answer = 'B';
 *       const startTime = Date.now();
 *       
 *       // 4. Submit answer
 *       const result = await fetch(`/api/v1/questions/${question.id}/attempt`, {
 *         method: 'POST',
 *         body: JSON.stringify({ 
 *           answer,
 *           timeTakenSeconds: Math.floor((Date.now() - startTime) / 1000)
 *         })
 *       });
 *       
 *       // 5. Update score
 *       if (result.isCorrect) {
 *         score++;
 *       }
 *       
 *       // 6. Show feedback immediately
 *       showFeedback(result.isCorrect, result.explanation);
 *       
 *       // 7. Move to next question or show final results
 *       if (currentQuestion < 9) {
 *         currentQuestion++;
 *         showNextQuestion();
 *       } else {
 *         showFinalScore(score, 10); // "You scored 7/10 (70%)"
 *       }
 *       ```
 *       
 *       **SCORING:**
 *       - Each question worth 1 point
 *       - Maximum score: 10 points
 *       - Results tracked in QuestionAttempt table
 *       - Show percentage: (score / 10) × 100
 *       
 *       **UI DISPLAY:**
 *       - Progress indicator: "Question 3/10"
 *       - Score tracker: "7/10 correct"
 *       - Timer (optional): Track total time taken
 *       - Final results screen with breakdown
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
 *         description: Topic challenge retrieved successfully
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
 *                   example: Topic challenge retrieved
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
 *                             example: Which case established the neighbour principle?
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["A: Donoghue v Stevenson", "B: Caparo v Dickman", "C: Bolton v Stone", "D: R v Cunningham"]
 *                           order:
 *                             type: integer
 *                             example: 3
 *                     totalAvailable:
 *                       type: integer
 *                       example: 15
 *                       description: Total MCQ questions available in this module
 *       404:
 *         description: Module not found or no questions available
 */
practiceRouter.get(
  '/practice/topic-challenge/:moduleId',
  protect,
  getTopicChallenge
);


// src/modules/content/routes/content.routes.ts

/**
 * @swagger
 * /api/v1/practice/mixed-practice/{subjectId}:
 *   get:
 *     summary: Get 15 random MCQ questions from all modules in subject
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns 15 random multiple-choice questions from ALL modules in the subject for comprehensive cross-module practice.
 *       
 *       **USE CASE:**
 *       - User wants to practice across entire subject (all modules)
 *       - User preparing for full subject exam
 *       - User clicks "Mixed Practice" button on subject page
 *       - Questions come from different modules randomly
 *       
 *       **DIFFERENCE FROM OTHER QUIZZES:**
 *       - Quick Quiz: 5 questions from ONE module
 *       - Topic Challenge: 10 questions from ONE module
 *       - Mixed Practice: 15 questions from ALL modules (this endpoint)
 *       
 *       **CROSS-MODULE RANDOMIZATION:**
 *       - Questions randomly selected across all modules
 *       - Tests comprehensive subject knowledge
 *       - Each question shows which module it's from
 *       - If subject has <15 questions total, returns all available
 *       
 *       **RESPONSE STRUCTURE:**
 *       - Questions returned WITHOUT `correctAnswer` or `explanation`
 *       - User must submit each answer via POST /questions/:id/attempt
 *       - Feedback shown after each submission
 *       - Each question includes `moduleName` to show topic coverage
 *       
 *       **FRONTEND FLOW:**
 *       ```javascript
 *       // 1. Fetch mixed practice
 *       const practice = await fetch('/api/v1/practice/mixed-practice/SUBJECT_ID');
 *       
 *       // 2. Show practice info
 *       console.log(`${practice.questions.length} questions from ${practice.modulesIncluded} modules`);
 *       // "15 questions from 3 modules"
 *       
 *       // 3. Display questions one by one
 *       let currentQuestion = 0;
 *       let score = 0;
 *       
 *       practice.questions.forEach((question, index) => {
 *         // Show: "Question 8/15 - Module 2: Offences Against the Person"
 *         // Show question with 4 options
 *       });
 *       
 *       // 4. User selects answer
 *       const answer = 'C';
 *       const startTime = Date.now();
 *       
 *       // 5. Submit answer
 *       const result = await fetch(`/api/v1/questions/${question.id}/attempt`, {
 *         method: 'POST',
 *         body: JSON.stringify({ 
 *           answer,
 *           timeTakenSeconds: Math.floor((Date.now() - startTime) / 1000)
 *         })
 *       });
 *       
 *       // 6. Update score and track by module
 *       if (result.isCorrect) {
 *         score++;
 *       }
 *       
 *       // Track performance by module
 *       moduleScores[question.moduleName] = moduleScores[question.moduleName] || { correct: 0, total: 0 };
 *       moduleScores[question.moduleName].total++;
 *       if (result.isCorrect) moduleScores[question.moduleName].correct++;
 *       
 *       // 7. Show feedback immediately
 *       showFeedback(result.isCorrect, result.explanation, question.moduleName);
 *       
 *       // 8. Move to next question or show final results
 *       if (currentQuestion < 14) {
 *         currentQuestion++;
 *         showNextQuestion();
 *       } else {
 *         // Show comprehensive results breakdown
 *         showFinalResults(score, 15, moduleScores);
 *         // "You scored 12/15 (80%)"
 *         // "Module 1: 4/5 (80%)"
 *         // "Module 2: 3/5 (60%)"
 *         // "Module 3: 5/5 (100%)"
 *       }
 *       ```
 *       
 *       **SCORING:**
 *       - Each question worth 1 point
 *       - Maximum score: 15 points
 *       - Results tracked in QuestionAttempt table
 *       - Show overall percentage: (score / 15) × 100
 *       - Show breakdown by module
 *       
 *       **UI DISPLAY:**
 *       - Progress: "Question 8/15"
 *       - Module indicator: "Module 2: Offences Against the Person"
 *       - Score tracker: "11/15 correct (73%)"
 *       - Timer (optional): Total time taken
 *       - Final results with module breakdown
 *       
 *       **ANALYTICS VALUE:**
 *       This endpoint helps identify:
 *       - Which modules user is strong in
 *       - Which modules need more study
 *       - Overall subject readiness
 *       
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Mixed practice retrieved successfully
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
 *                   example: Mixed practice retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     subjectId:
 *                       type: string
 *                       example: clx123abc
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
 *                             example: What is the mens rea for murder?
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["A: Malice aforethought", "B: Recklessness", "C: Negligence", "D: Strict liability"]
 *                           order:
 *                             type: integer
 *                             example: 4
 *                           moduleName:
 *                             type: string
 *                             example: "Module 1: Foundations of Criminal Law"
 *                             description: Shows which module this question is from
 *                     totalAvailable:
 *                       type: integer
 *                       example: 45
 *                       description: Total MCQ questions available across all modules in this subject
 *                     modulesIncluded:
 *                       type: integer
 *                       example: 3
 *                       description: Number of different modules represented in this practice set
 *       404:
 *         description: Subject not found or no questions available
 */
practiceRouter.get(
  '/practice/mixed-practice/:subjectId',
  protect,
  getMixedPractice
);



export default practiceRouter