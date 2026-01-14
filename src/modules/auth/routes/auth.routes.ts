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
} from '../validators/auth.validators';


const authRouter = Router()



/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and account management
 */




/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: |
 *       Creates a new user account with email and password.
 *       
 *       **What happens:**
 *       - User account is created
 *       - Password is securely hashed (bcrypt)
 *       - 7-day FREE TRIAL subscription is automatically created
 *       - Email verification token is generated (expires in 24 hours)
 *       - Verification email is sent (currently logged to console)
 *       - JWT tokens are set in HTTP-only cookies
 *       
 *       **Cookies set:**
 *       - `accessToken` - Valid for 7 days
 *       - `refreshToken` - Valid for 30 days
 *       
 *       **Important notes:**
 *       - Email must be unique
 *       - Password must be at least 8 characters with uppercase, lowercase, and number
 *       - Tokens are in HTTP-only cookies (NOT in response body)
 *       - User can login immediately even if email not verified
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *                 description: Must be a valid email address
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: Password123
 *                 description: Must contain uppercase, lowercase, and number
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *                 example: John
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *                 example: Doe
 *                 description: User's last name
 *     responses:
 *       201:
 *         description: User registered successfully
 *         headers:
 *           Set-Cookie:
 *             description: JWT tokens set in HTTP-only cookies
 *             schema:
 *               type: string
 *               example: accessToken=eyJhbGc...; HttpOnly; Secure; Path=/; Max-Age=604800
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
 *                   example: Registration successful. Please check your email to verify your account.
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clp123abc456def789
 *                         email:
 *                           type: string
 *                           example: student@example.com
 *                         firstName:
 *                           type: string
 *                           example: John
 *                         lastName:
 *                           type: string
 *                           example: Doe
 *                         role:
 *                           type: string
 *                           enum: [STUDENT, HOST, ADMIN]
 *                           example: STUDENT
 *                         profileColor:
 *                           type: string
 *                           example: "#3B82F6"
 *                           description: Hex color for user avatar
 *                         isEmailVerified:
 *                           type: boolean
 *                           example: false
 *                           description: Will be true after email verification
 *       400:
 *         description: Bad request - Validation error or user already exists
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
 *                   example: User with this email already exists
 *             examples:
 *               emailExists:
 *                 summary: Email already registered
 *                 value:
 *                   success: false
 *                   message: User with this email already exists
 *               validationError:
 *                 summary: Invalid input data
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: password
 *                       message: Password must contain at least one uppercase letter
 */
authRouter.post("/register", validate(registerSchema), register)


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     description: |
 *       Authenticates a user and returns JWT tokens in HTTP-only cookies.
 *       
 *       **What happens:**
 *       - Email and password are validated
 *       - Password is verified against hashed password in database
 *       - User's `lastLoginAt` timestamp is updated
 *       - JWT tokens are set in HTTP-only cookies
 *       
 *       **Cookies set:**
 *       - `accessToken` - Valid for 7 days
 *       - `refreshToken` - Valid for 30 days
 *       
 *       **Important notes:**
 *       - User can login even if email is not verified
 *       - Same error message for wrong email or wrong password (security)
 *       - Tokens are in HTTP-only cookies (NOT in response body)
 *       - Frontend should store user data from response in state
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             description: JWT tokens set in HTTP-only cookies
 *             schema:
 *               type: string
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
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clp123abc456def789
 *                         email:
 *                           type: string
 *                           example: student@example.com
 *                         firstName:
 *                           type: string
 *                           example: John
 *                         lastName:
 *                           type: string
 *                           example: Doe
 *                         role:
 *                           type: string
 *                           example: STUDENT
 *                         profileColor:
 *                           type: string
 *                           example: "#3B82F6"
 *                         isEmailVerified:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized - Invalid credentials
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
 *                   example: Invalid email or password
 */
authRouter.post("/login", validate(loginSchema), login)


/**
 * @swagger
 * /api/v1/auth/google:
 *   post:
 *     summary: Login or register with Google OAuth
 *     tags: [Authentication]
 *     description: |
 *       Authenticates a user using Google OAuth token.
 *       
 *       **What happens:**
 *       - Google ID token is verified with Google's servers
 *       - User profile is extracted from verified token
 *       - If user doesn't exist: Creates new account with 7-day trial
 *       - If user exists: Links Google account to existing account
 *       - Email is automatically verified (Google pre-verifies)
 *       - JWT tokens are set in HTTP-only cookies
 *       
 *       **Frontend flow:**
 *       1. Use Google Sign-In button to get ID token
 *       2. Send token to this endpoint
 *       3. Receive user data and cookies
 *       
 *       **Important notes:**
 *       - Google users don't have passwords (OAuth only)
 *       - Email is automatically verified (isEmailVerified: true)
 *       - If email already exists, Google account is linked
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - credential
 *             properties:
 *               credential:
 *                 type: string
 *                 description: Google ID token (JWT) from Google Sign-In
 *                 example: eyJhbGciOiJSUzI1NiIsImtpZCI6IjY4M2E1...
 *     responses:
 *       200:
 *         description: Google authentication successful
 *         headers:
 *           Set-Cookie:
 *             description: JWT tokens set in HTTP-only cookies
 *             schema:
 *               type: string
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
 *                   example: Google authentication successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         role:
 *                           type: string
 *                           example: STUDENT
 *                         profileColor:
 *                           type: string
 *                         isEmailVerified:
 *                           type: boolean
 *                           example: true
 *                           description: Always true for Google users
 *       401:
 *         description: Unauthorized - Invalid Google token
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
 *                   example: Failed to verify Google token
 */

