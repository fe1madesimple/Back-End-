import { Router } from 'express';
import {
  getNextSitting,
  getUpcomingSittings,
  getAllSittings,
  getSittingById,
} from '../controller/exam.controller';

const examRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Exam Schedule
 *   description: Official FE-1 exam sitting dates and information
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExamSitting:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: clp_exam_123abc
 *           description: Unique exam sitting ID
 *         name:
 *           type: string
 *           example: April 2025 FE-1 Sitting
 *           description: Human-readable name of the exam sitting
 *         examDate:
 *           type: string
 *           format: date-time
 *           example: "2025-04-15T09:00:00.000Z"
 *           description: Official exam start date and time (ISO 8601 format)
 *         registrationDeadline:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-03-15T23:59:59.000Z"
 *           description: Last day to register for this exam sitting
 *         resultsDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-06-01T00:00:00.000Z"
 *           description: When results will be published
 *         daysUntil:
 *           type: integer
 *           example: 42
 *           description: Number of days from today until exam date (calculated)
 *         isActive:
 *           type: boolean
 *           example: true
 *           description: Whether this sitting is currently active/available
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-10T12:00:00.000Z"
 *           description: When this sitting was added to system
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-10T12:00:00.000Z"
 *           description: Last time this sitting was updated
 */

/**
 * @swagger
 * /api/v1/exams/next:
 *   get:
 *     summary: Get next upcoming FE-1 exam sitting
 *     tags: [Exam Schedule]
 *     description: |
 *       Returns the closest upcoming FE-1 exam sitting date.
 *
 *       **What happens:**
 *       - Queries database for exam sittings
 *       - Filters only FUTURE dates (after today)
 *       - Filters only ACTIVE sittings
 *       - Sorts by exam date (ascending)
 *       - Returns the FIRST result (nearest exam)
 *       - Calculates days remaining until exam
 *
 *       **Use cases:**
 *       - Dashboard countdown: "42 Days until next FE-1 sitting"
 *       - Homepage hero section
 *       - Study planning features
 *       - Urgency notifications
 *
 *       **Frontend usage:**
 *       ```javascript
 *       // Fetch next exam sitting
 *       fetch('/api/v1/exams/next')
 *         .then(res => res.json())
 *         .then(data => {
 *           if (data.success && data.data.sitting) {
 *             const { daysUntil, examDate, name } = data.data.sitting;
 *
 *             // Display countdown
 *             document.getElementById('countdown').textContent =
 *               `${daysUntil} Days until next FE-1 sitting`;
 *
 *             // Display exam date
 *             const date = new Date(examDate);
 *             document.getElementById('exam-date').textContent =
 *               date.toLocaleDateString('en-IE', {
 *                 day: 'numeric',
 *                 month: 'long',
 *                 year: 'numeric'
 *               });
 *             // Output: "15 April 2025"
 *           } else {
 *             // No upcoming exam scheduled
 *             document.getElementById('countdown').textContent =
 *               'No upcoming exam scheduled';
 *           }
 *         });
 *       ```
 *
 *       **Date calculation:**
 *       The `daysUntil` field is calculated server-side:
 *       - Takes exam date (e.g., 2025-04-15)
 *       - Subtracts today's date (e.g., 2025-03-04)
 *       - Returns difference in days (e.g., 42)
 *       - Always rounded UP (Math.ceil)
 *
 *       **Important notes:**
 *       - Returns null if no upcoming exams scheduled
 *       - Only returns ACTIVE exams (isActive: true)
 *       - Only returns FUTURE exams (examDate > today)
 *       - `daysUntil` is always positive integer
 *       - All dates in ISO 8601 format (UTC timezone)
 *     responses:
 *       200:
 *         description: Next exam sitting retrieved (or null if none scheduled)
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
 *                   example: Next exam sitting retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     sitting:
 *                       oneOf:
 *                         - $ref: '#/components/schemas/ExamSitting'
 *                         - type: null
 *             examples:
 *               withExam:
 *                 summary: Upcoming exam found
 *                 value:
 *                   success: true
 *                   message: Next exam sitting retrieved successfully
 *                   data:
 *                     sitting:
 *                       id: clp_exam_123abc
 *                       name: April 2025 FE-1 Sitting
 *                       examDate: "2025-04-15T09:00:00.000Z"
 *                       registrationDeadline: "2025-03-15T23:59:59.000Z"
 *                       resultsDate: "2025-06-01T00:00:00.000Z"
 *                       daysUntil: 42
 *                       isActive: true
 *                       createdAt: "2025-01-10T12:00:00.000Z"
 *                       updatedAt: "2025-01-10T12:00:00.000Z"
 *               noExam:
 *                 summary: No upcoming exam scheduled
 *                 value:
 *                   success: true
 *                   message: No upcoming exam sittings scheduled
 *                   data:
 *                     sitting: null
 */
