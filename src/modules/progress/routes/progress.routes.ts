import { Router } from 'express';
import { protect } from '@/shared/middleware/auth.middleware';
import {
  getSimpleDashboard,
  getStudyOverview,
} from '../controllers/progress.controller';

const progressRouter = Router();

// /**
//  * @swagger
//  * /api/v1/progress/dashboard:
//  *   get:
//  *     summary: Get user's overall dashboard statistics
//  *     tags: [Progress & Analytics]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns comprehensive dashboard statistics including overall progress, today's activity, weekly summary, and upcoming goals.
//  *
//  *       **USE CASE:**
//  *       - User opens app homepage/dashboard
//  *       - Frontend displays overview of their progress
//  *       - Shows daily goals, study time, and achievements
//  *
//  *       **RESPONSE INCLUDES:**
//  *       - Overall progress across all subjects
//  *       - Today's activity (time spent, lessons completed, questions attempted)
//  *       - This week's activity summary
//  *       - Recent activity feed
//  *       - Upcoming exam countdown and daily goal progress
//  *
//  *       **FRONTEND IMPLEMENTATION:**
//  *       ```javascript
//  *       // Fetch dashboard stats
//  *       const response = await fetch('/api/v1/progress/dashboard');
//  *       const stats = response.data;
//  *
//  *       // Display overall progress
//  *       document.getElementById('avg-progress').textContent = `${stats.overallProgress.averageProgress}%`;
//  *       document.getElementById('completed-subjects').textContent =
//  *         `${stats.overallProgress.completedSubjects}/${stats.overallProgress.totalSubjects}`;
//  *
//  *       // Display today's activity
//  *       const hours = Math.floor(stats.todayActivity.timeSpentSeconds / 3600);
//  *       const minutes = Math.floor((stats.todayActivity.timeSpentSeconds % 3600) / 60);
//  *       document.getElementById('today-time').textContent = `${hours}h ${minutes}m`;
//  *       document.getElementById('today-lessons').textContent = stats.todayActivity.lessonsCompleted;
//  *
//  *       // Display daily goal progress
//  *       const goalHours = stats.upcomingGoals.dailyStudyGoal;
//  *       const todayProgress = stats.upcomingGoals.todayProgress;
//  *       document.getElementById('daily-goal').innerHTML =
//  *         `Goal: ${goalHours}h/day - ${todayProgress}% complete today`;
//  *
//  *       // Display exam countdown
//  *       if (stats.upcomingGoals.daysUntilExam) {
//  *         document.getElementById('exam-countdown').textContent =
//  *           `${stats.upcomingGoals.daysUntilExam} days until exam`;
//  *       }
//  *
//  *       // Display recent activity feed
//  *       stats.recentActivity.forEach(activity => {
//  *         // Show: "Completed 'Lesson 1: Characteristics' in Criminal Law - 2 hours ago"
//  *       });
//  *
//  *       // Display weekly summary
//  *       const weekHours = Math.floor(stats.weekActivity.totalTimeSeconds / 3600);
//  *       document.getElementById('week-summary').innerHTML = `
//  *         This week: ${weekHours}h studied,
//  *         ${stats.weekActivity.lessonsCompleted} lessons,
//  *         ${stats.weekActivity.averageScore}% avg score
//  *       `;
//  *       ```
//  *
//  *       **DASHBOARD WIDGETS:**
//  *       - Progress ring showing average completion
//  *       - "Today's Study Time" with goal progress bar
//  *       - "Exam Countdown" timer
//  *       - Recent activity timeline
//  *       - Weekly stats summary card
//  *
//  *     responses:
//  *       200:
//  *         description: Dashboard stats retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: Dashboard stats retrieved
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     overallProgress:
//  *                       type: object
//  *                       properties:
//  *                         totalSubjects:
//  *                           type: integer
//  *                           example: 8
//  *                         completedSubjects:
//  *                           type: integer
//  *                           example: 2
//  *                         averageProgress:
//  *                           type: number
//  *                           example: 34.5
//  *                     todayActivity:
//  *                       type: object
//  *                       properties:
//  *                         timeSpentSeconds:
//  *                           type: integer
//  *                           example: 7200
//  *                           description: 2 hours
//  *                         lessonsCompleted:
//  *                           type: integer
//  *                           example: 3
//  *                         questionsAttempted:
//  *                           type: integer
//  *                           example: 15
//  *                     weekActivity:
//  *                       type: object
//  *                       properties:
//  *                         totalTimeSeconds:
//  *                           type: integer
//  *                           example: 25200
//  *                           description: 7 hours
//  *                         lessonsCompleted:
//  *                           type: integer
//  *                           example: 12
//  *                         questionsAttempted:
//  *                           type: integer
//  *                           example: 45
//  *                         averageScore:
//  *                           type: number
//  *                           example: 78.5
//  *                     recentActivity:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           type:
//  *                             type: string
//  *                             enum: [LESSON, QUIZ, ESSAY]
//  *                             example: LESSON
//  *                           title:
//  *                             type: string
//  *                             example: "Lesson 1: Characteristics of a Crime"
//  *                           subjectName:
//  *                             type: string
//  *                             example: Criminal Law
//  *                           timestamp:
//  *                             type: string
//  *                             format: date-time
//  *                             example: "2026-02-03T14:30:00Z"
//  *                     upcomingGoals:
//  *                       type: object
//  *                       properties:
//  *                         targetExamDate:
//  *                           type: string
//  *                           format: date-time
//  *                           nullable: true
//  *                           example: "2026-04-15T09:00:00Z"
//  *                         daysUntilExam:
//  *                           type: integer
//  *                           nullable: true
//  *                           example: 71
//  *                         dailyStudyGoal:
//  *                           type: integer
//  *                           example: 2
//  *                           description: Hours per day
//  *                         todayProgress:
//  *                           type: integer
//  *                           example: 65
//  *                           description: Percentage of daily goal completed
//  */
// progressRouter.get('/dashboard', protect, getDashboardStats);

