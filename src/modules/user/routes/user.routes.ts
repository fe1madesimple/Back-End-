import { Router } from "express";
import { getProfile, updateProfile, updatePreferences, changePassword, deleteAccount, completeOnboarding, skipOnboarding, getOnboardingStatus, exportUserData } from '../controllers/user.controller';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import { updateProfileSchema, updatePreferencesSchema, changePasswordSchema, deleteAccountSchema, completeOnboardingSchema } from '../validators/user.validator';



const userRouter = Router();


/**
 * @swagger
 * tags:
 *   name: User Profile
 *   description: User profile and preferences management
 */


/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     description: Returns complete user profile with subscription
 *     responses:
 *       200:
 *         description: Profile retrieved
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
 *                     user:
 *                       type: object
 */
userRouter.get('/profile', protect, getProfile);


/**
 * @swagger
 * /api/v1/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Update profile fields: fullName, color, exam date, study goal, focus subjects
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       fetch('/api/v1/users/profile', {
 *         method: 'PUT',
 *         credentials: 'include',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({
 *           fullName: 'John babatunde',
 *           targetExamDate: '2025-04-15T00:00:00.000Z',
 *           dailyStudyGoal: 3,
 *           focusSubjects: ['clp_subject_1', 'clp_subject_2']
 *         })
 *       });
 *       ```
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John
 *               profileColor:
 *                 type: string
 *                 example: "#3B82F6"
 *               targetExamDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-15T00:00:00.000Z"
 *               dailyStudyGoal:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 24
 *                 example: 2
 *               focusSubjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["clp_subject_1", "clp_subject_2"]
 *     responses:
 *       200:
 *         description: Profile updated
 */
userRouter.put('/profile', protect, validate(updateProfileSchema), updateProfile);


/**
 * @swagger
 * /api/v1/users/preferences:
 *   put:
 *     summary: Update notification preferences
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     description: Update email and notification settings
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailReminders:
 *                 type: boolean
 *               studyStreakAlerts:
 *                 type: boolean
 *               podcastRecommendations:
 *                 type: boolean
 *               showRelevantEpisodes:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Preferences updated
 */
userRouter.put('/preferences', protect, validate(updatePreferencesSchema), updatePreferences);

/**
 * @swagger
 * components:
 *   schemas:
 *     OnboardingStatus:
 *       type: object
 *       properties:
 *         completed:
 *           type: boolean
 *           example: true
 *           description: Whether user has completed onboarding
 *         skipped:
 *           type: boolean
 *           example: false
 *           description: Whether user skipped onboarding
 *         completedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-01-16T10:30:00.000Z"
 *           description: When onboarding was completed or skipped
 *
 *     OnboardingRequest:
 *       type: object
 *       required:
 *         - focusSubjects
 *       properties:
 *         focusSubjects:
 *           type: array
 *           items:
 *             type: string
 *           minItems: 1
 *           maxItems: 8
 *           example: ["clp_subject_criminal", "clp_subject_contract"]
 *           description: Array of subject IDs user wants to focus on
 *         targetExamDate:
 *           type: string
 *           format: date-time
 *           example: "2025-04-15T00:00:00.000Z"
 *           description: User's target exam date (must be in future)
 *         dailyStudyGoal:
 *           type: integer
 *           minimum: 1
 *           maximum: 24
 *           example: 3
 *           description: Hours per day user wants to study
 *
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: clp_user_123abc
 *         email:
 *           type: string
 *           example: user@example.com
 *         fullName:
 *           type: string
 *           example: John
 *         role:
 *           type: string
 *           enum: [STUDENT, HOST, ADMIN]
 *           example: STUDENT
 *         profileColor:
 *           type: string
 *           example: "#3B82F6"
 *         isEmailVerified:
 *           type: boolean
 *           example: true
 *         targetExamDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-04-15T00:00:00.000Z"
 *         dailyStudyGoal:
 *           type: integer
 *           example: 2
 *         focusSubjects:
 *           type: array
 *           items:
 *             type: string
 *           example: ["clp_subject_1", "clp_subject_2"]
 *         hasCompletedOnboarding:
 *           type: boolean
 *           example: true
 *         onboardingSkipped:
 *           type: boolean
 *           example: false
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Validation failed
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: focusSubjects
 *               message:
 *                 type: string
 *                 example: Please select at least one subject
 *         stack:
 *           type: string
 *           description: Error stack trace (only in development)
 *         error:
 *           type: string
 *           description: Detailed error message (only in development)
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 */


