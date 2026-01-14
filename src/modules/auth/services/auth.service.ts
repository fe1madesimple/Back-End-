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
import crypto from 'crypto';

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
   * Generate JWT Refresh Token
   */
  private generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '30d',
    });
  }

  /**
   * Generate random token for email verification/password reset
   */
  private generateRandomToken(): string {
    return crypto.randomBytes(32).toString('hex');
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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Generate email verification token
    const emailVerificationToken = this.generateRandomToken();
    const emailVerificationExpires = new Date();
    emailVerificationExpires.setHours(emailVerificationExpires.getHours() + 24); // 24 hours

    // Create user
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

    // Create 7-day trial subscription
    await this.createTrialSubscription(user.id);

    // TODO: Send verification email (Brevo pending)
    // await emailService.sendVerificationEmail(user.email, emailVerificationToken);
    console.log('📧 [EMAIL PENDING] Verification token:', emailVerificationToken);

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken(tokenPayload);

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
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

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
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

    // If user doesn't exist, create new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          firstName: given_name,
          lastName: family_name,
          googleId,
          role: 'STUDENT',
          isEmailVerified: true, // Google emails are pre-verified
        },
      });

      // Create 7-day trial subscription
      await this.createTrialSubscription(user.id);
    } else if (!user.googleId) {
      // Link Google account to existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId, isEmailVerified: true },
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

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  /**
   * FORGOT PASSWORD
   */
  async forgotPassword(input: ForgotPasswordInput): Promise<void> {
    const { email } = input;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if user exists (security best practice)
      return;
    }

    // Generate reset token
    const resetToken = this.generateRandomToken();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // 1 hour

    // Save reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetCode: resetToken,
        passwordResetExpires: resetExpires,
      },
    });

    // TODO: Send reset email (Brevo pending)
    // await emailService.sendPasswordResetEmail(user.email, resetToken);
    console.log('📧 [EMAIL PENDING] Password reset token:', resetToken);
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
  async verifyEmail(input: VerifyEmailInput): Promise<void> {
    const { code } = input;
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationCode: code,
        emailVerificationExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestError('Invalid or expired verification code');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationCode: null,
        emailVerificationExpires: null,
      },
    });

    console.log('📧 [EMAIL PENDING] Welcome email for:', user.email);
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
}

export default new AuthService();