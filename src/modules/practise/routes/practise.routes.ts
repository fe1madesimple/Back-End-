import { Router } from 'express';
import {
  getQuickQuiz,
  getMixedChallenge,
  getPastQuestions,
  startPractice,
  getPastQuestionById,
  getTopicChallenge,
  getQuizResults,
  initiateStartPractice,
  submitEssay,
  getNextQuestion

} from '../controller/practise.controller';
import { protect } from '@/shared/middleware/auth.middleware';
const practiceRouter = Router();
import { validate } from '@/shared/middleware/validation';
import { pastQuestionsQuerySchema } from '../validators/practise.validators';



/**
 * @swagger
 * /api/v1/practice/past-questions:
 *   get:
 *     summary: Get list of past exam questions with filters
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: Returns paginated list of past FE-1 exam essay questions with search and filtering options. Search by keywords (e.g. Carlill, Mens Rea, negligence) across question text and subject names. Filter by subject, year, and exam type. Default shows 9 questions per page.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword (searches in question text and subject)
 *         example: Carlill
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject (e.g., "Criminal Law")
 *         example: Criminal Law
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by exam year (4 digits)
 *         example: "2024"
 *       - in: query
 *         name: examType
 *         schema:
 *           type: string
 *         description: Filter by question type (Essay or Problem)
 *         example: Essay
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: "1"
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           default: "9"
 *         description: Number of questions per page
 *     responses:
 *       200:
 *         description: Past questions retrieved successfully
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
 *                   example: Past questions retrieved
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
 *                             example: clx789ghi
 *                           text:
 *                             type: string
 *                             example: "Discuss the tort of negligence with reference to Donoghue v Stevenson..."
 *                           year:
 *                             type: integer
 *                             example: 2024
 *                           subject:
 *                             type: string
 *                             example: Criminal Law
 *                           examType:
 *                             type: string
 *                             example: Essay
 *                           order:
 *                             type: integer
 *                             example: 1
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 45
 *                           description: Total questions matching filters
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 9
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                     filters:
 *                       type: object
 *                       description: Available filter values for dropdowns
 *                       properties:
 *                         subjects:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Criminal Law", "Contract Law", "Tort Law", "Equity"]
 *                         years:
 *                           type: array
 *                           items:
 *                             type: integer
 *                           example: [2024, 2023, 2022, 2021]
 *                         examTypes:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Essay", "Problem"]
 */
practiceRouter.get(
  '/past-questions',
  protect,
  validate(pastQuestionsQuerySchema),
  getPastQuestions
);

/**
 * @swagger
 * /api/v1/practice/mixed-challenge:
 *   get:
 *     summary: Get 15 random MCQ questions across all subjects
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves 15 randomized MCQ questions from across ALL subjects. NO PARAMETERS NEEDED - Just call the endpoint! Questions are completely random across all subjects (could be 3 Criminal, 5 Contract, 2 Tort, 4 Equity, 1 Company Law, etc). Each question includes subject and module name. Use cases - Daily challenge feature, Quick mixed review, Test knowledge across all subjects, Warm-up before study session.
 *     responses:
 *       200:
 *         description: Mixed challenge retrieved successfully
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
 *                   example: Mixed challenge retrieved
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
 *                             example: clx123abc
 *                           text:
 *                             type: string
 *                             example: Which case established the neighbour principle?
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["A: Donoghue v Stevenson", "B: Carlill v Carbolic", "C: Salomon v Salomon", "D: Dunne v National Maternity Hospital"]
 *                           order:
 *                             type: integer
 *                             example: 1
 *                           subject:
 *                             type: string
 *                             example: Tort Law
 *                           module:
 *                             type: string
 *                             example: Module 1 - Negligence Fundamentals
 *                     totalAvailable:
 *                       type: integer
 *                       example: 250
 *                       description: Total MCQ questions in database
 *       404:
 *         description: No questions available
 */
practiceRouter.get('/mixed-challenge', protect, getMixedChallenge);


/**
 * @swagger
 * /api/v1/practice/quick-quiz:
 *   get:
 *     summary: Get 5 random MCQ questions with session tracking
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: Returns 5 random questions and creates a quiz session for tracking.
 *     responses:
 *       200:
 *         description: Success
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
 *                     sessionId:
 *                       type: string
 *                     questions:
 *                       type: array
 *                     totalAvailable:
 *                       type: integer
 */
practiceRouter.get('/quick-quiz', protect, getQuickQuiz);



/**
 * @swagger
 * /api/v1/practice/quiz-results:
 *   post:
 *     summary: Get quiz results by session
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *             properties:
 *               sessionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quiz results retrieved
 */
practiceRouter.post('/quiz-results', protect, getQuizResults);


practiceRouter.post('/initiate-start-question', protect, initiateStartPractice);


practiceRouter.post('/start-question', protect, startPractice);

practiceRouter.post('/submit', protect, submitEssay);

practiceRouter.post('/next-question', protect, getNextQuestion);


