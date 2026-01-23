import { Router } from "express";
import {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  verifyEmail,
  refreshToken,
  googleCallback,
  getCurrentUser,
  logout,
  resendVerificationCode,
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
 *               - fullName
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
 *               fullName:
 *                 type: string
 *                 minLength: 2
 *                 example: John
 *                 description: User's first name
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
 *                         fullName:
 *                           type: string
 *                           example: John babatunde
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
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   description: Detailed validation errors (only present for validation failures)
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: password
 *                       message:
 *                         type: string
 *                         example: Password must contain at least one uppercase letter
 *             examples:
 *               emailExists:
 *                 summary: Email already registered
 *                 value:
 *                   success: false
 *                   message: email already exists
 *               validationError:
 *                 summary: Invalid input data
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: email
 *                       message: Please provide a valid email address
 *                     - field: password
 *                       message: Password must be at least 8 characters
 *               missingFields:
 *                 summary: Required fields missing
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: fullName
 *                       message: FullName is required
 *       409:
 *         description: Conflict - Email already exists
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
 *                   example: email already exists
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
 *                         example: This email is already taken
 */
authRouter.post("/register", validate(registerSchema), register)



/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     description: |
 *       Authenticate user with email and password.
 *       
 *       **Flow:**
 *       1. User submits email + password
 *       2. Server validates credentials
 *       3. Server generates JWT tokens
 *       4. Server sets httpOnly cookies
 *       5. Server returns user data + `needsOnBoarding` flag + subscription info
 *       
 *       **Frontend should check `needsOnBoarding`:**
 *       ```javascript
 *       const response = await fetch('/api/v1/auth/login', {
 *         method: 'POST',
 *         credentials: 'include',
 *         body: JSON.stringify({ email, password })
 *       });
 *       
 *       const data = await response.json();
 *       
 *       if (data.data.needsOnBoarding) {
 *         router.push('/onboarding');
 *       } else {
 *         router.push('/dashboard');
 *       }
 *       
 *       // Check subscription status
 *       if (data.data.subscription?.status === 'TRIAL') {
 *         showBanner(`${data.data.subscription.daysRemaining} days left in trial`);
 *       }
 *       ```
 *       
 *       **When `needsOnBoarding` is true:**
 *       - User hasn't completed onboarding yet
 *       - Redirect to `/onboarding`
 *       
 *       **When `needsOnBoarding` is false:**
 *       - User has completed onboarding
 *       - Redirect to `/dashboard`
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MyPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             description: JWT tokens stored in httpOnly cookies
 *             schema:
 *               type: string
 *               example: accessToken=eyJhbGc...; HttpOnly; Secure; SameSite=Strict
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
 *                       $ref: '#/components/schemas/UserProfile'
 *                     needsOnBoarding:
 *                       type: boolean
 *                       example: false
 *                       description: Whether user needs to complete onboarding
 *                     subscription:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         status:
 *                           type: string
 *                           enum: [TRIAL, ACTIVE, EXPIRED, CANCELLED, SUSPENDED]
 *                         planType:
 *                           type: string
 *                           enum: [MONTHLY, ANNUAL]
 *                           nullable: true
 *                         daysRemaining:
 *                           type: integer
 *                           description: Days until subscription/trial ends
 *                         trialEndsAt:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                         currentPeriodEnd:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *             examples:
 *               returningUserWithSubscription:
 *                 summary: Returning user with active subscription
 *                 value:
 *                   success: true
 *                   message: Login successful
 *                   data:
 *                     user:
 *                       id: clp_user_123
 *                       email: user@example.com
 *                       fullName: John babatunde
 *                       role: STUDENT
 *                       profileColor: "#3B82F6"
 *                       isEmailVerified: true
 *                     needsOnBoarding: false
 *                     subscription:
 *                       status: ACTIVE
 *                       planType: MONTHLY
 *                       daysRemaining: 25
 *                       trialEndsAt: null
 *                       currentPeriodEnd: "2025-02-21T10:00:00.000Z"
 *               userOnTrial:
 *                 summary: User on 7-day trial
 *                 value:
 *                   success: true
 *                   message: Login successful
 *                   data:
 *                     user:
 *                       id: clp_user_456
 *                       email: newuser@example.com
 *                       fullName: Jane tunde
 *                       role: STUDENT
 *                       profileColor: "#3B82F6"
 *                       isEmailVerified: true
 *                     needsOnBoarding: false
 *                     subscription:
 *                       status: TRIAL
 *                       planType: null
 *                       daysRemaining: 5
 *                       trialEndsAt: "2025-01-26T10:00:00.000Z"
 *                       currentPeriodEnd: "2025-01-26T10:00:00.000Z"
 *               firstTimeUser:
 *                 summary: First-time user (needs onboarding)
 *                 value:
 *                   success: true
 *                   message: Login successful
 *                   data:
 *                     user:
 *                       id: clp_user_789
 *                       email: brandnew@example.com
 *                       fullName: Bob tunde
 *                       role: STUDENT
 *                       profileColor: "#3B82F6"
 *                       isEmailVerified: true
 *                     needsOnBoarding: true
 *                     subscription: null
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid email or password
 */
authRouter.post("/login", validate(loginSchema), login)


/**
 * @swagger
 * /api/v1/auth/google/login:
 *   post:
 *     summary: Authenticate with Google OAuth
 *     tags: [Authentication]
 *     description: |
 *       Authenticate user via Google OAuth 2.0.
 *       
 *       **For NEW users (first-time Google login):** 
 *       1. Account is created automatically 
 *       2. Email is auto-verified
 *       3. 7-day free trial subscription is created
 *       4. Welcome email with trial details is sent
 *       5. User is redirected to onboarding
 *       6. Response includes subscription with 7 days remaining
 *       
 *       **For EXISTING users (returning users):**
 *       1. Existing account is linked to Google (if not already linked)
 *       2. Email is marked as verified (if not already)
 *       3. No new subscription created (uses existing one)
 *       4. No welcome email sent
 *       5. User redirected to dashboard or onboarding (if incomplete)
 *       6. Response includes existing subscription info
 *       
 *       **Trial Details (New Users Only):**
 *       - Duration: 7 days
 *       - Full access to all premium features
 *       - No credit card required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Google ID token from OAuth flow
 *                 example: eyJhbGciOiJSUzI1NiIsImtpZCI6IjdlM...
 *     responses:
 *       200:
 *         description: Google authentication successful
 *         headers:
 *           Set-Cookie:
 *             description: JWT tokens stored in httpOnly cookies
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
 *                       $ref: '#/components/schemas/UserProfile'
 *                     needsOnboarding:
 *                       type: boolean
 *                       description: True for new users or users who haven't completed onboarding
 *                     subscription:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         status:
 *                           type: string
 *                           enum: [TRIAL, ACTIVE, EXPIRED, CANCELLED, SUSPENDED]
 *                         planType:
 *                           type: string
 *                           enum: [MONTHLY, ANNUAL]
 *                           nullable: true
 *                         daysRemaining:
 *                           type: integer
 *                           description: Days until subscription/trial ends
 *                         trialEndsAt:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                         currentPeriodEnd:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *             examples:
 *               newUser:
 *                 summary: New user (first-time Google login)
 *                 value:
 *                   success: true
 *                   message: Login successful
 *                   data:
 *                     user:
 *                       id: clp_user_123
 *                       email: newuser@gmail.com
 *                       fullName: John tunde
 *                       role: STUDENT
 *                       profileColor: "#3B82F6"
 *                       isEmailVerified: true
 *                     needsOnBoarding: true
 *                     subscription:
 *                       status: TRIAL
 *                       planType: null
 *                       daysRemaining: 7
 *                       trialEndsAt: "2025-01-28T10:00:00.000Z"
 *                       currentPeriodEnd: "2025-01-28T10:00:00.000Z"
 *               existingUserOnTrial:
 *                 summary: Existing user on trial
 *                 value:
 *                   success: true
 *                   message: Login successful
 *                   data:
 *                     user:
 *                       id: clp_user_456
 *                       email: returning@gmail.com
 *                       fullName: Jane tunde
 *                       role: STUDENT
 *                       profileColor: "#3B82F6"
 *                       isEmailVerified: true
 *                     needsOnBoarding: false
 *                     subscription:
 *                       status: TRIAL
 *                       planType: null
 *                       daysRemaining: 3
 *                       trialEndsAt: "2025-01-24T10:00:00.000Z"
 *                       currentPeriodEnd: "2025-01-24T10:00:00.000Z"
 *               existingUserWithSubscription:
 *                 summary: Existing user with active subscription
 *                 value:
 *                   success: true
 *                   message: Login successful
 *                   data:
 *                     user:
 *                       id: clp_user_789
 *                       email: premium@gmail.com
 *                       fullName: Bob tunde
 *                       role: STUDENT
 *                       profileColor: "#3B82F6"
 *                       isEmailVerified: true
 *                     needsOnBoarding: false
 *                     subscription:
 *                       status: ACTIVE
 *                       planType: MONTHLY
 *                       daysRemaining: 20
 *                       trialEndsAt: null
 *                       currentPeriodEnd: "2025-02-10T10:00:00.000Z"
 *       401:
 *         description: Invalid Google token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid Google ID token
 */
authRouter.get('/google/login', googleLogin);


/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback (internal use only)
 *     tags: [Authentication]
 *     description: |
 *       Google redirects here after user consent.
 *       Sets cookies and redirects to frontend dashboard.
 *       
 *       **Frontend receives user automatically via redirect.**
 *     responses:
 *       302:
 *         description: Redirect to frontend dashboard with cookies set
 */
authRouter.get('/google/callback', googleCallback);


/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     description: |
 *       Generates a 4-digit password reset code and sends it via email.
 *       
 *       **What happens:**
 *       - Checks if user with email exists
 *       - Generates random 4-digit code (expires in 1 hour)
 *       - Saves code to database
 *       - Sends password reset email with 4-digit code (currently logged to console)
 *       - ALWAYS returns success (doesn't reveal if email exists - security)
 *       
 *       **Email contains:**
 *       "Your password reset code is: 1234"
 *       
 *       **Frontend flow:**
 *       ```javascript
 *       // Step 1: User enters email
 *       fetch('/api/v1/auth/forgot-password', {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({ email: 'user@example.com' })
 *       })
 *       .then(() => {
 *         // Always shows success (security)
 *         showMessage('If account exists, code was sent to email');
 *         router.push('/reset-password'); // Show code + password form
 *       });
 *       ```
 *       
 *       **Security note:**
 *       Always returns same success message whether email exists or not.
 *       This prevents attackers from discovering registered emails.
 *       
 *       **Important notes:**
 *       - Code expires in 1 hour
 *       - Code can only be used once
 *       - Code is exactly 4 numeric digits
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
 *                   example: If an account with that email exists, we have sent a password reset code.
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
 *     summary: Reset password with 4-digit code
 *     tags: [Authentication]
 *     description: |
 *       Resets user's password using the 4-digit code from forgot-password email.
 *       
 *       **What happens:**
 *       - Validates 4-digit code (checks if exists and not expired)
 *       - Validates new password format
 *       - Hashes new password (bcrypt)
 *       - Updates user's password
 *       - Clears reset code (one-time use)
 *       - Sends confirmation email (currently logged to console)
 *       
 *       **Flow:**
 *       1. User receives email with 4-digit code (e.g., 1234)
 *       2. User enters code in 4 input boxes + new password
 *       3. Frontend sends code + new password to this endpoint
 *       4. User can login with new password
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       // User enters: 1 2 3 4 in code boxes + new password
 *       const code = '1234';
 *       const password = 'NewPassword123';
 *       
 *       fetch('/api/v1/auth/reset-password', {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({ code, password })
 *       })
 *       .then(res => res.json())
 *       .then(data => {
 *         if (data.success) {
 *           showSuccess('Password reset successful!');
 *           router.push('/login');
 *         }
 *       })
 *       .catch(error => {
 *         showError('Invalid or expired code');
 *       });
 *       ```
 *       
 *       **Important notes:**
 *       - Code expires in 1 hour
 *       - Code can only be used once
 *       - Code is exactly 4 numeric digits
 *       - After reset, user must login again with new password
 *       - Old password is completely replaced
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - password
 *             properties:
 *               code:
 *                 type: string
 *                 pattern: '^\d{4}$'
 *                 minLength: 4
 *                 maxLength: 4
 *                 example: "1234"
 *                 description: 4-digit reset code from email
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
 *         description: Bad request - Invalid or expired code
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
 *             examples:
 *               invalidFormat:
 *                 summary: Code is not 4 digits
 *                 value:
 *                   success: false
 *                   message: Code must be 4 digits
 *               codeExpired:
 *                 summary: Code expired (> 1 hour)
 *                 value:
 *                   success: false
 *                   message: Invalid or expired reset code
 *               codeUsed:
 *                 summary: Code already used
 *                 value:
 *                   success: false
 *                   message: Invalid or expired reset code
 *               codeInvalid:
 *                 summary: Code doesn't exist
 *                 value:
 *                   success: false
 *                   message: Invalid or expired reset code
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
 *   post:
 *     summary: Verify email with 4-digit code
 *     tags: [Authentication]
 *     description: |
 *       Verify user's email address using the 4-digit code sent during registration.
 *       
 *       **What happens on successful verification:**
 *       1. Email is marked as verified
 *       2. 7-day free trial subscription is created
 *       3. Welcome email with trial details is sent
 *       4. User is redirected to onboarding
 *       
 *       **Trial Details:**
 *       - Duration: 7 days
 *       - Full access to all premium features
 *       - No credit card required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 pattern: '^\d{4}$'
 *                 example: "1234"
 *                 description: 4-digit verification code sent to email
 *     responses:
 *       200:
 *         description: Email verified successfully, trial started
 *         headers:
 *           Set-Cookie:
 *             description: JWT tokens stored in httpOnly cookies
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
 *                   example: Email verified successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserProfile'
 *                     needsOnBoarding:
 *                       type: boolean
 *                       example: true
 *                       description: Always true after email verification
 *                     subscription:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           example: TRIAL
 *                         planType:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *                         daysRemaining:
 *                           type: integer
 *                           example: 7
 *                           description: Days left in trial
 *                         trialEndsAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-01-28T10:00:00.000Z"
 *                         currentPeriodEnd:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-01-28T10:00:00.000Z"
 *             example:
 *               success: true
 *               message: Email verified successfully
 *               data:
 *                 user:
 *                   id: clp_user_123
 *                   email: user@example.com 
 *                   fullName: John tunde
 *                   role: STUDENT
 *                   profileColor: "#3B82F6"
 *                   isEmailVerified: true
 *                 needsOnBoarding: true
 *                 subscription:
 *                   status: TRIAL
 *                   planType: null
 *                   daysRemaining: 7
 *                   trialEndsAt: "2025-01-28T10:00:00.000Z"
 *                   currentPeriodEnd: "2025-01-28T10:00:00.000Z"
 *       400:
 *         description: Invalid or expired code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidCode:
 *                 summary: Invalid verification code
 *                 value:
 *                   success: false
 *                   message: "Invalid verification code. 4 attempts remaining."
 *               expiredCode:
 *                 summary: Expired code
 *                 value:
 *                   success: false
 *                   message: Verification code has expired. Please request a new one.
 *               alreadyVerified:
 *                 summary: Already verified
 *                 value:
 *                   success: false
 *                   message: Email is already verified
 */
authRouter.post('/verify-email', validate(verifyEmailSchema), verifyEmail);


/**
 * @swagger
 * /api/v1/auth/resend-verification:
 *   post:
 *     summary: Resend email verification code
 *     tags: [Authentication]
 *     description: |
 *       Resends a new 4-digit verification code to user's email and resets failed attempts.
 *       
 *       **What happens:**
 *       - Generates new 4-digit code
 *       - Extends expiration to 24 hours from now
 *       - Resets failed verification attempts counter to 0
 *       - Unlocks account if it was locked
 *       - Sends new verification email
 *       
 *       **Use cases:**
 *       - User didn't receive the original email
 *       - Verification code expired (> 24 hours)
 *       - User exceeded 5 failed attempts and got locked out
 *       - User lost/deleted the original email
 *       
 *       **Security notes:**
 *       - Always returns success even if email doesn't exist (prevents email enumeration)
 *       - Invalidates previous verification code
 *       - Can be used to reset lockout status
 *       - Should implement rate limiting on this endpoint (e.g., max 3 requests per hour)
 *       
 *       **Frontend usage (Vue.js):**
 *       ```vue
 *       <script setup>
 *       import { ref, computed } from 'vue';
 *       import { useToast } from 'vue-toastification';
 *       
 *       const toast = useToast();
 *       
 *       const email = ref('user@example.com');
 *       const loading = ref(false);
 *       const countdown = ref(0);
 *       
 *       // Disable button during countdown
 *       const canResend = computed(() => countdown.value === 0 && !loading.value);
 *       
 *       const startCountdown = () => {
 *         countdown.value = 60; // 60 seconds
 *         const timer = setInterval(() => {
 *           countdown.value--;
 *           if (countdown.value === 0) {
 *             clearInterval(timer);
 *           }
 *         }, 1000);
 *       };
 *       
 *       const resendCode = async () => {
 *         loading.value = true;
 *         try {
 *           const response = await fetch('/api/v1/auth/resend-verification', {
 *             method: 'POST',
 *             headers: { 'Content-Type': 'application/json' },
 *             body: JSON.stringify({ email: email.value })
 *           });
 *           
 *           const data = await response.json();
 *           
 *           if (data.success) {
 *             toast.success('New verification code sent! Check your email.');
 *             startCountdown();
 *           } else {
 *             toast.error(data.message);
 *           }
 *         } catch (error) {
 *           toast.error('Failed to resend code. Please try again.');
 *         } finally {
 *           loading.value = false;
 *         }
 *       };
 *       </script>
 *       
 *       <template>
 *         <button 
 *           @click="resendCode" 
 *           :disabled="!canResend"
 *         >
 *           {{ countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code' }}
 *         </button>
 *       </template>
 *       ```
 *       
 *       **Best practices:**
 *       - Show countdown timer on frontend (e.g., "Resend in 60s") to prevent spam
 *       - Only enable button after countdown expires
 *       - Inform user that new code invalidates old one
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
 *                 example: "user@example.com"
 *                 description: Email address to resend verification code to
 *     responses:
 *       200:
 *         description: Verification code sent successfully (always returns success for security)
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
 *                   example: Verification code sent successfully. Please check your email.
 *             examples:
 *               success:
 *                 summary: Code sent (or email doesn't exist - same response for security)
 *                 value:
 *                   success: true
 *                   message: Verification code sent successfully. Please check your email.
 *       400:
 *         description: Bad request - Email already verified or validation error
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
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                       message:
 *                         type: string
 *             examples:
 *               alreadyVerified:
 *                 summary: Email already verified
 *                 value:
 *                   success: false
 *                   message: Email is already verified
 *               invalidEmail:
 *                 summary: Invalid email format
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: email
 *                       message: Please provide a valid email address
 */
authRouter.post('/resend-verification', resendVerificationCode);



/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     description: |
 *       Generates new access and refresh tokens using existing refresh token.
 *       
 *       **What happens:**
 *       - Reads refresh token from HTTP-only cookie
 *       - Validates refresh token signature and expiry
 *       - Checks if user still exists in database
 *       - Generates NEW access token (valid for 7 days)
 *       - Generates NEW refresh token (valid for 30 days)
 *       - Sets both new tokens in HTTP-only cookies
 *       
 *       **Token rotation:**
 *       Both tokens are regenerated for security (token rotation best practice).
 *       
 *       **When to use:**
 *       - Usually NOT needed! Auth middleware auto-refreshes expired tokens
 *       - Only call manually if making requests without middleware
 *       - Or if frontend detects expired token before request
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       // Usually automatic via middleware
 *       // But if needed manually:
 *       fetch('/api/v1/auth/refresh-token', {
 *         method: 'POST',
 *         credentials: 'include' // Important! Sends cookies
 *       });
 *       // New tokens automatically set in cookies
 *       ```
 *       
 *       **Important notes:**
 *       - No request body needed (token from cookie)
 *       - Refresh token expires in 30 days max
 *       - Both tokens are rotated (new ones issued)
 *       - If refresh token expired, user must login again
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         headers:
 *           Set-Cookie:
 *             description: New JWT tokens set in HTTP-only cookies
 *             schema:
 *               type: string
 *               example: |
 *                 accessToken=NEW_TOKEN...; HttpOnly; Secure; Path=/; Max-Age=604800
 *                 refreshToken=NEW_REFRESH...; HttpOnly; Secure; Path=/; Max-Age=2592000
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
 *                   example: Tokens refreshed successfully
 *       401:
 *         description: Unauthorized - Invalid or expired refresh token
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
 *             examples:
 *               noToken:
 *                 summary: No refresh token in cookie
 *                 value:
 *                   success: false
 *                   message: Refresh token not found
 *               tokenExpired:
 *                 summary: Refresh token expired (> 30 days)
 *                 value:
 *                   success: false
 *                   message: Invalid or expired refresh token
 *               tokenInvalid:
 *                 summary: Token signature invalid
 *                 value:
 *                   success: false
 *                   message: Invalid or expired refresh token
 *               userDeleted:
 *                 summary: User no longer exists
 *                 value:
 *                   success: false
 *                   message: User not found
 */
authRouter.post('/refresh-token', refreshToken);



/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns complete profile data for the currently authenticated user.
 *       
 *       **What happens:**
 *       - Validates access token from HTTP-only cookie
 *       - Extracts user ID from token
 *       - Fetches user data from database
 *       - Includes subscription data (trial status, expiry date)
 *       - Returns full user profile
 *       
 *       **When to use:**
 *       - On app initialization (check if user is logged in)
 *       - After login/register (get user data)
 *       - After profile updates (refresh user data)
 *       - To check subscription status
 *       - To display trial countdown
 *       
 *       **Frontend usage:**
 *       ```javascript
 *       // On app load
 *       useEffect(() => {
 *         fetch('/api/v1/auth/me', {
 *           credentials: 'include' // Important! Sends cookies
 *         })
 *         .then(res => res.json())
 *         .then(data => {
 *           if (data.success) {
 *             setUser(data.data.user);
 *             
 *             // Check trial status
 *             if (data.data.user.subscription.status === 'TRIAL') {
 *               const daysLeft = calculateDaysLeft(
 *                 data.data.user.subscription.trialEndsAt
 *               );
 *               showTrialBanner(daysLeft);
 *             }
 *           }
 *         })
 *         .catch(() => {
 *           // Not logged in, redirect to login
 *           router.push('/login');
 *         });
 *       }, []);
 *       ```
 *       
 *       **Important notes:**
 *       - Requires authentication (protected route)
 *       - Access token must be in cookie
 *       - Returns user + subscription data
 *       - Password NOT included in response
 *     responses:
 *       200:
 *         description: User data retrieved successfully
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
 *                   example: User retrieved successfully
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
 *                           description: Hex color for avatar background
 *                         googleId:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *                           description: Google user ID if linked
 *                         isEmailVerified:
 *                           type: boolean
 *                           example: true
 *                         targetExamDate:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                           example: "2025-04-15T00:00:00.000Z"
 *                           description: User's personal exam goal date
 *                         dailyStudyGoal:
 *                           type: integer
 *                           example: 2
 *                           description: Hours per day
 *                         focusSubjects:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["clp_subject_1", "clp_subject_2"]
 *                           description: Array of subject IDs user wants to focus on
 *                         emailReminders:
 *                           type: boolean
 *                           example: true
 *                         studyStreakAlerts:
 *                           type: boolean
 *                           example: true
 *                         podcastRecommendations:
 *                           type: boolean
 *                           example: true
 *                         showRelevantEpisodes:
 *                           type: boolean
 *                           example: true
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-01-13T18:00:00.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-01-14T10:30:00.000Z"
 *                         lastLoginAt:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                           example: "2025-01-14T10:30:00.000Z"
 *                         subscription:
 *                           type: object
 *                           description: User's subscription details
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: clp_sub_123abc
 *                             userId:
 *                               type: string
 *                               example: clp123abc456def789
 *                             status:
 *                               type: string
 *                               enum: [TRIAL, ACTIVE, EXPIRED, CANCELLED, SUSPENDED]
 *                               example: TRIAL
 *                               description: Current subscription status
 *                             planType:
 *                               type: string
 *                               enum: [MONTHLY, ANNUAL]
 *                               nullable: true
 *                               example: null
 *                               description: Null during trial
 *                             startDate:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-01-13T18:00:00.000Z"
 *                             endDate:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-01-20T18:00:00.000Z"
 *                               description: When subscription ends
 *                             trialEndsAt:
 *                               type: string
 *                               format: date-time
 *                               nullable: true
 *                               example: "2025-01-20T18:00:00.000Z"
 *                               description: When 7-day trial ends
 *                             cancelledAt:
 *                               type: string
 *                               format: date-time
 *                               nullable: true
 *                               example: null
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *       401:
 *         description: Unauthorized - Not logged in or token expired
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
 *             examples:
 *               noToken:
 *                 summary: No access token
 *                 value:
 *                   success: false
 *                   message: Access token not found. Please login.
 *               sessionExpired:
 *                 summary: Both tokens expired
 *                 value:
 *                   success: false
 *                   message: Session expired. Please login again.
 *       404:
 *         description: User not found (deleted account)
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
 *                   example: User not found
 */
authRouter.get('/me', protect, getCurrentUser);


/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Logs out the current user by clearing authentication cookies.
 *       
 *       **What happens:**
 *       - Clears `accessToken` cookie (sets expiry to past)
 *       - Clears `refreshToken` cookie (sets expiry to past)
 *       - Browser automatically removes cookies
 *       - Next request will not have authentication
 *       
 *       **Frontend flow:**
 *       ```javascript
 *       // Logout button click
 *       fetch('/api/v1/auth/logout', {
 *         method: 'POST',
 *         credentials: 'include' // Important! Sends cookies
 *       })
 *       .then(res => res.json())
 *       .then(data => {
 *         if (data.success) {
 *           // Clear user from state
 *           setUser(null);
 *           
 *           // Redirect to login
 *           router.push('/login');
 *         }
 *       });
 *       ```
 *       
 *       **Important notes:**
 *       - Requires authentication (protected route)
 *       - Cookies are cleared on server side
 *       - Frontend should clear user state and redirect to login
 *       - User must login again to access protected routes
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         headers:
 *           Set-Cookie:
 *             description: Cookies cleared (set to expire in past)
 *             schema:
 *               type: string
 *               example: |
 *                 accessToken=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/
 *                 refreshToken=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/
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
 *                   example: Logged out successfully
 *       401:
 *         description: Unauthorized - Not logged in
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
 *                   example: Access token not found. Please login.
 */
authRouter.post('/logout', protect, logout);

export default authRouter