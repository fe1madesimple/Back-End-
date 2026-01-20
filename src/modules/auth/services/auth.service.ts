import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from '@/config/database';
import { BadRequestError, UnauthorizedError, NotFoundError } from '@/utils/errors';
import {
  RegisterInput,
  LoginInput,
  AuthResponse,
  TokenPayload,
  ForgotPasswordInput,
  ResetPasswordInput,
    VerifyEmailInput,
  AuthServiceResponse
} from '../interfaces/auth.interfaces';
import emailService from '@/shared/services/email.service';
import { logger } from '@/shared/utils';


class AuthService {
  /**
   * Generate JWT Access Token
   */
  private generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
  }

  /**
   * Generate random 4-digit code
   */
  private generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  /**
   * Generate JWT Refresh Token
   */
  private generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '30d',
    });
  }

  /**
   * Hash password
   */
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   * Compare password
   */
  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Format user response (exclude sensitive data)
   */
  private formatUserResponse(user: User): AuthResponse['user'] {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profileColor: user.profileColor,
      isEmailVerified: user.isEmailVerified,
    };
  }

  /**
   * Create 7-day trial subscription for new user
   */
  private async createTrialSubscription(userId: string) {
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7); // 7 days trial

    return prisma.subscription.create({
      data: {
        userId,
        status: 'TRIAL',
        startDate: new Date(),
        endDate: trialEndDate,
        trialEndsAt: trialEndDate,
      },
    });
  }

  /**
   * REGISTER NEW USER
   */
  async register(input: RegisterInput): Promise<AuthServiceResponse> {
    const { email, password, firstName, lastName } = input;

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    // Generate 4-digit code (not token)
    const emailVerificationCode = this.generateVerificationCode();
    const emailVerificationExpires = new Date();
    emailVerificationExpires.setHours(emailVerificationExpires.getHours() + 24);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        role: 'STUDENT',
        emailVerificationCode,
        emailVerificationExpires,
        isEmailVerified: false,
      },
    });

    await this.createTrialSubscription(user.id);

    // TODO: Send verification email with 4-digit code
    console.log('[EMAIL PENDING] Verification code:', emailVerificationCode);

    await emailService.sendVerificationCode(user.email, emailVerificationCode, user.firstName);

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken(tokenPayload);
    const needsOnBoarding = true;

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
      needsOnBoarding,
    };
  }
  /**
   * LOGIN USER
   */
  async login(input: LoginInput): Promise<AuthServiceResponse> {
    const { email, password } = input;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.password) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken(tokenPayload);

    // Check if user needs onboarding
    const needsOnBoarding = !user.hasCompletedOnboarding;

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
      needsOnBoarding,
    };
  }

  /**
   * GOOGLE OAUTH LOGIN/REGISTER
   */
  async googleAuth(profile: any): Promise<AuthServiceResponse> {
    const { email, given_name, family_name, sub: googleId } = profile;

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    let isNewUser = false;

    // If user doesn't exist, create new user
    if (!user) {
      isNewUser = true;
      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          firstName: given_name,
          lastName: family_name,
          googleId,
          role: 'STUDENT',
          isEmailVerified: true, 
        },
      });

      // Create 7-day trial subscription
      await this.createTrialSubscription(user.id);
    } else if (!user.googleId) {
      // Link Google account to existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          isEmailVerified: true,
        },
      });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken(tokenPayload);

    // Check if user needs onboarding
    // New OAuth users ALWAYS need onboarding
    // Existing users only if they haven't completed it
    const needsOnBoarding = isNewUser || !user.hasCompletedOnboarding;

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
      needsOnBoarding,
    };
  }

  /**
   * FORGOT PASSWORD
   */
  async forgotPassword(input: ForgotPasswordInput): Promise<void> {
    const { email } = input;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return;
    }

    // Generate 4-digit code (not token)
    const resetCode = this.generateVerificationCode();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetCode: resetCode,
        passwordResetExpires: resetExpires,
      },
    });

    //Send reset email with 4-digit code
    console.log('📧 [EMAIL PENDING] Password reset code:', resetCode);
    await emailService.sendPasswordResetCode(user.email, resetCode, user.firstName);
  }

  /**
   * RESET PASSWORD
   */
  async resetPassword(input: ResetPasswordInput): Promise<void> {
    const { code, password } = input; // Changed from token to code

    const user = await prisma.user.findFirst({
      where: {
        passwordResetCode: code,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestError('Invalid or expired reset code');
    }

    const hashedPassword = await this.hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetCode: null,
        passwordResetExpires: null,
      },
    });

    console.log('📧 [EMAIL PENDING] Password changed for:', user.email);
  }

  /**
   * VERIFY EMAIL
   */

  async verifyEmail(input: VerifyEmailInput): Promise<AuthServiceResponse> {
    const { email, code } = input;

    // Use transaction to prevent race conditions
    const user = await prisma.$transaction(async (tx) => {
      // 1. Find user with row-level lock (prevents race conditions)
      const foundUser = await tx.user.findFirst({
        where: {
          email: email.toLowerCase(),
        },
      });

      if (!foundUser) {
        throw new BadRequestError('Invalid email or verification code');
      }

      // 2. Check if already verified
      if (foundUser.isEmailVerified) {
        throw new BadRequestError('Email is already verified');
      }

      // 3. Check if account is locked due to too many attempts
      if (foundUser.verificationLockedUntil && foundUser.verificationLockedUntil > new Date()) {
        const minutesLeft = Math.ceil(
          (foundUser.verificationLockedUntil.getTime() - Date.now()) / 60000
        );
        throw new BadRequestError(
          `Too many failed attempts. Please try again in ${minutesLeft} minutes or request a new code.`
        );
      }

      // 4. Check if code is expired
      if (!foundUser.emailVerificationExpires || foundUser.emailVerificationExpires < new Date()) {
        throw new BadRequestError('Verification code has expired. Please request a new one.');
      }

      // 5. Check if code matches
      if (foundUser.emailVerificationCode !== code) {
        // Increment failed attempts
        const failedAttempts = foundUser.verificationFailedAttempts + 1;
        const maxAttempts = 5;

        // Lock account if too many attempts
        if (failedAttempts >= maxAttempts) {
          await tx.user.update({
            where: { id: foundUser.id },
            data: {
              verificationFailedAttempts: failedAttempts,
              verificationLockedUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
            },
          });
          throw new BadRequestError(
            'Too many failed attempts. Your verification is locked for 15 minutes. Please request a new code.'
          );
        }

        // Update failed attempts
        await tx.user.update({
          where: { id: foundUser.id },
          data: {
            verificationFailedAttempts: failedAttempts,
          },
        });

        const attemptsLeft = maxAttempts - failedAttempts;
        throw new BadRequestError(
          `Invalid verification code. ${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} remaining.`
        );
      }

      // 6. Code is correct - verify email
      const verifiedUser = await tx.user.update({
        where: { id: foundUser.id },
        data: {
          isEmailVerified: true,
          emailVerificationCode: null,
          emailVerificationExpires: null,
          verificationFailedAttempts: 0,
          verificationLockedUntil: null,
          lastLoginAt: new Date(), // Update last login
        },
      });

      return verifiedUser;
    });

    // 7. Send welcome email (outside transaction - async, non-blocking)
    emailService.sendWelcomeEmail(user.email, user.firstName).catch((error) => {
      logger.error('Failed to send welcome email', {
        email: user.email,
        error: error.message,
      });
    });

    // 8. Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken(tokenPayload);

    // 9. New users ALWAYS need onboarding after email verification
    const needsOnBoarding = true;

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
      needsOnBoarding,
    };
  }

  /**
   * REFRESH TOKEN
   */
  async refreshToken(
    oldRefreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET!) as TokenPayload;

      // Check if user still exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      // Generate new tokens
      const tokenPayload: TokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const newAccessToken = this.generateAccessToken(tokenPayload);
      const newRefreshToken = this.generateRefreshToken(tokenPayload);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }

  /**
   * GET CURRENT USER
   */
  async getCurrentUser(userId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async resendVerificationCode(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if email exists (security)
      return;
    }

    if (user.isEmailVerified) {
      throw new BadRequestError('Email is already verified');
    }

    // Generate new code and reset attempts
    const code = this.generateVerificationCode();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationCode: code,
        emailVerificationExpires: expires,
        verificationFailedAttempts: 0, // Reset attempts
        verificationLockedUntil: null, // Unlock account
      },
    });

    await emailService.sendVerificationCode(user.email, code, user.firstName);
  }
}

export default new AuthService();