// /**
//  * @swagger
//  * /api/v1/progress/study-streak:
//  *   get:
//  *     summary: Get user's study streak and daily activity calendar
//  *     tags: [Progress & Analytics]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns study streak statistics, daily goal progress, and activity calendar for visualization.
//  *
//  *       **USE CASE:**
//  *       - User views their study consistency
//  *       - Motivate users with streak tracking (gamification)
//  *       - Display activity calendar (GitHub-style heatmap)
//  *       - Track daily goal completion
//  *
//  *       **RESPONSE INCLUDES:**
//  *       - Current active streak (consecutive days studied)
//  *       - Longest streak ever
//  *       - Total study days
//  *       - Today's goal progress
//  *       - Last 7 days activity (for weekly chart)
//  *       - Last 30 days calendar (for heatmap)
//  *       - Historical streaks
//  *
//  *       **FRONTEND IMPLEMENTATION:**
//  *       ```javascript
//  *       // Fetch study streak
//  *       const response = await fetch('/api/v1/progress/study-streak');
//  *       const streak = response.data;
//  *
//  *       // Display streak badges
//  *       document.getElementById('current-streak').innerHTML = `
//  *         <div class="streak-badge">
//  *           🔥 ${streak.currentStreak} day streak
//  *         </div>
//  *       `;
//  *
//  *       document.getElementById('longest-streak').textContent =
//  *         `Best: ${streak.longestStreak} days`;
//  *
//  *       // Display today's goal progress
//  *       const progress = streak.dailyGoal;
//  *       document.getElementById('daily-goal').innerHTML = `
//  *         Goal: ${progress.targetHours}h/day
//  *         <div class="progress-bar">
//  *           <div style="width: ${progress.todayProgress}%"></div>
//  *         </div>
//  *         ${progress.todayMinutes} min today
//  *         ${progress.goalMet ? '✓ Goal met!' : ''}
//  *       `;
//  *
//  *       // Display week activity bar chart
//  *       streak.weekActivity.forEach(day => {
//  *         const bar = document.createElement('div');
//  *         bar.className = 'activity-bar';
//  *         bar.style.height = `${(day.minutesStudied / (progress.targetHours * 60)) * 100}%`;
//  *         bar.classList.toggle('goal-met', day.goalMet);
//  *         bar.title = `${new Date(day.date).toLocaleDateString()}: ${day.minutesStudied} min`;
//  *         weekChart.appendChild(bar);
//  *       });
//  *
//  *       // Display GitHub-style activity heatmap
//  *       const heatmap = document.getElementById('activity-heatmap');
//  *       streak.monthCalendar.forEach(day => {
//  *         const cell = document.createElement('div');
//  *         cell.className = 'heatmap-cell';
//  *
//  *         // Color intensity based on study time
//  *         if (day.minutesStudied === 0) {
//  *           cell.classList.add('level-0'); // Gray
//  *         } else if (day.minutesStudied < 60) {
//  *           cell.classList.add('level-1'); // Light green
//  *         } else if (day.minutesStudied < 120) {
//  *           cell.classList.add('level-2'); // Medium green
//  *         } else {
//  *           cell.classList.add('level-3'); // Dark green
//  *         }
//  *
//  *         cell.title = `${new Date(day.date).toLocaleDateString()}: ${day.minutesStudied} min`;
//  *         heatmap.appendChild(cell);
//  *       });
//  *
//  *       // Display streak history
//  *       streak.streakHistory.forEach(s => {
//  *         // "15-day streak: Jan 10 - Jan 25, 2026"
//  *         const start = new Date(s.startDate).toLocaleDateString();
//  *         const end = new Date(s.endDate).toLocaleDateString();
//  *         console.log(`${s.lengthDays}-day streak: ${start} - ${end}`);
//  *       });
//  *
//  *       // Motivational messages
//  *       if (streak.currentStreak === 0) {
//  *         showMotivation("Start your streak today! Study for just 10 minutes.");
//  *       } else if (streak.currentStreak < 7) {
//  *         showMotivation(`Keep it up! ${7 - streak.currentStreak} more days to reach a 7-day streak!`);
//  *       } else if (streak.currentStreak === streak.longestStreak) {
//  *         showMotivation("🎉 New personal record! You're crushing it!");
//  *       }
//  *       ```
//  *
//  *       **UI COMPONENTS:**
//  *
//  *       1. **Streak Badge:**
//  *       - 🔥 icon with current streak number
//  *       - "Best: X days" below
//  *       - Celebrate milestones (7, 14, 30, 100 days)
//  *
//  *       2. **Daily Goal Progress:**
//  *       - Progress bar showing today's completion
//  *       - "2h goal - 1h 23m studied (65%)"
//  *       - Checkmark when goal met
//  *
//  *       3. **Weekly Bar Chart:**
//  *       - 7 vertical bars (one per day)
//  *       - Height = minutes studied
//  *       - Green if goal met, gray if not
//  *       - Hover shows exact time
//  *
//  *       4. **Monthly Heatmap (GitHub-style):**
//  *       - 30 squares in grid
//  *       - Color intensity = study time
//  *       - Dark green = 2h+, light green = 1h, gray = 0
//  *       - Click to see day details
//  *
//  *       5. **Streak History:**
//  *       - Timeline of past streaks
//  *       - "15-day streak in January"
//  *       - Shows consistency over time
//  *
//  *       **GAMIFICATION IDEAS:**
//  *       - Award badges: 7-day, 30-day, 100-day streaks
//  *       - "Don't break the chain!" motivation
//  *       - Share streak on social media
//  *       - Leaderboard (optional)
//  *
//  *     responses:
//  *       200:
//  *         description: Study streak retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: Study streak retrieved
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     currentStreak:
//  *                       type: integer
//  *                       example: 5
//  *                       description: Current consecutive days studied
//  *                     longestStreak:
//  *                       type: integer
//  *                       example: 15
//  *                       description: Longest ever consecutive streak
//  *                     totalStudyDays:
//  *                       type: integer
//  *                       example: 42
//  *                       description: Total number of days studied (lifetime)
//  *                     dailyGoal:
//  *                       type: object
//  *                       properties:
//  *                         targetHours:
//  *                           type: integer
//  *                           example: 2
//  *                         todayProgress:
//  *                           type: integer
//  *                           example: 65
//  *                           description: Percentage of daily goal completed today
//  *                         todayMinutes:
//  *                           type: integer
//  *                           example: 78
//  *                           description: Minutes studied today
//  *                         goalMet:
//  *                           type: boolean
//  *                           example: false
//  *                     weekActivity:
//  *                       type: array
//  *                       description: Last 7 days activity (for bar chart)
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           date:
//  *                             type: string
//  *                             example: "2026-02-03"
//  *                           minutesStudied:
//  *                             type: integer
//  *                             example: 145
//  *                           goalMet:
//  *                             type: boolean
//  *                             example: true
//  *                     monthCalendar:
//  *                       type: array
//  *                       description: Last 30 days activity (for heatmap)
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           date:
//  *                             type: string
//  *                             example: "2026-01-15"
//  *                           minutesStudied:
//  *                             type: integer
//  *                             example: 90
//  *                           goalMet:
//  *                             type: boolean
//  *                             example: false
//  *                     streakHistory:
//  *                       type: array
//  *                       description: Past streaks (last 5, minimum 3 days each)
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           startDate:
//  *                             type: string
//  *                             format: date-time
//  *                             example: "2026-01-10T00:00:00Z"
//  *                           endDate:
//  *                             type: string
//  *                             format: date-time
//  *                             example: "2026-01-25T00:00:00Z"
//  *                           lengthDays:
//  *                             type: integer
//  *                             example: 15
//  */
// progressRouter.get('/study-streak', protect, getStudyStreak);

