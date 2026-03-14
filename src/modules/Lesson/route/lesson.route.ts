// src/modules/content/routes/lesson.routes.ts

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import {
  trackVideoProgress,
  trackTimeSpent,
  getModulesBySubject,
  getLessonById,
  getLessonMCQs,
  getLessonEssayQuestion,
  submitLessonEssay,
  getAllLessonMCQs,
  getAllLessonEssayQuestions,
} from '../controller/lesson.controller';

const lessonRouter = Router();

// ─── ROUTE ORDER MATTERS ──────────────────────────────────────────────────────
// Static routes (/subject/:x, /essay/submit) MUST be registered before
// the dynamic /:id route, otherwise Express will try to match "essay" as a lessonId.

/**
 * @swagger
 * /api/v1/lessons/subject/{subjectId}/modules:
 *   get:
 *     summary: Get all modules for a subject with their lessons
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns all published modules for a subject, each with its lessons array,
 *       user progress status (NOT_STARTED | IN_PROGRESS | COMPLETED),
 *       and completed/total lesson counts.
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Returns modules[] with lessons[], status, and progress
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       name: { type: string }
 *                       slug: { type: string, nullable: true }
 *                       order: { type: integer }
 *                       status:
 *                         type: string
 *                         enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
 *                       progress:
 *                         type: object
 *                         properties:
 *                           completedLessons: { type: integer }
 *                           totalLessons: { type: integer }
 *                       lessons:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id: { type: string }
 *                             title: { type: string }
 *                             order: { type: integer }
 */
lessonRouter.get('/subject/:subjectId/modules', protect, getModulesBySubject);

/**
 * @swagger
 * /api/v1/lessons/essay/submit:
 *   post:
 *     summary: Submit a lesson essay for AI grading
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Grades the student's answer using Claude AI and returns the COMPLETE
 *       review screen data in a single response. No follow-up request is needed.
 *
 *       The response includes:
 *       - The original question text
 *       - The student's answer (echoed back)
 *       - AI score out of 20 and grade band
 *       - appPass (score >= 80/100 → 16/20) and passed (score >= 50/100 → 10/20)
 *       - Structured feedback, strengths[], improvements[]
 *       - sampleAnswer — the ideal answer for comparison
 *
 *       The EssayAttempt is saved with source=LESSON_PRACTICE and will appear
 *       in the student's history.
 *
 *       NOTE: essayQuestionId is an EssayQuestion.id (from the dedicated question
 *       bank), NOT a Question.id from the MCQ/practice model.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [lessonId, essayQuestionId, answerText]
 *             properties:
 *               lessonId:
 *                 type: string
 *                 description: The lesson the student was practising on
 *               essayQuestionId:
 *                 type: string
 *                 description: EssayQuestion.id from GET /lessons/:id/essay
 *               answerText:
 *                 type: string
 *                 description: The student's written answer (min ~20 words)
 *     responses:
 *       200:
 *         description: Essay graded — full review data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptId: { type: string }
 *                 lessonId: { type: string }
 *                 lessonTitle: { type: string }
 *                 question:
 *                   type: object
 *                   properties:
 *                     id: { type: string }
 *                     text: { type: string }
 *                     subject: { type: string }
 *                 userAnswer: { type: string }
 *                 aiScore: { type: integer, description: "Score out of 20" }
 *                 scoreOutOf: { type: integer, example: 20 }
 *                 band:
 *                   type: string
 *                   example: "Merit"
 *                   description: "Distinction | Merit | Pass | Fail"
 *                 appPass:
 *                   type: boolean
 *                   description: "true if score >= 16/20 (80%)"
 *                 passed:
 *                   type: boolean
 *                   description: "true if score >= 10/20 (50%)"
 *                 feedback: { type: object, nullable: true }
 *                 strengths:
 *                   type: array
 *                   items: { type: string }
 *                 improvements:
 *                   type: array
 *                   items: { type: string }
 *                 sampleAnswer:
 *                   type: string
 *                   nullable: true
 *                   description: The ideal answer for the student to compare against
 *                 timeTakenSeconds: { type: integer }
 *                 wordCount: { type: integer }
 */
lessonRouter.post('/essay/submit', protect, submitLessonEssay);

/**
 * @swagger
 * /api/v1/lessons/{id}:
 *   get:
 *     summary: Get full lesson detail — video, transcript, progress, sidebar
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns the full lesson detail page data:
 *       - videoUrl, videoDuration, transcript, content
 *       - User's current progress (videoWatchedSeconds, isCompleted, etc.)
 *       - subjectModules: full module/lesson list for the sidebar navigation
 *
 *       Creates a userLessonProgress record (all zeros) if first time accessing.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Full lesson data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 title: { type: string }
 *                 slug: { type: string, nullable: true }
 *                 videoUrl: { type: string, nullable: true }
 *                 videoDuration: { type: number, nullable: true }
 *                 transcript: { type: string, nullable: true }
 *                 content: { type: string, nullable: true }
 *                 order: { type: integer }
 *                 module:
 *                   type: object
 *                   properties:
 *                     id: { type: string }
 *                     name: { type: string }
 *                     subjectId: { type: string }
 *                     subjectName: { type: string }
 *                 userProgress:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     isCompleted: { type: boolean }
 *                     videoWatchedSeconds: { type: number }
 *                     timeSpentSeconds: { type: number }
 *                     lastAccessedAt: { type: string, format: date-time, nullable: true }
 *                 subjectModules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       name: { type: string }
 *                       order: { type: integer }
 *                       lessons:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id: { type: string }
 *                             title: { type: string }
 *                             order: { type: integer }
 */
