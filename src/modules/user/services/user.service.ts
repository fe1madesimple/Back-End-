import bcrypt from 'bcryptjs';
import prisma from '@/config/database';
import { UnauthorizedError, NotFoundError } from '@/utils/errors';
import {
  UpdateProfileInput,
  UpdatePreferencesInput,
  ChangePasswordInput,
} from '../interfaces/user.interfaces';
import emailService from '@/shared/services/email.service';



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

    console.log(user);
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
    await prisma.deletedUserAnalytics.create({
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

    await emailService.sendAccountDeletionEmail(user.email, user.fullName || 'Student');
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

  async exportUserData(userId: string): Promise<Buffer> {
    // Fetch comprehensive user data
    const [
      user,
      subjectProgress,
      moduleProgress,
      lessonProgress,
      quizSessions,
      questionAttempts,
      essayAttempts,
      simulations,
      savedCases,
      achievements,
      studySessions,
      podcastProgress,
    ] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true },
      }),
      prisma.userSubjectProgress.findMany({
        where: { userId },
        include: { subject: true },
      }),
      prisma.userModuleProgress.findMany({
        where: { userId },
        include: { module: { include: { subject: true } } },
      }),
      prisma.userLessonProgress.findMany({
        where: { userId },
        include: {
          lesson: {
            include: {
              module: {
                include: { subject: true },
              },
            },
          },
        },
      }),
      prisma.quizSession.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.questionAttempt.findMany({
        where: { userId },
        include: { question: true },
      }),
      prisma.essayAttempt.findMany({
        where: { userId },
        include: { question: { include: { parentQuestion: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.simulation.findMany({
        where: { userId },
        include: {
          attempts: {
            include: { question: { include: { parentQuestion: true } } },
          },
        },
        orderBy: { startedAt: 'desc' },
      }),
      prisma.savedCase.findMany({
        where: { userId },
        include: { caseBrief: true },
      }),
      prisma.userAchievement.findMany({
        where: { userId },
        include: { achievement: true },
        orderBy: { unlockedAt: 'desc' },
      }),
      prisma.dailyStudySession.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
      }),
      prisma.userPodcastProgress.findMany({
        where: { userId },
        include: { podcast: true },
      }),
    ]);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Calculate statistics
    const totalStudyHours = studySessions.reduce((sum, s) => sum + s.todayTotalSeconds, 0) / 3600;
    const completedLessons = lessonProgress.filter((l) => l.isCompleted).length;
    const totalQuizAccuracy =
      questionAttempts.length > 0
        ? (questionAttempts.filter((a) => a.isCorrect).length / questionAttempts.length) * 100
        : 0;
    const passedSimulations = simulations.filter((s) => s.passed).length;
    const averageEssayScore =
      essayAttempts.length > 0
        ? essayAttempts.reduce((sum, e) => sum + (e.aiScore || 0), 0) / essayAttempts.length
        : 0;

    // Current streak calculation
    let currentStreak = 0;
    const sortedSessions = studySessions
      .filter((s) => s.todayTotalSeconds > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let expectedDate = new Date();
    expectedDate.setHours(0, 0, 0, 0);

    for (const session of sortedSessions) {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);
      if (sessionDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Generate PDF using PDFKit
    const PDFDocument = require('pdfkit');
    const axios = require('axios');

    const doc = new PDFDocument({ margin: 50 });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));

    // Fetch logo from Cloudinary
    const logoUrl =
      'https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png';
    let logoBuffer: Buffer | null = null;

    try {
      const response = await axios.get(logoUrl, { responseType: 'arraybuffer' });
      logoBuffer = Buffer.from(response.data);
    } catch (error) {
      console.error('Failed to fetch logo:', error);
    }

    // Header with logo
    if (logoBuffer) {
      doc.image(logoBuffer, 50, 40, { width: 120 });
      doc.moveDown(5);
    }

    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .text('FE-1 Made Simple', { align: 'center' })
      .moveDown(0.5);
    doc
      .fontSize(18)
      .font('Helvetica')
      .text('Student Progress Report', { align: 'center' })
      .moveDown(0.5);
    doc
      .fontSize(10)
      .text(`Generated: ${new Date().toLocaleDateString('en-IE', { dateStyle: 'full' })}`, {
        align: 'center',
      })
      .moveDown(2);

    // Personal Information
    doc.fontSize(16).font('Helvetica-Bold').text('Personal Information').moveDown(0.5);
    doc
      .fontSize(11)
      .font('Helvetica')
      .text(`Name: ${user.fullName || 'Not provided'}`)
      .text(`Email: ${user.email}`)
      .text(`Account Type: ${user.subscription?.planType || 'Free'}`)
      .text(`Subscription Status: ${user.subscription?.status || 'No active subscription'}`)
      .text(`Target Exam Date: ${user.targetExamDate?.toLocaleDateString('en-IE') || 'Not set'}`)
      .text(`Daily Study Goal: ${user.dailyStudyGoal} hours`)
      .text(
        `Focus Subjects: ${user.focusSubjects.length > 0 ? user.focusSubjects.join(', ') : 'None selected'}`
      )
      .moveDown(2);

    // Study Statistics
    doc.fontSize(16).font('Helvetica-Bold').text('Study Statistics').moveDown(0.5);
    doc
      .fontSize(11)
      .font('Helvetica')
      .text(`Total Study Time: ${totalStudyHours.toFixed(1)} hours`)
      .text(`Current Streak: ${currentStreak} days`)
      .text(`Lessons Completed: ${completedLessons}`)
      .text(`Modules Completed: ${moduleProgress.filter((m) => m.status === 'COMPLETED').length}`)
      .text(`Quiz Accuracy: ${totalQuizAccuracy.toFixed(1)}%`)
      .text(`Quiz Sessions Completed: ${quizSessions.filter((q) => q.isCompleted).length}`)
      .text(`Average Essay Score: ${averageEssayScore.toFixed(1)}%`)
      .text(`Total Essays Submitted: ${essayAttempts.length}`)
      .text(`Simulations Passed: ${passedSimulations} / ${simulations.length}`)
      .text(`Achievements Unlocked: ${achievements.length}`)
      .text(`Cases Saved: ${savedCases.length}`)
      .text(`Podcasts Listened: ${podcastProgress.filter((p) => p.isCompleted).length}`)
      .moveDown(2);

    // Subject Progress
    if (subjectProgress.length > 0) {
      doc.fontSize(16).font('Helvetica-Bold').text('Subject Progress').moveDown(0.5);
      subjectProgress.forEach((sp) => {
        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .text(`${sp.subject.name}`, { continued: true })
          .font('Helvetica')
          .text(
            ` - ${sp.progressPercent.toFixed(0)}% complete (${(sp.totalTimeSeconds / 3600).toFixed(1)}hrs)`
          );
      });
      doc.moveDown(2);
    }

    // Recent Essay Attempts (Top 10)
    if (essayAttempts.length > 0) {
      doc.fontSize(16).font('Helvetica-Bold').text('Recent Essay Practice (Last 10)').moveDown(0.5);
      essayAttempts.slice(0, 10).forEach((attempt, index) => {
        doc
          .fontSize(10)
          .font('Helvetica-Bold')
          .text(`${index + 1}. ${attempt.question.subject} - ${attempt.question.examType}`, {
            continued: true,
          })
          .font('Helvetica')
          .text(` (Score: ${attempt.aiScore || 'Pending'}%)`)
          .fontSize(9)
          .text(`   Submitted: ${attempt.createdAt.toLocaleDateString('en-IE')}`)
          .text(`   Time Taken: ${Math.floor(attempt.timeTakenSeconds / 60)} minutes`)
          .text(`   Word Count: ${attempt.wordCount}`)
          .moveDown(0.5);
      });
      doc.moveDown(1);
    }

    // Simulation Results
    if (simulations.length > 0) {
      doc.addPage();

      // Add logo to new page
      if (logoBuffer) {
        doc.image(logoBuffer, 50, 40, { width: 80 });
        doc.moveDown(4);
      }

      doc.fontSize(16).font('Helvetica-Bold').text('Simulation Results').moveDown(0.5);
      simulations.forEach((sim, index) => {
        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .text(`Simulation ${index + 1}`)
          .font('Helvetica')
          .text(`Date: ${sim.startedAt.toLocaleDateString('en-IE')}`)
          .text(`Overall Score: ${sim.overallScore || 'Incomplete'}%`)
          .text(`Status: ${sim.passed ? 'Passed ✓' : 'Failed ✗'}`)
          .text(
            `Time Taken: ${sim.totalTimeSeconds ? Math.floor(sim.totalTimeSeconds / 60) : 'N/A'} minutes`
          )
          .text(`Questions Answered: ${sim.attempts.length} / 5`)
          .moveDown(1);
      });
      doc.moveDown(1);
    }

    // Achievements
    if (achievements.length > 0) {
      doc.addPage();

      // Add logo to new page
      if (logoBuffer) {
        doc.image(logoBuffer, 50, 40, { width: 80 });
        doc.moveDown(4);
      }

      doc.fontSize(16).font('Helvetica-Bold').text('Achievements Unlocked').moveDown(0.5);
      achievements.forEach((ua) => {
        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .text(`${ua.achievement.icon || '🏆'} ${ua.achievement.title}`)
          .fontSize(10)
          .font('Helvetica')
          .text(`   ${ua.achievement.description}`)
          .text(`   Unlocked: ${ua.unlockedAt.toLocaleDateString('en-IE')}`)
          .moveDown(0.5);
      });
      doc.moveDown(1);
    }

    // Saved Cases
    if (savedCases.length > 0) {
      doc.addPage();

      // Add logo to new page
      if (logoBuffer) {
        doc.image(logoBuffer, 50, 40, { width: 80 });
        doc.moveDown(4);
      }

      doc.fontSize(16).font('Helvetica-Bold').text('Saved Case Law').moveDown(0.5);
      savedCases.forEach((sc) => {
        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .text(sc.caseBrief.caseName)
          .fontSize(10)
          .font('Helvetica')
          .text(`   Citation: ${sc.caseBrief.citation}`)
          .text(`   Year: ${sc.caseBrief.year}`)
          .text(`   Court: ${sc.caseBrief.court}`)
          .text(`   Jurisdiction: ${sc.caseBrief.jurisdiction}`)
          .text(`   Saved: ${sc.createdAt.toLocaleDateString('en-IE')}`)
          .text(`   Last Reviewed: ${sc.lastReviewedAt?.toLocaleDateString('en-IE') || 'Never'}`)
          .moveDown(0.5);
      });
    }

    // Footer
    doc
      .moveDown(2)
      .fontSize(9)
      .font('Helvetica')
      .text(
        'This report contains your personal study data from FE-1 Made Simple. Keep it confidential.',
        { align: 'center' }
      );

    doc.end();

    // Return PDF buffer
    return new Promise((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });
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