// /**
//  * @swagger
//  * /api/v1/progress/weekly-summary:
//  *   get:
//  *     summary: Get user's weekly activity summary with day-by-day breakdown
//  *     tags: [Progress & Analytics]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns comprehensive weekly summary including daily breakdown, top subjects, and achievements earned.
//  *
//  *       **USE CASE:**
//  *       - User views their weekly progress report
//  *       - Weekly email digest sent to users
//  *       - Motivational summary at end of week
//  *       - Track consistency and achievements
//  *
//  *       **RESPONSE INCLUDES:**
//  *       - Week range (start/end dates)
//  *       - Summary totals (time, lessons, questions, average score)
//  *       - Day-by-day breakdown (7 days)
//  *       - Top 3 subjects studied
//  *       - Achievements earned this week
//  *
//  *       **FRONTEND IMPLEMENTATION:**
//  *       ```javascript
//  *       // Fetch weekly summary
//  *       const response = await fetch('/api/v1/progress/weekly-summary');
//  *       const data = response.data;
//  *
//  *       // Display week range
//  *       document.getElementById('week-range').textContent =
//  *         `${new Date(data.weekRange.startDate).toLocaleDateString()} -
//  *          ${new Date(data.weekRange.endDate).toLocaleDateString()}`;
//  *
//  *       // Display summary stats
//  *       const summary = data.summary;
//  *       const hours = Math.floor(summary.totalTimeSeconds / 3600);
//  *       const minutes = Math.floor((summary.totalTimeSeconds % 3600) / 60);
//  *
//  *       document.getElementById('total-time').textContent = `${hours}h ${minutes}m`;
//  *       document.getElementById('lessons-completed').textContent = summary.totalLessonsCompleted;
//  *       document.getElementById('questions-attempted').textContent = summary.totalQuestionsAttempted;
//  *       document.getElementById('avg-score').textContent = `${summary.averageQuizScore}%`;
//  *       document.getElementById('days-studied').textContent =
//  *         `${summary.daysStudied}/7 days`;
//  *       document.getElementById('goals-met').textContent =
//  *         `${summary.dailyGoalsMet}/7 goals met`;
//  *
//  *       // Display daily breakdown chart
//  *       data.dailyBreakdown.forEach(day => {
//  *         const dayCard = document.createElement('div');
//  *         dayCard.className = 'day-card';
//  *         dayCard.innerHTML = `
//  *           <div class="day-name">${day.dayName}</div>
//  *           <div class="day-date">${new Date(day.date).getDate()}</div>
//  *           <div class="day-time">${Math.floor(day.timeSeconds / 60)}m</div>
//  *           <div class="day-lessons">${day.lessonsCompleted} lessons</div>
//  *           <div class="day-questions">${day.questionsAttempted} questions</div>
//  *           ${day.quizScore ? `<div class="day-score">${day.quizScore}%</div>` : ''}
//  *           ${day.goalMet ? '<span class="goal-badge">✓</span>' : ''}
//  *         `;
//  *         weekChart.appendChild(dayCard);
//  *       });
//  *
//  *       // Display top subjects
//  *       data.topSubjects.forEach((subject, index) => {
//  *         const hours = Math.floor(subject.timeSeconds / 3600);
//  *         document.getElementById(`subject-${index + 1}`).innerHTML = `
//  *           <div class="rank">#${index + 1}</div>
//  *           <div class="subject-name">${subject.subjectName}</div>
//  *           <div class="subject-time">${hours}h studied</div>
//  *           <div class="subject-lessons">${subject.lessonsCompleted} lessons</div>
//  *         `;
//  *       });
//  *
//  *       // Display achievements
//  *       data.achievements.forEach(achievement => {
//  *         const badge = document.createElement('div');
//  *         badge.className = `achievement-badge ${achievement.type.toLowerCase()}`;
//  *         badge.innerHTML = `
//  *           <div class="achievement-title">${achievement.title}</div>
//  *           <div class="achievement-desc">${achievement.description}</div>
//  *         `;
//  *         achievementsContainer.appendChild(badge);
//  *       });
//  *
//  *       // Show motivational message
//  *       if (summary.daysStudied < 3) {
//  *         showMotivation("Let's aim for more consistency next week! Try studying 5 days.");
//  *       } else if (summary.daysStudied === 7) {
//  *         showCelebration("Amazing! Perfect week of studying! 🎉");
//  *       }
//  *       ```
//  *
//  *       **UI SECTIONS:**
//  *
//  *       1. **Week Overview Card:**
//  *       - Date range
//  *       - Total time, lessons, questions
//  *       - Average quiz score
//  *       - Days studied (5/7)
//  *       - Goals met (4/7)
//  *
//  *       2. **Daily Breakdown Chart:**
//  *       - 7 cards (Mon-Sun)
//  *       - Each shows: time, lessons, questions, score
//  *       - Green checkmark if goal met
//  *       - Bar chart visualization option
//  *
//  *       3. **Top Subjects:**
//  *       - Podium-style ranking (1st, 2nd, 3rd)
//  *       - Shows: subject name, time spent, lessons completed
//  *       - Helps identify focus areas
//  *
//  *       4. **Achievements:**
//  *       - Badge grid
//  *       - Types: STREAK, GOAL, LESSONS, SCORE
//  *       - Celebrate milestones
//  *
//  *       **SHARE FEATURE:**
//  *       ```javascript
//  *       function shareWeeklySummary() {
//  *         const text = `
//  *           My FE-1 study week:
//  *           📚 ${summary.totalLessonsCompleted} lessons completed
//  *           ⏱️ ${hours}h studied
//  *           📊 ${summary.averageQuizScore}% avg score
//  *           🔥 ${summary.daysStudied}/7 days
//  *         `;
//  *
//  *         if (navigator.share) {
//  *           navigator.share({ text });
//  *         }
//  *       }
//  *       ```
//  *
//  *     responses:
//  *       200:
//  *         description: Weekly summary retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: Weekly summary retrieved
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     weekRange:
//  *                       type: object
//  *                       properties:
//  *                         startDate:
//  *                           type: string
//  *                           example: "2026-01-28"
//  *                         endDate:
//  *                           type: string
//  *                           example: "2026-02-03"
//  *                     summary:
//  *                       type: object
//  *                       properties:
//  *                         totalTimeSeconds:
//  *                           type: integer
//  *                           example: 18000
//  *                           description: 5 hours total
//  *                         totalLessonsCompleted:
//  *                           type: integer
//  *                           example: 12
//  *                         totalQuestionsAttempted:
//  *                           type: integer
//  *                           example: 45
//  *                         averageQuizScore:
//  *                           type: number
//  *                           example: 78.5
//  *                         daysStudied:
//  *                           type: integer
//  *                           example: 5
//  *                           description: Out of 7 days
//  *                         dailyGoalsMet:
//  *                           type: integer
//  *                           example: 4
//  *                           description: Out of 7 days
//  *                     dailyBreakdown:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           date:
//  *                             type: string
//  *                             example: "2026-02-03"
//  *                           dayName:
//  *                             type: string
//  *                             example: Mon
//  *                           timeSeconds:
//  *                             type: integer
//  *                             example: 3600
//  *                           lessonsCompleted:
//  *                             type: integer
//  *                             example: 2
//  *                           questionsAttempted:
//  *                             type: integer
//  *                             example: 8
//  *                           quizScore:
//  *                             type: number
//  *                             nullable: true
//  *                             example: 82.5
//  *                           goalMet:
//  *                             type: boolean
//  *                             example: true
//  *                     topSubjects:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           subjectName:
//  *                             type: string
//  *                             example: Criminal Law
//  *                           timeSeconds:
//  *                             type: integer
//  *                             example: 7200
//  *                           lessonsCompleted:
//  *                             type: integer
//  *                             example: 5
//  *                     achievements:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           type:
//  *                             type: string
//  *                             enum: [STREAK, GOAL, LESSONS, SCORE]
//  *                             example: GOAL
//  *                           title:
//  *                             type: string
//  *                             example: Goal Crusher! 🎯
//  *                           description:
//  *                             type: string
//  *                             example: Met your daily goal 4 times this week
//  */
// progressRouter.get('/weekly-summary', protect, getWeeklySummary);


