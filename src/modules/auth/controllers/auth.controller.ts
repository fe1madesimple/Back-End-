import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asynHandler';
import { sendCreated, sendSuccess } from '@/utils/response';
import authService from '../services/auth.service';
import { setAuthCookies } from '@/utils/cookie';
import { RegisterInput, LoginInput } from '../interfaces/auth.interfaces';
import { verifyGoogleToken } from '@/shared/utils';

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

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const input: LoginInput = req.body;

  // Call service
  const result = await authService.login(input);

  // Set tokens in HTTP-only cookies
  setAuthCookies(res, result.accessToken, result.refreshToken);

  // Return user data (no tokens in body)
  sendSuccess(res, 'Login successful', { user: result.user });
});


/**
 * @desc    Google OAuth login/register
 * @route   POST /api/v1/auth/google
 * @access  Public
 */
export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const { credential } = req.body; // Google ID token from frontend

  // Verify token with Google and extract profile
  const profile = await verifyGoogleToken(credential);

  // Call service
  const result = await authService.googleAuth(profile);

  // Set tokens in HTTP-only cookies
  setAuthCookies(res, result.accessToken, result.refreshToken);

  // Return user data
  sendSuccess(res, 'Google authentication successful', { user: result.user });
});