examRouter.get('/next', getNextSitting);

/**
 * @swagger
 * /api/v1/exams/upcoming:
 *   get:
 *     summary: Get all upcoming FE-1 exam sittings
 *     tags: [Exam Schedule]
 *     description: |
 *       Returns ALL future FE-1 exam sittings (multiple exams).
 *
 *       **What happens:**
 *       - Queries database for exam sittings
 *       - Filters only FUTURE dates (after today)
 *       - Filters only ACTIVE sittings
 *       - Sorts by exam date (ascending - nearest first)
 *       - Returns ALL matching results
 *       - Calculates days remaining for each exam
 *
 *       **Difference from `/next`:**
 *       - `/next` returns ONE exam (the nearest)
 *       - `/upcoming` returns ALL future exams (array)
 *
 *       **Use cases:**
 *       - Exam calendar view
 *       - "Choose your exam date" selection
 *       - Planning tools
 *       - Information pages
 *
 *       **Frontend usage:**
 *       ```javascript
 *       // Fetch all upcoming exams
 *       fetch('/api/v1/exams/upcoming')
 *         .then(res => res.json())
 *         .then(data => {
 *           if (data.success && data.data.sittings.length > 0) {
 *             const exams = data.data.sittings;
 *
 *             // Display exam options
 *             const examList = exams.map(exam => `
 *               <div class="exam-option">
 *                 <h3>${exam.name}</h3>
 *                 <p>📅 ${new Date(exam.examDate).toLocaleDateString()}</p>
 *                 <p>⏱️ ${exam.daysUntil} days away</p>
 *                 <p>📝 Register by: ${new Date(exam.registrationDeadline).toLocaleDateString()}</p>
 *                 <button onclick="selectExam('${exam.id}')">
 *                   Select This Date
 *                 </button>
 *               </div>
 *             `).join('');
 *
 *             document.getElementById('exam-options').innerHTML = examList;
 *
 *             // Show count
 *             document.getElementById('exam-count').textContent =
 *               `${data.data.count} upcoming exam${data.data.count > 1 ? 's' : ''}`;
 *           } else {
 *             document.getElementById('exam-options').innerHTML =
 *               '<p>No upcoming exams scheduled at this time.</p>';
 *           }
 *         });
 *       ```
 *
 *       **Typical scenarios:**
 *       - 2-3 exams per year (April, September, sometimes January)
 *       - Response usually contains 1-3 items
 *       - Empty array if no exams scheduled
 *
 *       **Important notes:**
 *       - Returns empty array if no upcoming exams
 *       - Only ACTIVE exams (isActive: true)
 *       - Only FUTURE exams (examDate > today)
 *       - Sorted by date (nearest first)
 *       - Includes `count` field for convenience
 *     responses:
 *       200:
 *         description: Upcoming exam sittings retrieved (may be empty array)
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
 *                   example: Upcoming exam sittings retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     sittings:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ExamSitting'
 *                     count:
 *                       type: integer
 *                       example: 2
 *                       description: Number of upcoming exams
 *             examples:
 *               multipleExams:
 *                 summary: Multiple upcoming exams
 *                 value:
 *                   success: true
 *                   message: Upcoming exam sittings retrieved successfully
 *                   data:
 *                     sittings:
 *                       - id: clp_exam_april
 *                         name: April 2025 FE-1 Sitting
 *                         examDate: "2025-04-15T09:00:00.000Z"
 *                         registrationDeadline: "2025-03-15T23:59:59.000Z"
 *                         resultsDate: "2025-06-01T00:00:00.000Z"
 *                         daysUntil: 42
 *                         isActive: true
 *                         createdAt: "2025-01-10T12:00:00.000Z"
 *                         updatedAt: "2025-01-10T12:00:00.000Z"
 *                       - id: clp_exam_sept
 *                         name: September 2025 FE-1 Sitting
 *                         examDate: "2025-09-20T09:00:00.000Z"
 *                         registrationDeadline: "2025-08-20T23:59:59.000Z"
 *                         resultsDate: "2025-11-01T00:00:00.000Z"
 *                         daysUntil: 200
 *                         isActive: true
 *                         createdAt: "2025-01-10T12:00:00.000Z"
 *                         updatedAt: "2025-01-10T12:00:00.000Z"
 *                     count: 2
 *               noExams:
 *                 summary: No upcoming exams
 *                 value:
 *                   success: true
 *                   message: Upcoming exam sittings retrieved successfully
 *                   data:
 *                     sittings: []
 *                     count: 0
 */