/**
 * @swagger
 * /api/v1/users/onboarding:
 *   post:
 *     summary: Complete user onboarding
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     description: |
 *       Save user's initial preferences during onboarding flow.
 *       
 *       **When to call:**
 *       - After user signs up (email or OAuth)
 *       - User fills out onboarding form
 *       - User clicks "Start Learning" button
 *       
 *       **What happens:**
 *       - Saves focus subjects, exam date, study goal
 *       - Marks `hasCompletedOnboarding = true`
 *       - Marks `onboardingSkipped = false`
 *       - Sets `onboardingCompletedAt` timestamp
 *       - User won't see onboarding screen again
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       // After user fills onboarding form
 *       const response = await fetch('/api/v1/users/onboarding', {
 *         method: 'POST',
 *         credentials: 'include', // Important for cookies
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({
 *           focusSubjects: ["clp_subject_criminal", "clp_subject_contract"],
 *           targetExamDate: "2025-04-15T00:00:00.000Z",
 *           dailyStudyGoal: 3
 *         })
 *       });
 *       
 *       if (response.ok) {
 *         const data = await response.json();
 *         // Redirect to dashboard
 *         router.push('/dashboard');
 *       }
 *       ```
 *       
 *       **Validation rules:**
 *       - `focusSubjects`: Must have 1-8 subjects
 *       - `targetExamDate`: Must be future date (optional)
 *       - `dailyStudyGoal`: Must be 1-24 hours (optional, defaults to 2)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OnboardingRequest'
 *           examples:
 *             minimal:
 *               summary: Minimum required fields
 *               value:
 *                 focusSubjects: ["clp_subject_criminal"]
 *             complete:
 *               summary: All fields provided
 *               value:
 *                 focusSubjects: ["clp_subject_criminal", "clp_subject_contract", "clp_subject_tort"]
 *                 targetExamDate: "2025-04-15T00:00:00.000Z"
 *                 dailyStudyGoal: 3
 *     responses:
 *       200:
 *         description: Onboarding completed successfully
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
 *                   example: Onboarding completed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               noSubjects:
 *                 summary: No subjects selected
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: focusSubjects
 *                       message: Please select at least one subject
 *               invalidDate:
 *                 summary: Past exam date
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: targetExamDate
 *                       message: Target exam date must be in the future
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid token
 *               errors:
 *                 - field: token
 *                   message: The authentication token is invalid
 */
userRouter.post('/onboarding', protect, validate(completeOnboardingSchema), completeOnboarding);


