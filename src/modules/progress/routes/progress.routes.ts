import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import { getDashboardStats, getSubjectProgressDetail, getStudyStreak} from '../controllers/progress.controller';

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


/**
 * @swagger
 * /api/v1/progress/study-streak:
 *   get:
 *     summary: Get user's study streak and daily activity calendar
 *     tags: [Progress & Analytics]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns study streak statistics, daily goal progress, and activity calendar for visualization.
 *       
 *       **USE CASE:**
 *       - User views their study consistency
 *       - Motivate users with streak tracking (gamification)
 *       - Display activity calendar (GitHub-style heatmap)
 *       - Track daily goal completion
 *       
 *       **RESPONSE INCLUDES:**
 *       - Current active streak (consecutive days studied)
 *       - Longest streak ever
 *       - Total study days
 *       - Today's goal progress
 *       - Last 7 days activity (for weekly chart)
 *       - Last 30 days calendar (for heatmap)
 *       - Historical streaks
 *       
 *       **FRONTEND IMPLEMENTATION:**
 *       ```javascript
 *       // Fetch study streak
 *       const response = await fetch('/api/v1/progress/study-streak');
 *       const streak = response.data;
 *       
 *       // Display streak badges
 *       document.getElementById('current-streak').innerHTML = `
 *         <div class="streak-badge">
 *           🔥 ${streak.currentStreak} day streak
 *         </div>
 *       `;
 *       
 *       document.getElementById('longest-streak').textContent = 
 *         `Best: ${streak.longestStreak} days`;
 *       
 *       // Display today's goal progress
 *       const progress = streak.dailyGoal;
 *       document.getElementById('daily-goal').innerHTML = `
 *         Goal: ${progress.targetHours}h/day
 *         <div class="progress-bar">
 *           <div style="width: ${progress.todayProgress}%"></div>
 *         </div>
 *         ${progress.todayMinutes} min today
 *         ${progress.goalMet ? '✓ Goal met!' : ''}
 *       `;
 *       
 *       // Display week activity bar chart
 *       streak.weekActivity.forEach(day => {
 *         const bar = document.createElement('div');
 *         bar.className = 'activity-bar';
 *         bar.style.height = `${(day.minutesStudied / (progress.targetHours * 60)) * 100}%`;
 *         bar.classList.toggle('goal-met', day.goalMet);
 *         bar.title = `${new Date(day.date).toLocaleDateString()}: ${day.minutesStudied} min`;
 *         weekChart.appendChild(bar);
 *       });
 *       
 *       // Display GitHub-style activity heatmap
 *       const heatmap = document.getElementById('activity-heatmap');
 *       streak.monthCalendar.forEach(day => {
 *         const cell = document.createElement('div');
 *         cell.className = 'heatmap-cell';
 *         
 *         // Color intensity based on study time
 *         if (day.minutesStudied === 0) {
 *           cell.classList.add('level-0'); // Gray
 *         } else if (day.minutesStudied < 60) {
 *           cell.classList.add('level-1'); // Light green
 *         } else if (day.minutesStudied < 120) {
 *           cell.classList.add('level-2'); // Medium green
 *         } else {
 *           cell.classList.add('level-3'); // Dark green
 *         }
 *         
 *         cell.title = `${new Date(day.date).toLocaleDateString()}: ${day.minutesStudied} min`;
 *         heatmap.appendChild(cell);
 *       });
 *       
 *       // Display streak history
 *       streak.streakHistory.forEach(s => {
 *         // "15-day streak: Jan 10 - Jan 25, 2026"
 *         const start = new Date(s.startDate).toLocaleDateString();
 *         const end = new Date(s.endDate).toLocaleDateString();
 *         console.log(`${s.lengthDays}-day streak: ${start} - ${end}`);
 *       });
 *       
 *       // Motivational messages
 *       if (streak.currentStreak === 0) {
 *         showMotivation("Start your streak today! Study for just 10 minutes.");
 *       } else if (streak.currentStreak < 7) {
 *         showMotivation(`Keep it up! ${7 - streak.currentStreak} more days to reach a 7-day streak!`);
 *       } else if (streak.currentStreak === streak.longestStreak) {
 *         showMotivation("🎉 New personal record! You're crushing it!");
 *       }
 *       ```
 *       
 *       **UI COMPONENTS:**
 *       
 *       1. **Streak Badge:**
 *       - 🔥 icon with current streak number
 *       - "Best: X days" below
 *       - Celebrate milestones (7, 14, 30, 100 days)
 *       
 *       2. **Daily Goal Progress:**
 *       - Progress bar showing today's completion
 *       - "2h goal - 1h 23m studied (65%)"
 *       - Checkmark when goal met
 *       
 *       3. **Weekly Bar Chart:**
 *       - 7 vertical bars (one per day)
 *       - Height = minutes studied
 *       - Green if goal met, gray if not
 *       - Hover shows exact time
 *       
 *       4. **Monthly Heatmap (GitHub-style):**
 *       - 30 squares in grid
 *       - Color intensity = study time
 *       - Dark green = 2h+, light green = 1h, gray = 0
 *       - Click to see day details
 *       
 *       5. **Streak History:**
 *       - Timeline of past streaks
 *       - "15-day streak in January"
 *       - Shows consistency over time
 *       
 *       **GAMIFICATION IDEAS:**
 *       - Award badges: 7-day, 30-day, 100-day streaks
 *       - "Don't break the chain!" motivation
 *       - Share streak on social media
 *       - Leaderboard (optional)
 *       
 *     responses:
 *       200:
 *         description: Study streak retrieved successfully
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
 *                   example: Study streak retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentStreak:
 *                       type: integer
 *                       example: 5
 *                       description: Current consecutive days studied
 *                     longestStreak:
 *                       type: integer
 *                       example: 15
 *                       description: Longest ever consecutive streak
 *                     totalStudyDays:
 *                       type: integer
 *                       example: 42
 *                       description: Total number of days studied (lifetime)
 *                     dailyGoal:
 *                       type: object
 *                       properties:
 *                         targetHours:
 *                           type: integer
 *                           example: 2
 *                         todayProgress:
 *                           type: integer
 *                           example: 65
 *                           description: Percentage of daily goal completed today
 *                         todayMinutes:
 *                           type: integer
 *                           example: 78
 *                           description: Minutes studied today
 *                         goalMet:
 *                           type: boolean
 *                           example: false
 *                     weekActivity:
 *                       type: array
 *                       description: Last 7 days activity (for bar chart)
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             example: "2026-02-03"
 *                           minutesStudied:
 *                             type: integer
 *                             example: 145
 *                           goalMet:
 *                             type: boolean
 *                             example: true
 *                     monthCalendar:
 *                       type: array
 *                       description: Last 30 days activity (for heatmap)
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             example: "2026-01-15"
 *                           minutesStudied:
 *                             type: integer
 *                             example: 90
 *                           goalMet:
 *                             type: boolean
 *                             example: false
 *                     streakHistory:
 *                       type: array
 *                       description: Past streaks (last 5, minimum 3 days each)
 *                       items:
 *                         type: object
 *                         properties:
 *                           startDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2026-01-10T00:00:00Z"
 *                           endDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2026-01-25T00:00:00Z"
 *                           lengthDays:
 *                             type: integer
 *                             example: 15
 */
progressRouter.get('/study-streak', protect, getStudyStreak);

export default progressRouter;