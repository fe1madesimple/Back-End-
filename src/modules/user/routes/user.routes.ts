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
 *       Update profile fields: name, color, exam date, study goal, focus subjects
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       fetch('/api/v1/users/profile', {
 *         method: 'PUT',
 *         credentials: 'include',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({
 *           firstName: 'John',
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
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
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


userRouter.post('/onboarding', protect, validate(completeOnboardingSchema), completeOnboarding);


userRouter.post('/onboarding/skip', protect, skipOnboarding);



userRouter.get('/onboarding/status', protect, getOnboardingStatus);

// Data Export (GDPR)
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
 * /api/v1/users/account:
 *   delete:
 *     summary: Delete account
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Permanently delete user account
 *       
 *       **Requires:**
 *       - Password verification
 *       - Confirmation string "DELETE"
 *       
 *       **Deletes:**
 *       - User record
 *       - Subscription (cascade)
 *       - All user data (cascade)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmation
 *             properties:
 *               password:
 *                 type: string
 *                 example: MyPassword123
 *               confirmation:
 *                 type: string
 *                 example: DELETE
 *                 description: Must be exactly "DELETE"
 *     responses:
 *       204:
 *         description: Account deleted
 *       401:
 *         description: Incorrect password
 */
userRouter.delete('/account', protect, validate(deleteAccountSchema), deleteAccount);


export default userRouter