/**
 * @swagger
 * /api/v1/progress/dashboard-simple:
 *   get:
 *     summary: Get simplified dashboard data
 *     tags: [Progress & Analytics]
 *     security:
 *       - bearerAuth: []
 *     description: Returns simplified dashboard data for main dashboard screen. Includes exam countdown, today's study time with progress bar, weekly streak calendar, quiz performance stats (average, highest, lowest from User table), resume learning card, and 3 random recommended podcasts. The isNew flag indicates whether to show Quick Start or Resume Learning UI.
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
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
 *                   example: Dashboard data retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     isNew:
 *                       type: boolean
 *                       example: false
 *                       description: True if user has not completed onboarding OR has zero activity. Frontend should show Quick Start UI if true, Resume Learning UI if false.
 *                     examCountdown:
 *                       type: object
 *                       properties:
 *                         daysUntilExam:
 *                           type: integer
 *                           nullable: true
 *                           example: 42
 *                         examDate:
 *                           type: string
 *                           nullable: true
 *                           example: "2026-05-31"
 *                     todayStudy:
 *                       type: object
 *                       properties:
 *                         hoursToday:
 *                           type: number
 *                           example: 2
 *                         targetHours:
 *                           type: integer
 *                           example: 3
 *                         progressPercent:
 *                           type: integer
 *                           example: 67
 *                     weeklyStreak:
 *                       type: object
 *                       properties:
 *                         currentStreak:
 *                           type: integer
 *                           example: 3
 *                         longestStreak:
 *                           type: integer
 *                           example: 10
 *                         weekCalendar:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               day:
 *                                 type: string
 *                                 example: "M"
 *                               hasActivity:
 *                                 type: boolean
 *                                 example: true
 *                     quizPerformance:
 *                       type: object
 *                       properties:
 *                         averageScore:
 *                           type: integer
 *                           example: 70
 *                           description: Average quiz score across all completed sessions (from User table)
 *                         highestScore:
 *                           type: integer
 *                           example: 80
 *                           description: Best quiz score ever achieved (from User table)
 *                         lowestScore:
 *                           type: integer
 *                           example: 30
 *                           description: Worst quiz score ever achieved (from User table)
 *                     resumeLearning:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         lessonTitle:
 *                           type: string
 *                           example: "Resulting Trusts"
 *                         subjectName:
 *                           type: string
 *                           example: "Equity"
 *                         minutesRemaining:
 *                           type: integer
 *                           example: 15
 *                         progressPercent:
 *                           type: integer
 *                           example: 62
 *                         lessonId:
 *                           type: string
 *                         moduleId:
 *                           type: string
 *                     recommendedPodcasts:
 *                       type: array
 *                       description: 3 random podcasts
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           subjectName:
 *                             type: string
 *                           durationMinutes:
 *                             type: integer
 *                           thumbnail:
 *                             type: string
 */
