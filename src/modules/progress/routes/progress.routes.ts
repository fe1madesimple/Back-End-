

import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getDashboardStats } from '../controllers/progress.controller';

const progressRouter = Router();

/**
 * @swagger
 * /api/v1/progress/dashboard:
 *   get:
 *     summary: Get user's overall dashboard statistics
 *     tags: [Progress & Analytics]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns comprehensive dashboard statistics including overall progress, today's activity, weekly summary, and upcoming goals.
 *
 *       **USE CASE:**
 *       - User opens app homepage/dashboard
 *       - Frontend displays overview of their progress
 *       - Shows daily goals, study time, and achievements
 *
 *       **RESPONSE INCLUDES:**
 *       - Overall progress across all subjects
 *       - Today's activity (time spent, lessons completed, questions attempted)
 *       - This week's activity summary
 *       - Recent activity feed
 *       - Upcoming exam countdown and daily goal progress
 *
 *       **FRONTEND IMPLEMENTATION:**
 *       ```javascript
 *       // Fetch dashboard stats
 *       const response = await fetch('/api/v1/progress/dashboard');
 *       const stats = response.data;
 *
 *       // Display overall progress
 *       document.getElementById('avg-progress').textContent = `${stats.overallProgress.averageProgress}%`;
 *       document.getElementById('completed-subjects').textContent =
 *         `${stats.overallProgress.completedSubjects}/${stats.overallProgress.totalSubjects}`;
 *
 *       // Display today's activity
 *       const hours = Math.floor(stats.todayActivity.timeSpentSeconds / 3600);
 *       const minutes = Math.floor((stats.todayActivity.timeSpentSeconds % 3600) / 60);
 *       document.getElementById('today-time').textContent = `${hours}h ${minutes}m`;
 *       document.getElementById('today-lessons').textContent = stats.todayActivity.lessonsCompleted;
 *
 *       // Display daily goal progress
 *       const goalHours = stats.upcomingGoals.dailyStudyGoal;
 *       const todayProgress = stats.upcomingGoals.todayProgress;
 *       document.getElementById('daily-goal').innerHTML =
 *         `Goal: ${goalHours}h/day - ${todayProgress}% complete today`;
 *
 *       // Display exam countdown
 *       if (stats.upcomingGoals.daysUntilExam) {
 *         document.getElementById('exam-countdown').textContent =
 *           `${stats.upcomingGoals.daysUntilExam} days until exam`;
 *       }
 *
 *       // Display recent activity feed
 *       stats.recentActivity.forEach(activity => {
 *         // Show: "Completed 'Lesson 1: Characteristics' in Criminal Law - 2 hours ago"
 *       });
 *
 *       // Display weekly summary
 *       const weekHours = Math.floor(stats.weekActivity.totalTimeSeconds / 3600);
 *       document.getElementById('week-summary').innerHTML = `
 *         This week: ${weekHours}h studied,
 *         ${stats.weekActivity.lessonsCompleted} lessons,
 *         ${stats.weekActivity.averageScore}% avg score
 *       `;
 *       ```
 *
 *       **DASHBOARD WIDGETS:**
 *       - Progress ring showing average completion
 *       - "Today's Study Time" with goal progress bar
 *       - "Exam Countdown" timer
 *       - Recent activity timeline
 *       - Weekly stats summary card
 *
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved successfully
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
 *                   example: Dashboard stats retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     overallProgress:
 *                       type: object
 *                       properties:
 *                         totalSubjects:
 *                           type: integer
 *                           example: 8
 *                         completedSubjects:
 *                           type: integer
 *                           example: 2
 *                         averageProgress:
 *                           type: number
 *                           example: 34.5
 *                     todayActivity:
 *                       type: object
 *                       properties:
 *                         timeSpentSeconds:
 *                           type: integer
 *                           example: 7200
 *                           description: 2 hours
 *                         lessonsCompleted:
 *                           type: integer
 *                           example: 3
 *                         questionsAttempted:
 *                           type: integer
 *                           example: 15
 *                     weekActivity:
 *                       type: object
 *                       properties:
 *                         totalTimeSeconds:
 *                           type: integer
 *                           example: 25200
 *                           description: 7 hours
 *                         lessonsCompleted:
 *                           type: integer
 *                           example: 12
 *                         questionsAttempted:
 *                           type: integer
 *                           example: 45
 *                         averageScore:
 *                           type: number
 *                           example: 78.5
 *                     recentActivity:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             enum: [LESSON, QUIZ, ESSAY]
 *                             example: LESSON
 *                           title:
 *                             type: string
 *                             example: "Lesson 1: Characteristics of a Crime"
 *                           subjectName:
 *                             type: string
 *                             example: Criminal Law
 *                           timestamp:
 *                             type: string
 *                             format: date-time
 *                             example: "2026-02-03T14:30:00Z"
 *                     upcomingGoals:
 *                       type: object
 *                       properties:
 *                         targetExamDate:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                           example: "2026-04-15T09:00:00Z"
 *                         daysUntilExam:
 *                           type: integer
 *                           nullable: true
 *                           example: 71
 *                         dailyStudyGoal:
 *                           type: integer
 *                           example: 2
 *                           description: Hours per day
 *                         todayProgress:
 *                           type: integer
 *                           example: 65
 *                           description: Percentage of daily goal completed
 */
progressRouter.get('/dashboard', protect, getDashboardStats);

export default progressRouter;
