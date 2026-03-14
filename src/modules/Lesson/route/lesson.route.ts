// src/modules/content/routes/lesson.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import {
  trackVideoProgress,
  trackTimeSpent,
  getModulesBySubject,
  getLessonById,
  getLessonMCQs,
  attemptMCQ,
  getQuizResults,
  getLessonEssayQuestion,
  submitLessonEssay,
  getAllLessonMCQs,
  getAllLessonEssayQuestions,
  getAllMCQs,
  getAllEssayQuestions,
} from '../controller/lesson.controller';

const lessonRouter = Router();



/**
 * @swagger
 * /api/v1/lessons/mcq/attempt:
 *   post:
 *     summary: Submit answer for the current MCQ question
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Called once per question. Backend resolves the current question from
 *       the session — no questionId needed from frontend.
 *       Returns correctAnswer and explanation immediately after submit.
 *       When isLastQuestion is true, call GET /mcq/results/:sessionId next.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sessionId, answer, timeTakenSeconds]
 *             properties:
 *               sessionId: { type: string }
 *               answer: { type: string, description: "A | B | C | D | '' (empty = skip)" }
 *               timeTakenSeconds: { type: integer }
 *     responses:
 *       200:
 *         description: Attempt recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptId: { type: string }
 *                 isCorrect: { type: boolean }
 *                 correctAnswer: { type: string }
 *                 explanation: { type: string, nullable: true }
 *                 isLastQuestion: { type: boolean }
 */
lessonRouter.post('/mcq/attempt', protect, attemptMCQ);

/**
 * @swagger
 * /api/v1/lessons/mcq/results/{sessionId}:
 *   get:
 *     summary: Get quiz results and close the session
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Called once after the last question. Marks session as completed.
 *       Returns score, accuracy, avg time, streak, motivational message.
 *       All numbers are whole — no decimals. Safe to call twice (idempotent).
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Quiz results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId: { type: string }
 *                 score: { type: integer, description: "Correct answers count" }
 *                 total: { type: integer }
 *                 accuracyPercent: { type: integer }
 *                 avgTimePerQuestionSeconds: { type: integer }
 *                 quizStreak: { type: integer, description: "Consecutive days with ≥1 completed session" }
 *                 motivationalMessage: { type: string }
 *                 badgeUnlocked: { type: boolean, description: "True only on 100%" }
 *                 completedAt: { type: string, format: date-time }
 */
lessonRouter.get('/mcq/results/:sessionId', protect, getQuizResults);

/**
 * @swagger
 * /api/v1/lessons/essay/submit:
 *   post:
 *     summary: Submit and grade a lesson essay
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Grades the essay with Claude AI. Returns the full review screen data
 *       in one response — question, userAnswer, sampleAnswer, score, feedback.
 *       practiceSessionId comes from GET /lessons/:id/essay.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [practiceSessionId, answerText]
 *             properties:
 *               practiceSessionId: { type: string }
 *               answerText: { type: string }
 *     responses:
 *       200:
 *         description: Essay graded — full review data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptId: { type: string }
 *                 aiScore: { type: integer, description: "Score out of 20" }
 *                 scoreOutOf: { type: integer, example: 20 }
 *                 band: { type: string }
 *                 passed: { type: boolean }
 *                 appPass: { type: boolean }
 *                 strengths: { type: array, items: { type: string } }
 *                 improvements: { type: array, items: { type: string } }
 *                 sampleAnswer: { type: string, nullable: true }
 *                 feedback: { type: object, nullable: true }
 */
lessonRouter.post('/essay/submit', protect, submitLessonEssay);



// /**
//  * @swagger
//  * /api/v1/lessons/admin/mcqs:
//  *   get:
//  *     summary: Get all MCQ questions across all lessons (admin)
//  *     tags: [Lessons]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Full MCQ list with correct answers
//  */
lessonRouter.get('/admin/mcqs', protect, getAllMCQs);


// /**
//  * @swagger
//  * /api/v1/lessons/admin/essays:
//  *   get:
//  *     summary: Get all essay questions across all lessons (admin)
//  *     tags: [Lessons]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Full essay question list
//  */
lessonRouter.get('/admin/essays', protect, getAllEssayQuestions);


/**
 * @swagger
 * /api/v1/lessons/{id}:
 *   get:
 *     summary: Get lesson detail with user progress
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Lesson detail including video, transcript, module tree, user progress
 */
