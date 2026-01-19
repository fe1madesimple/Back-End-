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
import { AuthServiceResponse } from '../interfaces/auth.interfaces';



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

  // Return user data with needsOnboarding flag
  sendSuccess(res, 'Login successful', {
    user: result.user,
    needsOnboarding: result.needsOnboarding, 
  });
});



/**
 * @desc    google login
 * @route   POST /api/v1/auth/google/login
 * @access  Public
 */
export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});



/**
 * @desc    google webhook
 * @route   POST /api/v1/auth/google/callback
 * @access  Public
 */
export const googleCallback = [
  passport.authenticate('google', { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    // Now req.user contains the full result from authService
    const result = req.user as AuthServiceResponse;

    setAuthCookies(res, result.accessToken, result.refreshToken);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }),
];



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

  // Call service with transaction handling
  const result = await authService.verifyEmail(input);

  // Set tokens in HTTP-only cookies
  setAuthCookies(res, result.accessToken, result.refreshToken);

  // Return success response
  sendSuccess(res, 'Email verified successfully', {
    user: result.user,
    needsOnboarding: result.needsOnboarding,
  });
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
  sendSuccess(res, 'Tokens refreshed successfully');
});

/**
 * @desc    Get current logged-in user
 * @route   GET /api/v1/auth/me
 * @access  Private (requires authentication)
 */
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  // User is already attached to req.user by protect middleware
  const userId = (req.user as any).id;

  // Call service (gets user with subscription data)
  const user = await authService.getCurrentUser(userId);

  // Return user data
  sendSuccess(res, 'User retrieved successfully', { user });
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
  sendSuccess(res, 'Logged out successfully');
});

export const resendVerificationCode = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  await authService.resendVerificationCode(email);

  return sendSuccess(
    res,
    'Verification code sent successfully. Please check your email.',
  );
});