examRouter.get('/upcoming', getUpcomingSittings);

/**
 * @swagger
 * /api/v1/exams:
 *   get:
 *     summary: Get all exam sittings (including past exams)
 *     tags: [Exam Schedule]
 *     description: |
 *       Returns ALL exam sittings - past, present, and future.
 *
 *       **What happens:**
 *       - Queries database for ALL exam sittings
 *       - NO filtering by date (includes past exams)
 *       - Includes inactive exams (isActive: false)
 *       - Sorts by exam date (descending - newest first)
 *       - Returns ALL results
 *       - Calculates days until/since exam for each
 *
 *       **Difference from other endpoints:**
 *       - `/next` → ONE future exam
 *       - `/upcoming` → ALL future exams
 *       - `/` → ALL exams (past + future + inactive)
 *
 *       **Use cases:**
 *       - Admin dashboard (view all exam history)
 *       - Historical data analysis
 *       - Archive/calendar view
 *       - Results checking (past exams)
 *
 *       **Frontend usage:**
 *       ```javascript
 *       // Fetch all exams (for admin)
 *       fetch('/api/v1/exams')
 *         .then(res => res.json())
 *         .then(data => {
 *           const exams = data.data.sittings;
 *
 *           // Separate by status
 *           const upcoming = exams.filter(e => e.daysUntil > 0);
 *           const past = exams.filter(e => e.daysUntil < 0);
 *
 *           console.log(`Upcoming: ${upcoming.length}`);
 *           console.log(`Past: ${past.length}`);
 *           console.log(`Total: ${data.data.count}`);
 *
 *           // Display in table
 *           const tableRows = exams.map(exam => {
 *             const isPast = exam.daysUntil < 0;
 *             const status = isPast ? 'Completed' :
 *                           !exam.isActive ? 'Cancelled' :
 *                           'Upcoming';
 *
 *             return `
 *               <tr class="${isPast ? 'past-exam' : 'upcoming-exam'}">
 *                 <td>${exam.name}</td>
 *                 <td>${new Date(exam.examDate).toLocaleDateString()}</td>
 *                 <td>${Math.abs(exam.daysUntil)} days ${isPast ? 'ago' : 'away'}</td>
 *                 <td><span class="status-${status.toLowerCase()}">${status}</span></td>
 *               </tr>
 *             `;
 *           }).join('');
 *         });
 *       ```
 *
 *       **Understanding `daysUntil` for past exams:**
 *       - Future exam: daysUntil = 42 (positive number)
 *       - Today's exam: daysUntil = 0
 *       - Past exam: daysUntil = -30 (negative number)
 *
 *       **Important notes:**
 *       - Includes ALL exams (no filtering)
 *       - Includes inactive exams (cancelled/archived)
 *       - Sorted newest to oldest (desc)
 *       - `daysUntil` can be negative (past exams)
 *       - Useful for admin/analytics purposes
 *     responses:
 *       200:
 *         description: All exam sittings retrieved
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
 *                   example: All exam sittings retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     sittings:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ExamSitting'
 *                     count:
 *                       type: integer
 *                       example: 5
 *                       description: Total number of exams (past + future)
 *             examples:
 *               allExams:
 *                 summary: Past and upcoming exams
 *                 value:
 *                   success: true
 *                   message: All exam sittings retrieved successfully
 *                   data:
 *                     sittings:
 *                       - id: clp_exam_sept25
 *                         name: September 2025 FE-1 Sitting
 *                         examDate: "2025-09-20T09:00:00.000Z"
 *                         daysUntil: 200
 *                         isActive: true
 *                       - id: clp_exam_apr25
 *                         name: April 2025 FE-1 Sitting
 *                         examDate: "2025-04-15T09:00:00.000Z"
 *                         daysUntil: 42
 *                         isActive: true
 *                       - id: clp_exam_jan25
 *                         name: January 2025 FE-1 Sitting
 *                         examDate: "2025-01-10T09:00:00.000Z"
 *                         daysUntil: -4
 *                         isActive: true
 *                       - id: clp_exam_sept24
 *                         name: September 2024 FE-1 Sitting
 *                         examDate: "2024-09-15T09:00:00.000Z"
 *                         daysUntil: -121
 *                         isActive: true
 *                     count: 4
 */
