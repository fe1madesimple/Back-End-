import bcrypt from 'bcryptjs';
import prisma from '@/config/database';
import {UnauthorizedError, NotFoundError } from '@/utils/errors';
import {
  UpdateProfileInput,
  UpdatePreferencesInput,
  ChangePasswordInput,
} from '../interfaces/user.interfaces';





class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        profileColor: true,
        googleId: true,
        isEmailVerified: true,
        targetExamDate: true,
        dailyStudyGoal: true,
        focusSubjects: true,
        emailReminders: true,
        studyStreakAlerts: true,
        podcastRecommendations: true,
        showRelevantEpisodes: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        subscription: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...input,
        targetExamDate: input.targetExamDate ? new Date(input.targetExamDate) : undefined,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profileColor: true,
        targetExamDate: true,
        dailyStudyGoal: true,
        focusSubjects: true,
      },
    });

    return user;
  }

  async updatePreferences(userId: string, input: UpdatePreferencesInput) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: input,
      select: {
        emailReminders: true,
        studyStreakAlerts: true,
        podcastRecommendations: true,
        showRelevantEpisodes: true,
      },
    });

    return user;
  }

  async changePassword(userId: string, input: ChangePasswordInput) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      throw new UnauthorizedError('Cannot change password for OAuth users');
    }

    const isValid = await bcrypt.compare(input.currentPassword, user.password);

    if (!isValid) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(input.newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async deleteAccount(userId: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new UnauthorizedError('Incorrect password');
      }
    }

    await prisma.user.delete({
      where: { id: userId },
    });
  }


  async getOnboardingStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        hasCompletedOnboarding: true,
        onboardingSkipped: true,
      },
    });

    const res = {
      completed: user?.hasCompletedOnboarding || false,
      skipped: user?.onboardingSkipped || false,
    };


    return res 
  }
}







export default new UserService()