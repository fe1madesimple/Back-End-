import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asynHandler';
import { sendCreated } from '@/utils/response';
import authService from '../services/auth.service';
import { setAuthCookies } from '@/utils/cookie';
import { RegisterInput } from '../interfaces/auth.interfaces';

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const input: RegisterInput = req.body;

  // Call service
  const result = await authService.register(input);

  // Set tokens in HTTP-only cookies
  setAuthCookies(res, result.accessToken, result.refreshToken);

  // Return user data (no tokens in body)
  sendCreated(res, 'Registration successful. Please check your email to verify your account.', {
    user: result.user,
  });
});
