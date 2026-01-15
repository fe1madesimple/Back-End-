import { Router } from "express";
import { getProfile, updateProfile, updatePreferences, changePassword, deleteAccount } from '../controllers/user.controller';
import { protect } from '@/shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import { updateProfileSchema, updatePreferencesSchema, changePasswordSchema, deleteAccountSchema } from '../validators/user.validator';



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


export default userRouter