/**
 * @swagger
 * /api/v1/users/onboarding/skip:
 *   post:
 *     summary: Skip onboarding
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     description: |
 *       Skip the onboarding process without setting preferences.
 *       
 *       **When to call:**
 *       - User clicks "Skip For Now" button
 *       - User wants to set preferences later
 *       
 *       **What happens:**
 *       - Marks `hasCompletedOnboarding = true`
 *       - Marks `onboardingSkipped = true`
 *       - Sets `onboardingCompletedAt` timestamp
 *       - Does NOT save preferences (uses defaults)
 *       - User won't see onboarding screen again
 *       - User can set preferences later in settings
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       // When user clicks "Skip For Now"
 *       const response = await fetch('/api/v1/users/onboarding/skip', {
 *         method: 'POST',
 *         credentials: 'include'
 *       });
 *       
 *       if (response.ok) {
 *         // Redirect to dashboard
 *         router.push('/dashboard');
 *       }
 *       ```
 *       
 *       **Default values used:**
 *       - `focusSubjects`: [] (empty)
 *       - `targetExamDate`: null
 *       - `dailyStudyGoal`: 2 (default)
 *       
 *       **Optional: Show reminder banner**
 *       You can check `onboardingSkipped` flag to show a reminder:
 *       ```javascript
 *       if (user.onboardingSkipped) {
 *         showBanner("Complete your profile for better recommendations");
 *       }
 *       ```
 *     responses:
 *       200:
 *         description: Onboarding skipped successfully
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
 *                   example: Onboarding skipped
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserProfile'
 *             example:
 *               success: true
 *               message: Onboarding skipped
 *               data:
 *                 user:
 *                   id: clp_user_123
 *                   email: user@example.com
 *                   firstName: John
 *                   lastName: Doe
 *                   role: STUDENT
 *                   hasCompletedOnboarding: true
 *                   onboardingSkipped: true
 *                   focusSubjects: []
 *                   dailyStudyGoal: 2
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post('/onboarding/skip', protect, skipOnboarding);


/**
 * @swagger
 * /api/v1/users/onboarding/status:
 *   get:
 *     summary: Get onboarding status
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     description: |
 *       Check if user has completed onboarding.
 *       
 *       **When to call:**
 *       - On app load / dashboard mount
 *       - To decide whether to show onboarding screen
 *       - Route guards to protect authenticated pages
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       // Check onboarding status before showing dashboard
 *       const checkOnboarding = async () => {
 *         const response = await fetch('/api/v1/users/onboarding/status', {
 *           credentials: 'include'
 *         });
 *         
 *         const data = await response.json();
 *         
 *         if (!data.data.completed) {
 *           // User hasn't completed onboarding - redirect
 *           router.push('/onboarding');
 *         } else if (data.data.skipped) {
 *           // User skipped - maybe show reminder banner
 *           showBanner("Complete your profile");
 *         } else {
 *           // User completed onboarding - show dashboard
 *           showDashboard();
 *         }
 *       };
 *       ```
 *       
 *       **Route Guard Example (Next.js):**
 *       ```javascript
 *       // middleware.ts or dashboard page
 *       export async function middleware(request) {
 *         const status = await fetch('/api/v1/users/onboarding/status');
 *         const data = await status.json();
 *         
 *         if (!data.data.completed) {
 *           return NextResponse.redirect('/onboarding');
 *         }
 *       }
 *       ```
 *     responses:
 *       200:
 *         description: Onboarding status retrieved
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
 *                   example: Onboarding status retrieved
 *                 data:
 *                   $ref: '#/components/schemas/OnboardingStatus'
 *             examples:
 *               completed:
 *                 summary: User completed onboarding
 *                 value:
 *                   success: true
 *                   message: Onboarding status retrieved
 *                   data:
 *                     completed: true
 *                     skipped: false
 *                     completedAt: "2025-01-16T10:30:00.000Z"
 *               skipped:
 *                 summary: User skipped onboarding
 *                 value:
 *                   success: true
 *                   message: Onboarding status retrieved
 *                   data:
 *                     completed: true
 *                     skipped: true
 *                     completedAt: "2025-01-16T10:30:00.000Z"
 *               notCompleted:
 *                 summary: User hasn't done onboarding
 *                 value:
 *                   success: true
 *                   message: Onboarding status retrieved
 *                   data:
 *                     completed: false
 *                     skipped: false
 *                     completedAt: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.get('/onboarding/status', protect, getOnboardingStatus);



/**
 * @swagger
 * /api/v1/users/data/export:
 *   get:
 *     summary: Export all user data (GDPR)
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     description: |
 *       Export all user data for GDPR compliance.
 *       
 *       **What's included:**
 *       - User profile (email, name, preferences)
 *       - Subscription details
 *       - Study logs (all activity)
 *       - Quiz attempts (scores, history)
 *       - Timed sessions (essay practice)
 *       - AI evaluations (feedback)
 *       - Saved cases
 *       - Achievements
 *       
 *       **What's excluded (for security):**
 *       - Password hash
 *       - Password reset codes
 *       - Email verification codes
 *       - Verification lock data
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       // Download user data
 *       const downloadData = async () => {
 *         const response = await fetch('/api/v1/users/data/export', {
 *           credentials: 'include'
 *         });
 *         
 *         const data = await response.json();
 *         
 *         // Create downloadable JSON file
 *         const blob = new Blob([JSON.stringify(data.data.userData, null, 2)], {
 *           type: 'application/json'
 *         });
 *         
 *         const url = URL.createObjectURL(blob);
 *         const a = document.createElement('a');
 *         a.href = url;
 *         a.download = `my-data-${new Date().toISOString()}.json`;
 *         a.click();
 *       };
 *       ```
 *       
 *       **GDPR Compliance:**
 *       This endpoint fulfills the "Right to Data Portability" under GDPR Article 20.
 *       Users can download their data in a machine-readable format (JSON).
 *       
 *       **Response size:**
 *       Response size varies based on user activity (typically 10KB - 1MB).
 *     responses:
 *       200:
 *         description: User data exported successfully
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
 *                   example: User data exported successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     userData:
 *                       type: object
 *                       description: Complete user data object
 *             example:
 *               success: true
 *               message: User data exported successfully
 *               data:
 *                 userData:
 *                   id: clp_user_123
 *                   email: user@example.com
 *                   fullName: John Babatunde
 *                   subscription:
 *                     status: ACTIVE
 *                     planType: MONTHLY
 *                   studyLogs:
 *                     - activityType: LESSON_VIEW
 *                       duration: 1200
 *                       createdAt: "2025-01-15T10:00:00.000Z"
 *                   quizAttempts:
 *                     - isCorrect: true
 *                       timeSpent: 45
 *                       createdAt: "2025-01-14T15:30:00.000Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: User not found
 */
userRouter.get('/data/export', protect, exportUserData);


/**
 * @swagger
 * /api/v1/users/password:
 *   put:
 *     summary: Change password
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Change user password (email/password users only, not OAuth)
 *       
 *       **Important:** OAuth users (Google) cannot change password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: OldPassword123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password changed
 *       401:
 *         description: Current password incorrect or OAuth user
 */
userRouter.put('/password', protect, validate(changePasswordSchema), changePassword);


/**
 * @swagger
 * /api/v1/users/delete-account:
 *   delete:
 *     summary: Delete user account
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     description: Permanently deletes user account and all associated data. Analytics are preserved for business insights. This action cannot be undone.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: User's current password for verification
 *                 example: "MySecurePassword123"
 *               deletionReason:
 *                 type: string
 *                 description: Optional reason for account deletion
 *                 example: "Found a better platform"
 *               feedback:
 *                 type: string
 *                 description: Optional feedback about the platform
 *                 example: "Great content but too expensive"
 *     responses:
 *       200:
 *         description: Account deleted successfully
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
 *                   example: Account deleted successfully
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 */
userRouter.delete('/account', protect, validate(deleteAccountSchema), deleteAccount);

export default userRouter