progressRouter.get('/dashboard-simple', protect, getSimpleDashboard);


/**
 * @swagger
 * /api/v1/progress/study-overview:
 *   get:
 *     summary: Get study overview
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     description: Returns weekly summary, focus subjects, and key stats.
 *     responses:
 *       200:
 *         description: Study overview retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     weekSummary:
 *                       type: string
 *                     focusSubjects:
 *                       type: array
 *                       items:
 *                         type: string
 *                     stats:
 *                       type: object
 *                       properties:
 *                         subjectsEnrolled:
 *                           type: integer
 *                         lessonsCompleted:
 *                           type: integer
 *                         quizAccuracy:
 *                           type: integer
 *                         practiceAttempts:
 *                           type: integer
 *                         currentStreak:
 *                           type: integer
 *                     achievementHint:
 *                       type: string
 */
progressRouter.get('/study-overview', protect, getStudyOverview);

// /**
//  * @swagger
//  * /api/v1/progress/module-stats/{moduleId}:
//  *   get:
//  *     summary: Get detailed performance analytics for a specific module
//  *     tags: [Progress & Analytics]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns comprehensive performance analytics including lesson completion, quiz performance, strong/weak topics, and personalized recommendations.
//  *
//  *       **USE CASE:**
//  *       - User clicks "View Stats" on a module
//  *       - User wants detailed performance breakdown
//  *       - Identify strong and weak areas
//  *       - Get personalized study recommendations
//  *
//  *       **RESPONSE INCLUDES:**
//  *       - Module overview (name, progress, status)
//  *       - Lesson completion stats
//  *       - Quiz performance metrics (avg, best, worst scores)
//  *       - Strong topics (75%+ accuracy)
//  *       - Weak topics (<60% accuracy)
//  *       - Recent question attempts
//  *       - Personalized recommendations
//  *
//  *     parameters:
//  *       - in: path
//  *         name: moduleId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Module ID
//  *     responses:
//  *       200:
//  *         description: Module stats retrieved successfully
//  *       404:
//  *         description: Module not found
//  */
// progressRouter.get('/module-stats/:moduleId', protect, getModuleStats);

