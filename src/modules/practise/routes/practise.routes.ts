import { Router } from 'express';
import {
  getQuickQuiz,
  getTopicPractice,
  getMixedChallenge,
  getPastQuestions,
  getPastQuestionById,
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
 *     description: |
 *       Returns paginated list of past FE-1 exam essay questions with filtering options.
 *
 *       **USE CASE:**
 *       - User wants to practice with real past exam questions
 *       - User clicks "Past Questions" in navigation
 *       - Frontend displays filterable list of questions
 *       - User can filter by subject, year, exam type
 *
 *       **USED IN:** Past Questions page (Image feinten)
 *
 *       **WHAT ARE PAST QUESTIONS:**
 *       - Real essay questions from previous FE-1 exams
 *       - Organized by year (2024, 2023, 2022, etc.)
 *       - Organized by subject (Criminal Law, Contract Law, etc.)
 *       - Type: Essay or Problem questions
 *       - NOT multiple choice (those are for practice only)
 *
 *       **FILTERS PROVIDED:**
 *       Response includes available filter values for dropdowns:
 *       - All subjects that have past questions
 *       - All years that have past questions (sorted newest first)
 *       - All exam types (Essay, Problem)
 *
 *       **PAGINATION:**
 *       - Default: 10 questions per page
 *       - Can be adjusted with `limit` parameter
 *       - Use `page` parameter to navigate
 *
 *       **FRONTEND IMPLEMENTATION:**
 *       ```javascript
 *       // 1. Fetch past questions with filters
 *       const filters = {
 *         subject: 'Criminal Law', // or undefined for all
 *         year: 2024, // or undefined for all
 *         examType: 'Essay', // or undefined for all
 *         page: 1,
 *         limit: 10
 *       };
 *
 *       const queryString = new URLSearchParams(
 *         Object.entries(filters)
 *           .filter(([_, v]) => v !== undefined)
 *           .map(([k, v]) => [k, String(v)])
 *       ).toString();
 *
 *       const response = await fetch(`/api/v1/past-questions?${queryString}`);
 *       const { data } = await response.json();
 *
 *       // 2. Display filter dropdowns using data.filters
 *       const subjectDropdown = data.filters.subjects; // ["Criminal Law", "Contract Law", ...]
 *       const yearDropdown = data.filters.years; // [2024, 2023, 2022, ...]
 *       const typeDropdown = data.filters.examTypes; // ["Essay", "Problem"]
 *
 *       // 3. Display questions as cards
 *       data.questions.forEach(question => {
 *         // Card showing:
 *         // "2024 Criminal Law Essay"
 *         // "Discuss the elements of negligence with reference to..."
 *         // [View Question Button]
 *       });
 *
 *       // 4. Pagination
 *       const totalPages = Math.ceil(data.total / filters.limit);
 *       // Show: "Page 1 of 5 (45 questions total)"
 *
 *       // 5. Click question to view full details
 *       // Navigate to: /past-questions/:id (Endpoint 15)
 *       ```
 *
 *       **CARD DISPLAY (per question) just an example o babtunde:**
 *       ```
 *       ┌─────────────────────────────────────────┐
 *       │ 2024 Equity Essay  na exmaple o babatunde│
 *       ├─────────────────────────────────────────┤
 *       │ Discuss the equitable maxims and their  │
 *       │ application in modern Irish law...      │
 *       │                                         │
 *       │ [View Question & Submit Answer] →       │
 *       └─────────────────────────────────────────┘
 *       ```
 *
 *       **SORTING:**
 *       Questions sorted by:
 *       1. Year (newest first)
 *       2. Order (within same year)
 *
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject (e.g., "Criminal Law")
 *         example: Criminal Law
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by exam year
 *         example: 2024
 *       - in: query
 *         name: examType
 *         schema:
 *           type: string
 *         description: Filter by question type (Essay or Problem)
 *         example: Essay
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
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
 *                     total:
 *                       type: integer
 *                       example: 45
 *                       description: Total number of questions matching filters
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
 *     summary: Get 5 random MCQ questions across all subjects
 *     tags: [Practice Quizzes]
 *     security:
 *       - bearerAuth: []
 *     description: Returns 5 random multiple-choice questions from across ALL subjects for quick practice. NO PARAMETERS NEEDED - Just call the endpoint!
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
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           text:
 *                             type: string
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                           subject:
 *                             type: string
 *                           module:
 *                             type: string
 *                     totalAvailable:
 *                       type: integer
 *       404:
 *         description: No questions available
 */
practiceRouter.get('/quick-quiz', protect, getQuickQuiz);



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
practiceRouter.get('/topic-challenge/:subjectId', protect, getTopicPractice);



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