/**
 * @swagger
 * /api/v1/practice/topic-challenge/{subjectId}:
 *   get:
 *     summary: Get 10 random MCQ questions from all modules in subject
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns 10 random multiple-choice questions from ALL modules in the subject for comprehensive cross-module practice.
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
practiceRouter.get('/topic-challenge/:subjectId', protect, getTopicChallenge);


/**
 * @swagger
 * /api/v1/practice/past-questions/{id}:
 *   get:
 *     summary: Get full details of a specific past exam question
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns complete details of a past exam question including user's previous attempts.
 *
 *       **USE CASE:**
 *       - User clicks on a past question from the list (Endpoint 14)
 *       - Frontend displays full question text
 *       - User can write essay answer
 *       - User can see their previous attempts with scores
 *
 *       **RESPONSE INCLUDES:**
 *       - Full question text (essay prompt)
 *       - Year and subject
 *       - User's previous attempts at this question
 *       - Each attempt shows: answer text, AI score, band, app pass status
 *
 *       **FRONTEND IMPLEMENTATION:**
 *       ```javascript
 *       // 1. Fetch question details
 *       const response = await fetch('/api/v1/past-questions/QUESTION_ID');
 *       const { question } = response.data;
 *
 *       // 2. Display question header
 *       // "2024 Criminal Law Essay - Question 1"
 *
 *       // 3. Display full question text
 *       document.getElementById('question-text').textContent = question.text;
 *
 *       // 4. Show previous attempts (if any)
 *       if (question.userAttempts.length > 0) {
 *         // Display attempts history:
 *         question.userAttempts.forEach(attempt => {
 *           // Card showing:
 *           // "Attempt on Feb 3, 2026"
 *           // "Score: 75/100 (70-79% Upper Second)"
 *           // "App Pass: No"
 *           // [View Full Feedback] button
 *         });
 *
 *         // Show: "You've attempted this question 2 times"
 *         // Show best score: "Best: 82/100 (App Pass)"
 *       }
 *
 *       // 5. Show essay editor
 *       const editor = document.getElementById('essay-editor');
 *       // Textarea for user to write answer
 *
 *       // 6. Submit button
 *       document.getElementById('submit-essay').addEventListener('click', async () => {
 *         const answer = editor.value;
 *         const startTime = performance.now();
 *
 *         // Submit to Endpoint 10
 *         const result = await fetch(`/api/v1/essays/${question.id}/submit`, {
 *           method: 'POST',
 *           body: JSON.stringify({
 *             answer,
 *             timeTakenSeconds: Math.floor((performance.now() - startTime) / 1000)
 *           })
 *         });
 *
 *         // Show grading results
 *         displayGradingResults(result);
 *       });
 *       ```
 *
 *       **PREVIOUS ATTEMPTS DISPLAY:**
 *       User can review their past answers and grades:
 *       ```
 *       ┌─────────────────────────────────────────┐
 *       │ Your Previous Attempts (2)              │
 *       ├─────────────────────────────────────────┤
 *       │ Attempt 1 - Feb 1, 2026                 │
 *       │ Score: 72/100 (70-79% Upper Second)     │
 *       │ App Pass: No                            │
 *       │ [View Full Answer & Feedback] →         │
 *       ├─────────────────────────────────────────┤
 *       │ Attempt 2 - Feb 3, 2026                 │
 *       │ Score: 82/100 (80-100% App Pass) ✓      │
 *       │ App Pass: Yes                           │
 *       │ [View Full Answer & Feedback] →         │
 *       └─────────────────────────────────────────┘
 *
 *       Best Score: 82/100 (App Pass)
 *       ```
 *
 *       **ALLOW MULTIPLE ATTEMPTS:**
 *       - Students can attempt same question multiple times
 *       - Each attempt gets fresh AI grading
 *       - Useful for practice and improvement
 *       - Track progress over time
 *
 *       **ESSAY SUBMISSION:**
 *       After user writes answer:
 *       - Click "Submit for AI Grading"
 *       - POST to /api/v1/essays/:id/submit (Endpoint 10)
 *       - Get comprehensive grading
 *       - New attempt added to history
 *
 *       **WORD COUNT HELPER:**
 *       ```javascript
 *       editor.addEventListener('input', () => {
 *         const words = editor.value.trim().split(/\s+/).length;
 *         document.getElementById('word-count').textContent = `${words} words`;
 *
 *         // Typical FE-1 essay: 800-1200 words
 *         if (words < 600) {
 *           showWarning('Essay may be too short (aim for 800-1200 words)');
 *         }
 *       });
 *       ```
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Past question ID
 *     responses:
 *       200:
 *         description: Past question retrieved successfully
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
 *                   example: Past question retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clx789abc
 *                         text:
 *                           type: string
 *                           example: "Discuss the tort of negligence with reference to Donoghue v Stevenson and the three-stage test established in Caparo v Dickman. Critically analyze the current application of duty of care in novel situations."
 *                         year:
 *                           type: integer
 *                           example: 2024
 *                         subject:
 *                           type: string
 *                           example: Tort Law
 *                         examType:
 *                           type: string
 *                           example: Essay
 *                         order:
 *                           type: integer
 *                           example: 1
 *                         userAttempts:
 *                           type: array
 *                           description: User's previous attempts at this question (sorted newest first)
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: clxdef456
 *                               answer:
 *                                 type: string
 *                                 example: "Negligence is a tort that requires the plaintiff to prove..."
 *                                 description: Full essay text from previous attempt
 *                               aiScore:
 *                                 type: number
 *                                 nullable: true
 *                                 example: 75
 *                               band:
 *                                 type: string
 *                                 nullable: true
 *                                 example: "70-79% Upper Second"
 *                               appPass:
 *                                 type: boolean
 *                                 nullable: true
 *                                 example: false
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2026-02-03T10:30:00Z"
 *       404:
 *         description: Past question not found
 *       400:
 *         description: Question is not a past question (no year assigned)
 */
practiceRouter.get('/past-questions/:id', protect, getPastQuestionById);


export default practiceRouter;