// /**
//  * @swagger
//  * /api/v1/progress/subject/{subjectId}:
//  *   get:
//  *     summary: Get detailed progress breakdown for a specific subject
//  *     tags: [Progress & Analytics]
//  *     security:
//  *       - bearerAuth: []
//  *     description: |
//  *       Returns comprehensive progress analytics for a subject including module breakdown, performance stats, and recent activity.
//  *
//  *       **USE CASE:**
//  *       - User clicks on a subject to see detailed progress
//  *       - User wants to know which modules need more work
//  *       - User tracks their improvement over time
//  *
//  *       **RESPONSE INCLUDES:**
//  *       - Subject overall progress and status
//  *       - Breakdown by module (progress, quiz scores, completion)
//  *       - Performance metrics (completion rate, average score, time spent)
//  *       - Recent lessons completed in this subject
//  *
//  *       **FRONTEND IMPLEMENTATION:**
//  *       ```javascript
//  *       // Fetch subject progress
//  *       const response = await fetch('/api/v1/progress/subject/SUBJECT_ID');
//  *       const { subject, modules, performance, recentLessons } = response.data;
//  *
//  *       // Display subject header
//  *       document.getElementById('subject-name').textContent = subject.name;
//  *       document.getElementById('subject-progress').textContent = `${subject.progressPercent}%`;
//  *
//  *       // Display progress ring/circle
//  *       updateProgressRing(subject.progressPercent);
//  *
//  *       // Display total time spent
//  *       const hours = Math.floor(subject.totalTimeSeconds / 3600);
//  *       document.getElementById('total-time').textContent = `${hours}h studied`;
//  *
//  *       // Display module breakdown
//  *       modules.forEach(module => {
//  *         // Card showing:
//  *         // "Module 1: Foundations"
//  *         // "Progress: 60% (3/5 lessons)"
//  *         // "Quiz Average: 78.5%"
//  *         // Progress bar
//  *
//  *         const moduleCard = createModuleCard({
//  *           name: module.name,
//  *           progress: module.progressPercent,
//  *           lessons: `${module.completedLessons}/${module.totalLessons}`,
//  *           quizAvg: module.quizAverage || 'N/A',
//  *           status: module.status // NOT_STARTED, IN_PROGRESS, COMPLETED
//  *         });
//  *       });
//  *
//  *       // Display performance stats
//  *       document.getElementById('completion-rate').textContent =
//  *         `${performance.completionRate}% complete`;
//  *       document.getElementById('avg-score').textContent =
//  *         `${performance.averageQuizScore}% avg score`;
//  *       document.getElementById('questions-attempted').textContent =
//  *         `${performance.totalQuestionsAttempted} questions`;
//  *
//  *       const weekHours = Math.floor(performance.timeSpentThisWeek / 3600);
//  *       document.getElementById('week-time').textContent =
//  *         `${weekHours}h this week`;
//  *
//  *       // Display recent activity
//  *       recentLessons.forEach(lesson => {
//  *         // Timeline entry:
//  *         // "Completed 'Lesson 3: Actus Reus' in Module 1 - 2 days ago"
//  *       });
//  *
//  *       // Show weak modules (for recommendations)
//  *       const weakModules = modules
//  *         .filter(m => m.progressPercent < 50)
//  *         .sort((a, b) => a.progressPercent - b.progressPercent);
//  *
//  *       if (weakModules.length > 0) {
//  *         showRecommendation(`Focus on: ${weakModules[0].name}`);
//  *       }
//  *       ```
//  *
//  *       **UI SECTIONS:**
//  *
//  *       1. **Subject Overview Card:**
//  *       - Large progress circle
//  *       - Status badge (In Progress/Completed)
//  *       - Total time spent
//  *       - Last accessed date
//  *
//  *       2. **Module Breakdown:**
//  *       - Grid/list of module cards
//  *       - Each shows: name, progress bar, lesson count, quiz average
//  *       - Click module to navigate to lessons
//  *
//  *       3. **Performance Stats:**
//  *       - Completion rate
//  *       - Average quiz score
//  *       - Questions attempted
//  *       - Time spent this week
//  *
//  *       4. **Recent Activity Timeline:**
//  *       - Last 5 lessons completed
//  *       - Timestamps (relative: "2 hours ago")
//  *
//  *       5. **Recommendations:**
//  *       - "Complete Module 2 to reach 50%"
//  *       - "Your quiz scores in Module 3 are low - review lessons"
//  *
//  *     parameters:
//  *       - in: path
//  *         name: subjectId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Subject ID
//  *     responses:
//  *       200:
//  *         description: Subject progress retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: Subject progress retrieved
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     subject:
//  *                       type: object
//  *                       properties:
//  *                         id:
//  *                           type: string
//  *                           example: clx123abc
//  *                         name:
//  *                           type: string
//  *                           example: Criminal Law
//  *                         progressPercent:
//  *                           type: number
//  *                           example: 45.5
//  *                         status:
//  *                           type: string
//  *                           enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
//  *                           example: IN_PROGRESS
//  *                         totalTimeSeconds:
//  *                           type: integer
//  *                           example: 14400
//  *                           description: 4 hours total
//  *                         lastAccessedAt:
//  *                           type: string
//  *                           format: date-time
//  *                           nullable: true
//  *                           example: "2026-02-03T10:30:00Z"
//  *                     modules:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           id:
//  *                             type: string
//  *                             example: clx456def
//  *                           name:
//  *                             type: string
//  *                             example: "Module 1: Foundations of Criminal Law"
//  *                           progressPercent:
//  *                             type: number
//  *                             example: 60
//  *                           status:
//  *                             type: string
//  *                             enum: [NOT_STARTED, IN_PROGRESS, COMPLETED]
//  *                             example: IN_PROGRESS
//  *                           completedLessons:
//  *                             type: integer
//  *                             example: 3
//  *                           totalLessons:
//  *                             type: integer
//  *                             example: 5
//  *                           quizAverage:
//  *                             type: number
//  *                             nullable: true
//  *                             example: 78.5
//  *                             description: Average score on MCQ quizzes for this module
//  *                     performance:
//  *                       type: object
//  *                       properties:
//  *                         totalLessonsCompleted:
//  *                           type: integer
//  *                           example: 12
//  *                         totalLessons:
//  *                           type: integer
//  *                           example: 40
//  *                         totalQuestionsAttempted:
//  *                           type: integer
//  *                           example: 67
//  *                         averageQuizScore:
//  *                           type: number
//  *                           example: 76.3
//  *                         timeSpentThisWeek:
//  *                           type: integer
//  *                           example: 7200
//  *                           description: 2 hours this week
//  *                         completionRate:
//  *                           type: number
//  *                           example: 30
//  *                           description: Percentage of lessons completed
//  *                     recentLessons:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           id:
//  *                             type: string
//  *                             example: clx789ghi
//  *                           title:
//  *                             type: string
//  *                             example: "Lesson 3: Actus Reus"
//  *                           moduleName:
//  *                             type: string
//  *                             example: "Module 1: Foundations"
//  *                           completedAt:
//  *                             type: string
//  *                             format: date-time
//  *                             example: "2026-02-03T14:20:00Z"
//  *       404:
//  *         description: Subject progress not found
//  */
// progressRouter.get('/subject/:subjectId', protect, getSubjectProgressDetail);

export default progressRouter;
