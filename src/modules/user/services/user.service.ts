import bcrypt from 'bcryptjs';
import prisma from '@/config/database';
import { BadRequestError, UnauthorizedError, NotFoundError } from '@/utils/errors';
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
}




export default new UserService()