lessonRouter.get('/:id', protect, getLessonById);

/**
 * @swagger
 * /api/v1/lessons/{id}/track-video:
 *   patch:
 *     summary: Track video watch progress for a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentTime]
 *             properties:
 *               currentTime: { type: integer, description: "Seconds watched" }
 *               videoDuration: { type: integer, description: "Total video length in seconds" }
 *     responses:
 *       200:
 *         description: Progress tracked
 */
lessonRouter.patch('/:id/track-video', protect, trackVideoProgress);

/**
 * @swagger
 * /api/v1/lessons/{id}/track-time:
 *   patch:
 *     summary: Track time spent on a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [seconds]
 *             properties:
 *               seconds: { type: integer }
 *     responses:
 *       200:
 *         description: Time tracked
 */
lessonRouter.patch('/:id/track-time', protect, trackTimeSpent);



/**
 * @swagger
 * /api/v1/lessons/{id}/mcq:
 *   get:
 *     summary: Start MCQ quiz for a lesson
 *     tags: [Lesson MCQ]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a QuizSession and returns ONLY the first question.
 *       Subsequent questions are fetched one at a time via GET /lessons/mcq/next/:sessionId/:index.
 *
 *       The session stores all 7 question IDs internally — frontend never needs to
 *       track or send question IDs. Only sessionId is needed for all follow-up calls.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Session created, first question returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   description: Pass this to every subsequent MCQ call
 *                 lessonId: { type: string }
 *                 lessonTitle: { type: string }
 *                 subject: { type: string }
 *                 totalQuestions:
 *                   type: integer
 *                   description: Always ≤7, depends on how many MCQs exist for the lesson
 *                 currentQuestion:
 *                   type: integer
 *                   description: Always 1 on start
 *                 isLast:
 *                   type: boolean
 *                   description: true only if lesson has exactly 1 MCQ (rare edge case)
 *                 question:
 *                   type: object
 *                   properties:
 *                     id: { type: string }
 *                     text: { type: string }
 *                     options:
 *                       type: object
 *                       additionalProperties: { type: string }
 *                       example: { A: "Option A", B: "Option B", C: "Option C", D: "Option D" }
 *                     points: { type: integer }
 *       404:
 *         description: Lesson not found or no MCQ questions available
 */
lessonRouter.get('/:id/mcq', protect, getLessonMCQs);


// /**
//  * @swagger
//  * /api/v1/lessons/{id}/mcq/all:
//  *   get:
//  *     summary: Get all MCQs for a lesson including correct answers (admin/debug)
//  *     tags: [Lessons]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema: { type: string }
//  *     responses:
//  *       200:
//  *         description: Full MCQ list with correctAnswer and explanation
//  */
lessonRouter.get('/:id/mcq/all', protect, getAllLessonMCQs);

/**
 * @swagger
 * /api/v1/lessons/{id}/essay:
 *   get:
 *     summary: Start essay practice — get a random question for this lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a PracticeSession immediately and returns practiceSessionId.
 *       Store practiceSessionId — only thing needed for POST /essay/submit.
 *       Priority 1: questions linked to this lesson. Priority 2: same subject.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Practice session created, question returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 practiceSessionId: { type: string }
 *                 lessonId: { type: string }
 *                 lessonTitle: { type: string }
 *                 subject: { type: string }
 *                 question:
 *                   type: object
 *                   properties:
 *                     id: { type: string }
 *                     text: { type: string }
 *                     subject: { type: string }
 */
lessonRouter.get('/:id/essay', protect, getLessonEssayQuestion);



// /**
//  * @swagger
//  * /api/v1/lessons/{id}/essay/all:
//  *   get:
//  *     summary: Get all essay questions for a lesson (admin/debug)
//  *     tags: [Lessons]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema: { type: string }
//  *     responses:
//  *       200:
//  *         description: Full essay question list for this lesson
//  */
lessonRouter.get('/:id/essay/all', protect, getAllLessonEssayQuestions);



// /**
//  * @swagger
//  * /api/v1/lessons/subject/{subjectId}/modules:
//  *   get:
//  *     summary: Get all modules for a subject with user progress
//  *     tags: [Lessons]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: subjectId
//  *         required: true
//  *         schema: { type: string }
//  *     responses:
//  *       200:
//  *         description: Module list with lessons and progress per module
//  */
lessonRouter.get('/subject/:subjectId/modules', protect, getModulesBySubject);

export default lessonRouter;