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
  AuthServiceResponse,
  VerifyResetCodeInput
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
      fullName: user.fullName!,
      role: user.role,
      profileColor: user.profileColor,
      isEmailVerified: user.isEmailVerified,
    };
  }

  /**
   * Create 7-day trial subscription for new user
   */
  // private async createTrialSubscription(userId: string) {
  //   const trialEndDate = new Date();
  //   trialEndDate.setDate(trialEndDate.getDate() + 7);

  //   return prisma.subscription.create({
  //     data: {
  //       userId,
  //       status: 'TRIAL',
  //       currentPeriodStart: new Date(),
  //       currentPeriodEnd: trialEndDate,
  //       trialEndsAt: trialEndDate,
  //     },
  //   });
  // }

  /**
   * REGISTER NEW USER
   */
  async register(input: RegisterInput): Promise<{ message: string }> {
    const { email, password, fullName } = input;

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
    emailVerificationExpires.setMinutes(emailVerificationExpires.getMinutes() + 10); // 10 minutes

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName,
        role: 'STUDENT',
        emailVerificationCode,
        emailVerificationExpires,
        isEmailVerified: false,
      },
    });

    // Send verification email with 4-digit code
    await emailService.sendVerificationCode(user.email, emailVerificationCode, user.fullName!);

    return {
      message: 'Verification code sent to your email',
    };
  }

  /**
   * LOGIN USER
   */
  async login(input: LoginInput): Promise<AuthServiceResponse> {
    const { email, password } = input;

    // Find user with subscription
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        subscription: true,
      },
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

    // Calculate subscription info
    let subscriptionInfo = null;
    if (user.subscription) {
      const now = new Date();
      const daysRemaining = user.subscription.currentPeriodEnd
        ? Math.ceil(
            (user.subscription.currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          )
        : 0;

      subscriptionInfo = {
        status: user.subscription.status,
        planType: user.subscription.planType,
        daysRemaining,
        trialEndsAt: user.subscription.trialEndsAt,
        currentPeriodEnd: user.subscription.currentPeriodEnd,
      };
    }

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
      needsOnBoarding,
      subscription: subscriptionInfo,
    };
  }

  /**
   * GOOGLE OAUTH LOGIN/REGISTER
   */
  async googleAuth(profile: any): Promise<AuthServiceResponse> {
    const { email, given_name, family_name, sub: googleId } = profile;

    const fullName = `${given_name} ${family_name}`.trim();

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { subscription: true },
    });

    let isNewUser = false;
    let subscription = user?.subscription || null;

    // If user doesn't exist, create new user
    if (!user) {
      isNewUser = true;

      // Create user and trial subscription in transaction
      const result = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email: email.toLowerCase(),
            fullName,
            googleId,
            role: 'STUDENT',
            isEmailVerified: true,
          },
        });

        // Create 7-day trial subscription
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 7);

        const newSubscription = await tx.subscription.create({
          data: {
            userId: newUser.id,
            status: 'TRIAL',
            currentPeriodStart: new Date(),
            currentPeriodEnd: trialEndDate,
            trialEndsAt: trialEndDate,
          },
        });

        return { user: newUser, subscription: newSubscription };
      });

      // Fetch user with subscription included
      user = await prisma.user.findUnique({
        where: { id: result.user.id },
        include: { subscription: true },
      });

      subscription = result.subscription;

      // Send welcome email with trial info (only for new users)
      if (user) {
        emailService.sendWelcomeEmailWithTrial(user.email, user.fullName!).catch((error) => {
          logger.error('Failed to send welcome email', {
            email: user!.email,
            error: error.message,
          });
        });
      }
    } else if (!user.googleId) {
      // Link Google account to existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          isEmailVerified: true,
        },
        include: { subscription: true },
      });
    }

    // Safety check (should never happen)
    if (!user) {
      throw new Error('User creation failed');
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
    const needsOnBoarding = isNewUser || !user.hasCompletedOnboarding;

    // Calculate subscription info
    let subscriptionInfo = null;
    if (subscription) {
      const now = new Date();
      const daysRemaining = subscription.currentPeriodEnd
        ? Math.ceil(
            (subscription.currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          )
        : 0;

      subscriptionInfo = {
        status: subscription.status,
        planType: subscription.planType,
        daysRemaining,
        trialEndsAt: subscription.trialEndsAt,
        currentPeriodEnd: subscription.currentPeriodEnd,
      };
    }

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
      needsOnBoarding,
      subscription: subscriptionInfo,
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
    await emailService.sendPasswordResetCode(user.email, resetCode, user.fullName!);
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
      // 1. Find user
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

      // 3. Check if code is expired
      if (!foundUser.emailVerificationExpires || foundUser.emailVerificationExpires < new Date()) {
        throw new BadRequestError('Verification code has expired. Please request a new one.');
      }

      // 4. Check if code matches
      if (foundUser.emailVerificationCode !== code) {
        throw new BadRequestError('Invalid verification code');
      }

      // 5. Code is correct - verify email
      const verifiedUser = await tx.user.update({
        where: { id: foundUser.id },
        data: {
          isEmailVerified: true,
          emailVerificationCode: null,
          emailVerificationExpires: null,
          verificationFailedAttempts: 0,
          verificationLockedUntil: null,
          lastLoginAt: new Date(),
        },
      });

      // 6. Create trial subscription
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);

      const subscription = await tx.subscription.create({
        data: {
          userId: verifiedUser.id,
          status: 'TRIAL',
          currentPeriodStart: new Date(),
          currentPeriodEnd: trialEndDate,
          trialEndsAt: trialEndDate,
        },
      });

      return { user: verifiedUser, subscription };
    });

    // 7. Send welcome email with trial info
    emailService.sendWelcomeEmailWithTrial(user.user.email, user.user.fullName!).catch((error) => {
      logger.error('Failed to send welcome email', {
        email: user.user.email,
        error: error.message,
      });
    });

    // 8. Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.user.id,
      email: user.user.email,
      role: user.user.role,
    };

    const accessToken = this.generateAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken(tokenPayload);

    // 9. New users ALWAYS need onboarding after email verification
    const needsOnBoarding = true;

    // 10. Calculate subscription info
    const now = new Date();
    const daysRemaining = user.subscription.currentPeriodEnd
      ? Math.ceil(
          (user.subscription.currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

    const subscriptionInfo = {
      status: user.subscription.status,
      planType: user.subscription.planType,
      daysRemaining,
      trialEndsAt: user.subscription.trialEndsAt,
      currentPeriodEnd: user.subscription.currentPeriodEnd,
    };

    return {
      user: this.formatUserResponse(user.user),
      accessToken,
      refreshToken,
      needsOnBoarding,
      subscription: subscriptionInfo,
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
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationCode: code,
        emailVerificationExpires: expires,
        verificationFailedAttempts: 0, // Reset attempts
        verificationLockedUntil: null, // Unlock account
      },
    });

    await emailService.sendVerificationCode(user.email, code, user.fullName!);
  }

  async resendPasswordResetCode(input: ForgotPasswordInput): Promise<void> {
    const { email } = input;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return;
    }

    // Generate new 4-digit code
    const resetCode = this.generateVerificationCode();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetCode: resetCode,
        passwordResetExpires: resetExpires,
      },
    });

    // Send new code
    await emailService.sendPasswordResetCode(user.email, resetCode, user.fullName!);
  }

  async verifyResetCode(input: VerifyResetCodeInput): Promise<void> {
    const { email, code } = input;

    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        passwordResetCode: code,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestError('Invalid or expired reset code');
    }
  }
}

export default new AuthService();
