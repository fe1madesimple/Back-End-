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





export default userRouter