examRouter.get('/', getAllSittings);

/**
 * @swagger
 * /api/v1/exams/{id}:
 *   get:
 *     summary: Get specific exam sitting by ID
 *     tags: [Exam Schedule]
 *     description: |
 *       Returns details for a specific exam sitting.
 *
 *       **What happens:**
 *       - Validates exam ID parameter
 *       - Queries database for exam with matching ID
 *       - Returns 404 if not found
 *       - Calculates days until exam
 *       - Returns full exam details
 *
 *       **Use cases:**
 *       - Exam detail page
 *       - Deep linking to specific exam
 *       - Sharing exam information
 *       - Bookmarking exams
 *
 *       **Frontend usage:**
 *       ```javascript
 *       // Get specific exam (e.g., from URL parameter)
 *       const examId = 'clp_exam_123abc'; // From route params
 *
 *       fetch(`/api/v1/exams/${examId}`)
 *         .then(res => res.json())
 *         .then(data => {
 *           if (data.success) {
 *             const exam = data.data.sitting;
 *
 *             // Display exam details
 *             document.getElementById('exam-title').textContent = exam.name;
 *             document.getElementById('exam-date').textContent =
 *               new Date(exam.examDate).toLocaleDateString('en-IE', {
 *                 weekday: 'long',
 *                 day: 'numeric',
 *                 month: 'long',
 *                 year: 'numeric'
 *               });
 *             // Output: "Tuesday, 15 April 2025"
 *
 *             document.getElementById('countdown').textContent =
 *               `${exam.daysUntil} days until exam`;
 *
 *             if (exam.registrationDeadline) {
 *               const regDate = new Date(exam.registrationDeadline);
 *               const daysToReg = Math.ceil(
 *                 (regDate - Date.now()) / (1000 * 60 * 60 * 24)
 *               );
 *
 *               if (daysToReg > 0) {
 *                 document.getElementById('registration').textContent =
 *                   `Registration closes in ${daysToReg} days`;
 *               } else {
 *                 document.getElementById('registration').textContent =
 *                   'Registration closed';
 *               }
 *             }
 *           }
 *         })
 *         .catch(error => {
 *           console.error('Exam not found:', error);
 *           // Show 404 page or redirect
 *         });
 *       ```
 *
 *       **URL format:**
 *       ```
 *       https://api.fe1madesimple.ie/api/v1/exams/clp_exam_123abc
 *                                                   ^^^^^^^^^^^^^^^^
 *                                                   Exam ID goes here
 *       ```
 *
 *       **Important notes:**
 *       - ID must be valid cuid format
 *       - Returns 400 if ID missing
 *       - Returns 404 if exam not found
 *       - Works for past, present, future exams
 *       - Works for active and inactive exams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clp_exam_123abc
 *         description: Unique exam sitting ID (cuid format)
 *     responses:
 *       200:
 *         description: Exam sitting retrieved successfully
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
 *                   example: Exam sitting retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     sitting:
 *                       $ref: '#/components/schemas/ExamSitting'
 *             examples:
 *               success:
 *                 summary: Exam found
 *                 value:
 *                   success: true
 *                   message: Exam sitting retrieved successfully
 *                   data:
 *                     sitting:
 *                       id: clp_exam_123abc
 *                       name: April 2025 FE-1 Sitting
 *                       examDate: "2025-04-15T09:00:00.000Z"
 *                       registrationDeadline: "2025-03-15T23:59:59.000Z"
 *                       resultsDate: "2025-06-01T00:00:00.000Z"
 *                       daysUntil: 42
 *                       isActive: true
 *                       createdAt: "2025-01-10T12:00:00.000Z"
 *                       updatedAt: "2025-01-10T12:00:00.000Z"
 *       400:
 *         description: Bad request - ID missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Exam sitting ID is required
 *       404:
 *         description: Not found - Exam doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Exam sitting not found
 *             examples:
 *               notFound:
 *                 summary: Invalid ID or exam deleted
 *                 value:
 *                   success: false
 *                   message: Exam sitting not found
 */
examRouter.get('/:id', getSittingById);

export default examRouter;
