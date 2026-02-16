import bcrypt from 'bcryptjs';
import prisma from '@/config/database';
import { UnauthorizedError, NotFoundError } from '@/utils/errors';
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
        fullName: true,
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
        fullName: true,
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

  async deleteAccount(
    userId: string,
    password: string,
    deletionReason?: string,
    feedback?: string
  ) {
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

    console.log('📊 Collecting user analytics before deletion...');

    // Get all subjects
    const allSubjects = await prisma.subject.findMany({
      select: { id: true, name: true },
    });

    // Get user's subject progress
    const userSubjectProgress = await prisma.userSubjectProgress.findMany({
      where: { userId },
      include: {
        subject: { select: { name: true } },
      },
    });

    const subjectsStarted = userSubjectProgress.length;

    const subjectsCompleted = userSubjectProgress.filter((s) => s.status === 'COMPLETED').length;

    const subjectsNeverOpened = allSubjects.length - subjectsStarted;

    const subjectProgressData = userSubjectProgress.map((sp) => ({
      subjectName: sp.subject.name,
      progressPercent: sp.progressPercent,
      timeSpentSeconds: sp.totalTimeSeconds,
    }));

    // Get module progress
    const modulesCompleted = await prisma.userModuleProgress.count({
      where: { userId, status: 'COMPLETED' },
    });

    // Get lesson progress
    const lessonsCompleted = await prisma.userLessonProgress.count({
      where: { userId, isCompleted: true },
    });

    const allLessonProgress = await prisma.userLessonProgress.findMany({
      where: { userId },
      select: { timeSpentSeconds: true },
    });

    const totalStudyTimeSeconds = allLessonProgress.reduce(
      (sum, lp) => sum + lp.timeSpentSeconds,
      0
    );

    // Get quiz data
    const completedSessions = await prisma.quizSession.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      select: {
        correctAnswers: true,
        totalQuestions: true,
        questionsAnswered: true,
        quizType: true,
        completedAt: true,
      },
    });

    const fullyCompletedSessions = completedSessions.filter(
      (s) => s.questionsAnswered === s.totalQuestions
    );

    const totalQuizzesTaken = fullyCompletedSessions.length;

    const totalMCQsAttempted = await prisma.questionAttempt.count({
      where: { userId },
    });

    const quizScoresData = fullyCompletedSessions.map((s) => ({
      date: s.completedAt?.toISOString().split('T')[0],
      score: Math.round((s.correctAnswers / s.totalQuestions) * 100),
      quizType: s.quizType,
    }));

    const averageQuizScore = user.averageQuizScore || 0;
    const highestQuizScore = user.highestQuizScore || 0;
    const lowestQuizScore = user.lowestQuizScore || 0;

    // Get subscription data
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    const payments = await prisma.payment.findMany({
      where: { userId },
      select: { amount: true },
    });

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount / 100, 0);

    const daysActive = Math.ceil(
      (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );

    // Save analytics
    const deleteData = await prisma.deletedUserAnalytics.create({
      data: {
        originalUserId: userId,
        email: user.email,
        fullName: user.fullName,
        accountCreatedAt: user.createdAt,
        daysActive,
        subjectsStarted,
        subjectsCompleted,
        subjectsNeverOpened,
        subjectProgress: subjectProgressData,
        modulesCompleted,
        lessonsCompleted,
        totalStudyTimeSeconds,
        totalQuizzesTaken,
        totalMCQsAttempted,
        averageQuizScore,
        highestQuizScore,
        lowestQuizScore,
        quizScores: quizScoresData,
        hadSubscription: !!subscription,
        subscriptionPlan: subscription?.planType || null,
        totalRevenue,
        deletionReason,
        feedback,
      },
    });

    console.log(deleteData, "deleted data analytics")

    console.log('✅ Analytics saved. Now deleting account and related data...');

    // Delete all related data
    await prisma.$transaction([
      prisma.quizSession.deleteMany({ where: { userId } }),
      prisma.questionAttempt.deleteMany({ where: { userId } }),
      prisma.userLessonProgress.deleteMany({ where: { userId } }),
      prisma.userModuleProgress.deleteMany({ where: { userId } }),
      prisma.userSubjectProgress.deleteMany({ where: { userId } }),
      prisma.userPodcastProgress.deleteMany({ where: { userId } }),
      prisma.savedCase.deleteMany({ where: { userId } }),
      prisma.userAchievement.deleteMany({ where: { userId } }),
      prisma.playlist.deleteMany({ where: { userId } }),
      prisma.timedSession.deleteMany({ where: { userId } }),
      prisma.aIEvaluation.deleteMany({ where: { userId } }),
      prisma.studyLog.deleteMany({ where: { userId } }),
      prisma.quizAttempt.deleteMany({ where: { userId } }),
      prisma.subscription.deleteMany({ where: { userId } }),
      prisma.payment.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    console.log('✅ Account deleted successfully');
  }

  async getOnboardingStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        hasCompletedOnboarding: true,
        onboardingSkipped: true,
        onboardingCompletedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      completed: user.hasCompletedOnboarding,
      skipped: user.onboardingSkipped,
      completedAt: user.onboardingCompletedAt,
    };
  }

  async exportUserData(userId: string) {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
        quizAttempts: true,
        timedSessions: {
          include: { aiEvaluation: true },
        },
        savedCases: {
          include: { caseBrief: true },
        },
        achievements: {
          include: { achievement: true },
        },
      },
    });

    if (!userData) {
      throw new NotFoundError('User not found');
    }

    const sanitizedData = {
      ...userData,
      password: undefined,
      passwordResetCode: undefined,
      emailVerificationCode: undefined,
    };

    return sanitizedData;
  }

  async completeOnboarding(
    userId: string,
    focusSubjects: string[],
    targetExamDate?: string,
    dailyStudyGoal?: number
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        focusSubjects,
        targetExamDate: targetExamDate ? new Date(targetExamDate) : undefined,
        dailyStudyGoal: dailyStudyGoal || 2,
        hasCompletedOnboarding: true,
        onboardingSkipped: false,
        onboardingCompletedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        profileColor: true,
        isEmailVerified: true,
        targetExamDate: true,
        dailyStudyGoal: true,
        focusSubjects: true,
        hasCompletedOnboarding: true,
        onboardingSkipped: true,
        onboardingCompletedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async skipOnboarding(userId: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        hasCompletedOnboarding: true,
        onboardingSkipped: true,
        onboardingCompletedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        profileColor: true,
        isEmailVerified: true,
        hasCompletedOnboarding: true,
        onboardingSkipped: true,
        onboardingCompletedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}

export default new UserService();
