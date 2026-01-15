import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asynHandler';
import { sendCreated, sendSuccess } from '@/utils/response';
import authService from '../services/auth.service';
import { setAuthCookies } from '@/utils/cookie';
import {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from '../interfaces/auth.interfaces';
import { UnauthorizedError } from '@/utils/errors';
import { clearAuthCookies } from '@/utils/cookie';
import passport from 'passport';


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


export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});


/**
 * @desc    Request password reset
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const input: ForgotPasswordInput = req.body;

  // Call service (sends reset email)
  await authService.forgotPassword(input);

  // Always return success (don't reveal if email exists)
  sendSuccess(res, 'If an account with that email exists, we have sent a password reset link.');
});

/**
 * @desc    Reset password with token
 * @route   POST /api/v1/auth/reset-password
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const input: ResetPasswordInput = req.body;

  // Call service (validates token and updates password)
  await authService.resetPassword(input);

  // Return success
  sendSuccess(res, 'Password reset successful. You can now login with your new password.');
});


/**
 * @desc    Verify email with token
 * @route   GET /api/v1/auth/verify-email
 * @access  Public
 */
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const input: VerifyEmailInput = req.body; 

  await authService.verifyEmail(input);

  return sendSuccess(res, 'Email verified successfully. You can now access all features.');
});


/**
 * @desc    Refresh access token using refresh token
 * @route   POST /api/v1/auth/refresh-token
 * @access  Public
 */
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  // Get refresh token from cookie
  const oldRefreshToken = req.cookies.refreshToken;

  if (!oldRefreshToken) {
    throw new UnauthorizedError('Refresh token not found');
  }

  // Call service (validates refresh token and generates new tokens)
  const result = await authService.refreshToken(oldRefreshToken);

  // Set new tokens in HTTP-only cookies
  setAuthCookies(res, result.accessToken, result.refreshToken);

  // Return success
  sendSuccess(
    res,
    'Tokens refreshed successfully'
  );
});




/**
 * @desc    Get current logged-in user
 * @route   GET /api/v1/auth/me
 * @access  Private (requires authentication)
 */
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  // User is already attached to req.user by protect middleware
  const userId = req.user!.id;

  // Call service (gets user with subscription data)
  const user = await authService.getCurrentUser(userId);

  // Return user data
  sendSuccess(
    res,
    'User retrieved successfully',
    { user }
  );
});


/**
 * @desc    Logout user (clear cookies)
 * @route   POST /api/v1/auth/logout
 * @access  Private (requires authentication)
 */
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  // Clear auth cookies
  clearAuthCookies(res);

  // Return success
  sendSuccess(
    res,
    'Logged out successfully'
  );
});