authRouter.post("/google", googleAuth)



/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     description: |
 *       Generates a password reset token and sends it via email.
 *       
 *       **What happens:**
 *       - Checks if user with email exists
 *       - Generates random reset token (expires in 1 hour)
 *       - Saves token to database
 *       - Sends password reset email (currently logged to console)
 *       - ALWAYS returns success (doesn't reveal if email exists - security)
 *       
 *       **Email contains:**
 *       A link like: `https://fe1madesimple.ie/reset-password?token=a7f3c2e1...`
 *       
 *       **Security note:**
 *       Always returns same success message whether email exists or not.
 *       This prevents attackers from discovering registered emails.
 *       
 *       **Important notes:**
 *       - Token expires in 1 hour
 *       - Token can only be used once
 *       - If user doesn't exist, still returns success (security)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *                 description: Email address of the account
 *     responses:
 *       200:
 *         description: Request processed (always success for security)
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
 *                   example: If an account with that email exists, we have sent a password reset link.
 *                   description: Same message whether user exists or not
 *       400:
 *         description: Bad request - Invalid email format
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
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: Invalid email address
 */

authRouter.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword)


/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Authentication]
 *     description: |
 *       Resets user's password using the token from forgot-password email.
 *       
 *       **What happens:**
 *       - Validates reset token (checks if exists and not expired)
 *       - Validates new password format
 *       - Hashes new password (bcrypt)
 *       - Updates user's password
 *       - Clears reset token (one-time use)
 *       - Sends confirmation email (currently logged to console)
 *       
 *       **Flow:**
 *       1. User clicks link in email: `/reset-password?token=abc123`
 *       2. Frontend extracts token from URL
 *       3. User enters new password
 *       4. Frontend sends token + new password to this endpoint
 *       5. User can login with new password
 *       
 *       **Important notes:**
 *       - Token expires in 1 hour
 *       - Token can only be used once
 *       - After reset, user must login again with new password
 *       - Old password is completely replaced
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: a7f3c2e1b9d4f6h8k2l5m9n3p7q1r4s8
 *                 description: Reset token from email link (64 characters)
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: NewPassword123
 *                 description: New password (must contain uppercase, lowercase, and number)
 *     responses:
 *       200:
 *         description: Password reset successful
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
 *                   example: Password reset successful. You can now login with your new password.
 *       400:
 *         description: Bad request - Invalid or expired token
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
 *                   example: Invalid or expired reset token
 *             examples:
 *               tokenExpired:
 *                 summary: Token expired (> 1 hour)
 *                 value:
 *                   success: false
 *                   message: Invalid or expired reset token
 *               tokenUsed:
 *                 summary: Token already used
 *                 value:
 *                   success: false
 *                   message: Invalid or expired reset token
 *               tokenInvalid:
 *                 summary: Token doesn't exist
 *                 value:
 *                   success: false
 *                   message: Invalid or expired reset token
 *               passwordWeak:
 *                 summary: Password doesn't meet requirements
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: password
 *                       message: Password must contain at least one uppercase letter
 */
authRouter.post("/reset-password", validate(resetPasswordSchema), resetPassword)



/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   get:
 *     summary: Verify email address
 *     tags: [Authentication]
 *     description: |
 *       Verifies user's email address using token from verification email.
 *       
 *       **What happens:**
 *       - Validates verification token (checks if exists and not expired)
 *       - Sets user's `isEmailVerified` to true
 *       - Clears verification token (one-time use)
 *       - Sends welcome email (currently logged to console)
 *       
 *       **Flow:**
 *       1. User registers → receives verification email
 *       2. User clicks link in email: `/verify-email?token=abc123`
 *       3. Frontend automatically calls this endpoint
 *       4. User is redirected to dashboard with success message
 *       
 *       **Important notes:**
 *       - Token expires in 24 hours
 *       - Token can only be used once
 *       - User can still login even if email not verified
 *       - After verification, user sees "✅ Email verified" badge
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: a7f3c2e1b9d4f6h8k2l5m9n3p7q1r4s8
 *         description: Verification token from email (64 characters)
 *     responses:
 *       200:
 *         description: Email verified successfully
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
 *                   example: Email verified successfully. You can now access all features.
 *       400:
 *         description: Bad request - Invalid or expired token
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
 *                   example: Invalid or expired verification token
 *             examples:
 *               tokenExpired:
 *                 summary: Token expired (> 24 hours)
 *                 value:
 *                   success: false
 *                   message: Invalid or expired verification token
 *               tokenUsed:
 *                 summary: Email already verified
 *                 value:
 *                   success: false
 *                   message: Invalid or expired verification token
 *               tokenInvalid:
 *                 summary: Token doesn't exist
 *                 value:
 *                   success: false
 *                   message: Invalid or expired verification token
 */


export default authRouter