lessonRouter.get('/:id', protect, getLessonById);

/**
 * @swagger
 * /api/v1/lessons/{id}/mcq:
 *   get:
 *     summary: Get up to 7 randomised MCQ questions for a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns up to 7 MCQ questions linked to this lesson, randomised on every call.
 *       Used for the "Quick Quizzes" button on the lesson page.
 *       Options are returned as a key-value map: { A: "...", B: "...", C: "...", D: "..." }
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Returns lessonId, lessonTitle, and questions[] (max 7)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessonId: { type: string }
 *                 lessonTitle: { type: string }
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       text: { type: string }
 *                       options:
 *                         type: object
 *                         additionalProperties: { type: string }
 *                       points: { type: integer }
 */
lessonRouter.get('/:id/mcq', protect, getLessonMCQs);

/**
 * @swagger
 * /api/v1/lessons/{id}/essay:
 *   get:
 *     summary: Get a random essay question for lesson practice
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns one randomly selected essay question for the student to practise on.
 *       Source: EssayQuestion bank (the dedicated 747-question bank).
 *
 *       Lookup priority:
 *       1. EssayQuestions linked directly to this lesson
 *       2. Any EssayQuestion in the same subject (fallback)
 *
 *       Triggered when the student clicks "Essay Practice" on the lesson page.
 *       The returned question.id is an EssayQuestion.id — pass it as
 *       essayQuestionId when submitting.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: One random essay question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessonId: { type: string }
 *                 lessonTitle: { type: string }
 *                 question:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: EssayQuestion.id — pass as essayQuestionId on submit
 *                     text: { type: string }
 *                     subject: { type: string }
 */
lessonRouter.get('/:id/essay', protect, getLessonEssayQuestion);

/**
 * @swagger
 * /api/v1/lessons/{id}/track-video:
 *   post:
 *     summary: Track video watch progress for a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Called periodically as the student watches the lesson video.
 *       Marks lesson as completed once currentTime >= 90% of total duration.
 *       Triggers recalculation of module and subject progress.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Lesson ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentTime]
 *             properties:
 *               currentTime:
 *                 type: number
 *                 description: Current video position in seconds
 *               videoDuration:
 *                 type: number
 *                 description: Total video duration in seconds (stored if not already set)
 *     responses:
 *       200:
 *         description: Progress tracked
 */
lessonRouter.post('/:id/track-video', protect, trackVideoProgress);

/**
 * @swagger
 * /api/v1/lessons/{id}/track-time:
 *   post:
 *     summary: Increment time spent on a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: Adds the given seconds to the user's time spent on this lesson and subject.
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
 *               seconds:
 *                 type: integer
 *                 description: Seconds to add
 *     responses:
 *       200:
 *         description: Time tracked successfully
 */
lessonRouter.post('/:id/track-time', protect, trackTimeSpent);

/**
 * @swagger
 * /api/v1/lessons/{id}/mcq/all:
 *   get:
 *     summary: Get ALL MCQ questions for a lesson (no cap)
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns every published MCQ question linked to this lesson, ordered by question order.
 *       Unlike GET /lessons/:id/mcq which caps at 7 and randomises,
 *       this returns the complete set — useful for admin review or frontend caching.
 *       Includes correctAnswer and explanation fields.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: All MCQ questions for this lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessonId: { type: string }
 *                 lessonTitle: { type: string }
 *                 total: { type: integer }
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       text: { type: string }
 *                       options:
 *                         type: object
 *                         additionalProperties: { type: string }
 *                       points: { type: integer }
 *                       correctAnswer: { type: string }
 *                       explanation: { type: string, nullable: true }
 */
lessonRouter.get('/:id/mcq/all', protect, getAllLessonMCQs);

/**
 * @swagger
 * /api/v1/lessons/{id}/essay/all:
 *   get:
 *     summary: Get ALL essay questions for a lesson from the question bank
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns every published EssayQuestion from the dedicated essay bank
 *       that is linked directly to this lesson (by lessonId).
 *       Unlike GET /lessons/:id/essay which picks one at random,
 *       this returns the complete set.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: All essay questions for this lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessonId: { type: string }
 *                 lessonTitle: { type: string }
 *                 subject: { type: string }
 *                 total: { type: integer }
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       text: { type: string }
 *                       subject: { type: string }
 */
lessonRouter.get('/:id/essay/all', protect, getAllLessonEssayQuestions);


export default lessonRouter;