import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getDashboardStats, getSubjectProgressDetail} from '../controllers/progress.controller';

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

/**
 * @swagger
 * /api/v1/progress/subject/{subjectId}:
 *   get:
 *     summary: Get detailed progress breakdown for a specific subject
 *     tags: [Progress & Analytics]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns comprehensive progress analytics for a subject including module breakdown, performance stats, and recent activity.
 *       
 *       **USE CASE:**
 *       - User clicks on a subject to see detailed progress
 *       - User wants to know which modules need more work
 *       - User tracks their improvement over time
 *       
 *       **RESPONSE INCLUDES:**
 *       - Subject overall progress and status
 *       - Breakdown by module (progress, quiz scores, completion)
 *       - Performance metrics (completion rate, average score, time spent)
 *       - Recent lessons completed in this subject
 *       
 *       **FRONTEND IMPLEMENTATION:**
 *       ```javascript
 *       // Fetch subject progress
 *       const response = await fetch('/api/v1/progress/subject/SUBJECT_ID');
 *       const { subject, modules, performance, recentLessons } = response.data;
 *       
 *       // Display subject header
 *       document.getElementById('subject-name').textContent = subject.name;
 *       document.getElementById('subject-progress').textContent = `${subject.progressPercent}%`;
 *       
 *       // Display progress ring/circle
 *       updateProgressRing(subject.progressPercent);
 *       
 *       // Display total time spent
 *       const hours = Math.floor(subject.totalTimeSeconds / 3600);
 *       document.getElementById('total-time').textContent = `${hours}h studied`;
 *       
 *       // Display module breakdown
 *       modules.forEach(module => {
 *         // Card showing:
 *         // "Module 1: Foundations"
 *         // "Progress: 60% (3/5 lessons)"
 *         // "Quiz Average: 78.5%"
 *         // Progress bar
 *         
 *         const moduleCard = createModuleCard({
 *           name: module.name,
 *           progress: module.progressPercent,
 *           lessons: `${module.completedLessons}/${module.totalLessons}`,
 *           quizAvg: module.quizAverage || 'N/A',
 *           status: module.status // NOT_STARTED, IN_PROGRESS, COMPLETED
 *         });
 *       });
 *       
 *       // Display performance stats
 *       document.getElementById('completion-rate').textContent = 
 *         `${performance.completionRate}% complete`;
 *       document.getElementById('avg-score').textContent = 
 *         `${performance.averageQuizScore}% avg score`;
 *       document.getElementById('questions-attempted').textContent = 
 *         `${performance.totalQuestionsAttempted} questions`;
 *       
 *       const weekHours = Math.floor(performance.timeSpentThisWeek / 3600);
 *       document.getElementById('week-time').textContent = 
 *         `${weekHours}h this week`;
 *       
 *       // Display recent activity
 *       recentLessons.forEach(lesson => {
 *         // Timeline entry:
 *         // "Completed 'Lesson 3: Actus Reus' in Module 1 - 2 days ago"
 *       });
 *       
 *       // Show weak modules (for recommendations)
 *       const weakModules = modules
 *         .filter(m => m.progressPercent < 50)
 *         .sort((a, b) => a.progressPercent - b.progressPercent);
 *       
 *       if (weakModules.length > 0) {
 *         showRecommendation(`Focus on: ${weakModules[0].name}`);
 *       }
 *       ```
 *       
 *       **UI SECTIONS:**
 *       
 *       1. **Subject Overview Card:**
 *       - Large progress circle
 *       - Status badge (In Progress/Completed)
 *       - Total time spent
 *       - Last accessed date
 *       
 *       2. **Module Breakdown:**
 *       - Grid/list of module cards
 *       - Each shows: name, progress bar, lesson count, quiz average
 *       - Click module to navigate to lessons
 *       
 *       3. **Performance Stats:**
 *       - Completion rate
 *       - Average quiz score
 *       - Questions attempted
 *       - Time spent this week
 *       
 *       4. **Recent Activity Timeline:**
 *       - Last 5 lessons completed
 *       - Timestamps (relative: "2 hours ago")
 *       
 *       5. **Recommendations:**
 *       - "Complete Module 2 to reach 50%"
 *       - "Your quiz scores in Module 3 are low - review lessons"
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
 *         description: Subject progress retrieved successfully
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
 *                   example: Subject progress retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     subject:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clx123abc
 *                         name:
 *                           type: string
 *                           example: Criminal Law
 *                         progressPercent:
 *                           type: number
 *                           example: 45.5
 *                         status:
 *                           type: string
 *                           enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
 *                           example: IN_PROGRESS
 *                         totalTimeSeconds:
 *                           type: integer
 *                           example: 14400
 *                           description: 4 hours total
 *                         lastAccessedAt:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                           example: "2026-02-03T10:30:00Z"
 *                     modules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: clx456def
 *                           name:
 *                             type: string
 *                             example: "Module 1: Foundations of Criminal Law"
 *                           progressPercent:
 *                             type: number
 *                             example: 60
 *                           status:
 *                             type: string
 *                             enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
 *                             example: IN_PROGRESS
 *                           completedLessons:
 *                             type: integer
 *                             example: 3
 *                           totalLessons:
 *                             type: integer
 *                             example: 5
 *                           quizAverage:
 *                             type: number
 *                             nullable: true
 *                             example: 78.5
 *                             description: Average score on MCQ quizzes for this module
 *                     performance:
 *                       type: object
 *                       properties:
 *                         totalLessonsCompleted:
 *                           type: integer
 *                           example: 12
 *                         totalLessons:
 *                           type: integer
 *                           example: 40
 *                         totalQuestionsAttempted:
 *                           type: integer
 *                           example: 67
 *                         averageQuizScore:
 *                           type: number
 *                           example: 76.3
 *                         timeSpentThisWeek:
 *                           type: integer
 *                           example: 7200
 *                           description: 2 hours this week
 *                         completionRate:
 *                           type: number
 *                           example: 30
 *                           description: Percentage of lessons completed
 *                     recentLessons:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: clx789ghi
 *                           title:
 *                             type: string
 *                             example: "Lesson 3: Actus Reus"
 *                           moduleName:
 *                             type: string
 *                             example: "Module 1: Foundations"
 *                           completedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2026-02-03T14:20:00Z"
 *       404:
 *         description: Subject progress not found
 */
progressRouter.get(
  '/subject/:subjectId',
  protect,
  getSubjectProgressDetail
);

export default progressRouter;