import { Router } from "express";
import {
  register,
  login,
  googleAuth,
  forgotPassword,
  resetPassword,
  verifyEmail,
  refreshToken,
  getCurrentUser,
  logout,
} from '../controllers/auth.controller';
import { protect } from '../../../shared/middleware/auth.middleware';
import { validate } from '@/shared/middleware/validation';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from '../validators/auth.validator';


const authRouter = Router()









export default authRouter