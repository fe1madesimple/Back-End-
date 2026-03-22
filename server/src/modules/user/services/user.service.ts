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

    const allSubjects = await prisma.subject.findMany({
      select: { id: true, name: true },
    });

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

    const modulesCompleted = await prisma.userModuleProgress.count({
      where: { userId, status: 'COMPLETED' },
    });

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

    const completedSessions = await prisma.quizSession.findMany({
      where: { userId, isCompleted: true },
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

  // ─── exportUserData — replace existing method in user.service.ts ─────────────
  // Uses puppeteer to render HTML → PDF.
  // Install if not already: npm install puppeteer
  //
  // Logo: https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png

  async exportUserData(userId: string): Promise<Buffer> {
    const [
  user,
  subjectProgress,
  lessonProgress,      // ← was position 3, stays position 3
  quizSessions,        // ← was position 4, stays position 4
  questionAttempts,    // ← was position 5, stays position 5
  essayAttempts,       // ← was position 6, stays position 6
  simulations,         // ← was position 7, stays position 7
  savedCases,          // ← was position 8, stays position 8
  achievements,        // ← was position 9, stays position 9
  studySessions,       // ← was position 10, stays position 10
  podcastProgress,     // ← was position 11, stays position 11
] = await Promise.all([
  prisma.user.findUnique({ where: { id: userId }, include: { subscription: true } }),
  prisma.userSubjectProgress.findMany({ where: { userId }, include: { subject: true } }),
  prisma.userLessonProgress.findMany({
    where: { userId },
    include: { lesson: { include: { module: { include: { subject: true } } } } },
  }),
  prisma.quizSession.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
  prisma.questionAttempt.findMany({ where: { userId }, include: { question: true } }),
  prisma.essayAttempt.findMany({
    where: { userId },
    include: {
      question: true,
      essayQuestion: { select: { subject: true } },
    },
    orderBy: { createdAt: 'desc' },
  }),
  prisma.simulation.findMany({
    where: { userId },
    include: { attempts: { include: { question: true } } },
    orderBy: { startedAt: 'desc' },
  }),
  prisma.savedCase.findMany({ where: { userId }, include: { caseBrief: true } }),
  prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
    orderBy: { unlockedAt: 'desc' },
  }),
  prisma.dailyStudySession.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
  prisma.userPodcastProgress.findMany({ where: { userId }, include: { podcast: true } }),
]);

    if (!user) throw new NotFoundError('User not found');

    // ── Computed stats ──────────────────────────────────────────────────────────
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
    const completedQuizSessions = quizSessions.filter((q) => q.isCompleted).length;

    // ── Streak ────────────────────────────────────────────────────────────────── 
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
      } else break;
    }

    // ── Subject progress bars HTML ──────────────────────────────────────────────
    const subjectBarsHTML =
      subjectProgress.length > 0
        ? subjectProgress
            .map((sp) => {
              const pct = Math.round(sp.progressPercent);
              const hrs = (sp.totalTimeSeconds / 3600).toFixed(1);
              const color = pct >= 80 ? '#16a34a' : pct >= 50 ? '#2563eb' : '#dc2626';
              return `
          <div class="subject-row">
            <div class="subject-label">
              <span class="subject-name">${sp.subject.name}</span>
              <span class="subject-meta">${hrs}hrs</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
            </div>
            <span class="subject-pct">${pct}%</span>
          </div>`;
            })
            .join('')
        : '<p class="empty">No subject progress recorded yet.</p>';

    // ── Recent essays HTML ──────────────────────────────────────────────────────
    const essaysHTML =
      essayAttempts.length > 0
        ? essayAttempts
            .slice(0, 10)
            .map((attempt, i) => {
              const score = attempt.aiScore ?? 0;
              const passed = score >= 50;
              const subject =
                attempt.question?.subject ?? attempt.essayQuestion?.subject ?? 'Unknown';
              const examType = attempt.question?.examType ?? 'Essay';
              const date = attempt.createdAt.toLocaleDateString('en-IE');
              const mins = Math.floor(attempt.timeTakenSeconds / 60);
              const badgeClass = passed ? 'badge-pass' : 'badge-fail';
              const badgeText = passed ? 'Pass' : 'Fail';
              return `
          <tr>
            <td>${i + 1}</td>
            <td>${subject}</td>
            <td>${examType}</td>
            <td><span class="badge ${badgeClass}">${score}% — ${badgeText}</span></td>
            <td>${date}</td>
            <td>${mins} min</td>
            <td>${attempt.wordCount}</td>
          </tr>`;
            })
            .join('')
        : '<tr><td colspan="7" class="empty-cell">No essays submitted yet.</td></tr>';

    // ── Simulations HTML ────────────────────────────────────────────────────────
    const simulationsHTML =
      simulations.length > 0
        ? simulations
            .map((sim, i) => {
              const passed = sim.passed ? '✓ Passed' : '✗ Failed';
              const badgeClass = sim.passed ? 'badge-pass' : 'badge-fail';
              const mins = sim.totalTimeSeconds ? Math.floor(sim.totalTimeSeconds / 60) : 'N/A';
              return `
          <tr>
            <td>${i + 1}</td>
            <td>${sim.startedAt.toLocaleDateString('en-IE')}</td>
            <td>${sim.subject ?? 'Mixed'} ${sim.year ? `(${sim.year})` : ''}</td>
            <td>${sim.overallScore ?? 'N/A'}%</td>
            <td><span class="badge ${badgeClass}">${passed}</span></td>
            <td>${mins} min</td>
            <td>${sim.attempts.length} / 5</td>
          </tr>`;
            })
            .join('')
        : '<tr><td colspan="7" class="empty-cell">No simulations completed yet.</td></tr>';

    // ── Achievements HTML ───────────────────────────────────────────────────────
    const achievementsHTML =
      achievements.length > 0
        ? achievements
            .map(
              (ua) => `
        <div class="achievement-card">
          <div class="achievement-icon">${ua.achievement.icon || '🏆'}</div>
          <div class="achievement-info">
            <div class="achievement-title">${ua.achievement.title}</div>
            <div class="achievement-desc">${ua.achievement.description}</div>
            <div class="achievement-date">Unlocked ${ua.unlockedAt.toLocaleDateString('en-IE')}</div>
          </div>
        </div>`
            )
            .join('')
        : '<p class="empty">No achievements unlocked yet.</p>';

    // ── Saved cases HTML ────────────────────────────────────────────────────────
    const casesHTML =
      savedCases.length > 0
        ? savedCases
            .map(
              (sc) => `
        <tr>
          <td>${sc.caseBrief.caseName}</td>
          <td>${sc.caseBrief.citation}</td>
          <td>${sc.caseBrief.year}</td>
          <td>${sc.caseBrief.court}</td>
          <td>${sc.caseBrief.jurisdiction}</td>
          <td>${sc.createdAt.toLocaleDateString('en-IE')}</td>
        </tr>`
            )
            .join('')
        : '<tr><td colspan="6" class="empty-cell">No cases saved yet.</td></tr>';

    const generatedDate = new Date().toLocaleDateString('en-IE', { dateStyle: 'full' });
    const logoUrl =
      'https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png';

    // ── Full HTML ───────────────────────────────────────────────────────────────
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; background: #fff; font-size: 13px; }

  /* ── Header ── */
  .header {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    color: white;
    padding: 36px 48px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-left { display: flex; align-items: center; gap: 18px; }
  .header img { width: 80px; }
  .header-title { font-size: 22px; font-weight: 700; }
  .header-sub { font-size: 13px; opacity: 0.85; margin-top: 4px; }
  .header-right { text-align: right; font-size: 11px; opacity: 0.8; }

  /* ── Page body ── */
  .body { padding: 36px 48px; }

  /* ── Section ── */
  .section { margin-bottom: 40px; }
  .section-title {
    font-size: 15px;
    font-weight: 700;
    color: #1d4ed8;
    border-bottom: 2px solid #dbeafe;
    padding-bottom: 6px;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ── Stat cards ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 8px;
  }
  .stat-card {
    background: #f8faff;
    border: 1px solid #dbeafe;
    border-radius: 8px;
    padding: 14px 12px;
    text-align: center;
  }
  .stat-value { font-size: 22px; font-weight: 700; color: #1d4ed8; }
  .stat-label { font-size: 10px; color: #64748b; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.4px; }

  /* ── Info grid ── */
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 32px; }
  .info-row { display: flex; gap: 8px; padding: 5px 0; border-bottom: 1px solid #f1f5f9; }
  .info-label { font-weight: 600; color: #475569; min-width: 160px; font-size: 12px; }
  .info-value { color: #1e293b; font-size: 12px; }

  /* ── Progress bars ── */
  .subject-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .subject-label { display: flex; justify-content: space-between; min-width: 200px; }
  .subject-name { font-weight: 600; font-size: 12px; }
  .subject-meta { font-size: 11px; color: #94a3b8; }
  .progress-track { flex: 1; height: 8px; background: #e2e8f0; border-radius: 99px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 99px; }
  .subject-pct { font-weight: 700; font-size: 12px; min-width: 36px; text-align: right; color: #334155; }

  /* ── Tables ── */
  table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
  th {
    background: #6483da;
    color: white;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  td { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; color: #334155; }
  tr:nth-child(even) td { background: #f8faff; }
  .empty-cell { text-align: center; color: #94a3b8; padding: 20px; }

  /* ── Badges ── */
  .badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 99px;
    font-size: 10.5px;
    font-weight: 600;
  }
  .badge-pass { background: #dcfce7; color: #16a34a; }
  .badge-fail { background: #fee2e2; color: #dc2626; }

  /* ── Achievements ── */
  .achievements-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .achievement-card {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: #fafafa;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;
  }
  .achievement-icon { font-size: 22px; }
  .achievement-title { font-weight: 700; font-size: 12px; color: #1e293b; }
  .achievement-desc { font-size: 11px; color: #64748b; margin-top: 2px; }
  .achievement-date { font-size: 10px; color: #94a3b8; margin-top: 4px; }

  /* ── Footer ── */
  .footer {
    margin-top: 48px;
    padding: 16px 48px;
    background: #f8faff;
    border-top: 1px solid #dbeafe;
    text-align: center;
    font-size: 10px;
    color: #94a3b8;
  }

  .empty { color: #94a3b8; font-style: italic; font-size: 12px; }

  /* ── Page break ── */
  .page-break { page-break-before: always; }
</style>
</head>
<body>

<!-- ── HEADER ─────────────────────────────────────────────────────────── -->
<div class="header">
  <div class="header-left">
    <img src="${logoUrl}" alt="FE-1 Made Simple" />
    <div>
      <div class="header-title">Student Progress Report</div>
      <div class="header-sub">FE-1 Made Simple — Law Society of Ireland Exam Prep</div>
    </div>
  </div>
  <div class="header-right">
    Generated on<br/><strong>${generatedDate}</strong>
  </div>
</div>

<div class="body">

<!-- ── KEY STATS ──────────────────────────────────────────────────────── -->
<div class="section">
  <div class="section-title">Overview</div>
  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-value">${totalStudyHours.toFixed(1)}</div>
      <div class="stat-label">Study Hours</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${currentStreak}</div>
      <div class="stat-label">Day Streak</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${totalQuizAccuracy.toFixed(0)}%</div>
      <div class="stat-label">Quiz Accuracy</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${averageEssayScore.toFixed(0)}%</div>
      <div class="stat-label">Avg Essay Score</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${completedLessons}</div>
      <div class="stat-label">Lessons Done</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${completedQuizSessions}</div>
      <div class="stat-label">Quiz Sessions</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${passedSimulations}/${simulations.length}</div>
      <div class="stat-label">Sims Passed</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${achievements.length}</div>
      <div class="stat-label">Achievements</div>
    </div>
  </div>
</div>

<!-- ── PERSONAL INFO ───────────────────────────────────────────────────── -->
<div class="section">
  <div class="section-title">Personal Information</div>
  <div class="info-grid">
    <div class="info-row"><span class="info-label">Full Name</span><span class="info-value">${user.fullName || 'Not provided'}</span></div>
    <div class="info-row"><span class="info-label">Email</span><span class="info-value">${user.email}</span></div>
    <div class="info-row"><span class="info-label">Plan</span><span class="info-value">${user.subscription?.planType || 'Free'}</span></div>
    <div class="info-row"><span class="info-label">Subscription Status</span><span class="info-value">${user.subscription?.status || 'No active subscription'}</span></div>
    <div class="info-row"><span class="info-label">Target Exam Date</span><span class="info-value">${user.targetExamDate?.toLocaleDateString('en-IE') || 'Not set'}</span></div>
    <div class="info-row"><span class="info-label">Daily Study Goal</span><span class="info-value">${user.dailyStudyGoal} hours</span></div>
    <div class="info-row"><span class="info-label">Focus Subjects</span><span class="info-value">${user.focusSubjects.length > 0 ? user.focusSubjects.join(', ') : 'None selected'}</span></div>
    <div class="info-row"><span class="info-label">Podcasts Completed</span><span class="info-value">${podcastProgress.filter((p) => p.isCompleted).length}</span></div>
  </div>
</div>

<!-- ── SUBJECT PROGRESS ────────────────────────────────────────────────── -->
<div class="section">
  <div class="section-title">Subject Progress</div>
  ${subjectBarsHTML}
</div>

<!-- ── ESSAY PRACTICE ─────────────────────────────────────────────────── -->
<div class="section page-break">
  <div class="section-title">Recent Essay Practice (Last 10)</div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Subject</th>
        <th>Type</th>
        <th>Score</th>
        <th>Date</th>
        <th>Time</th>
        <th>Words</th>
      </tr>
    </thead>
    <tbody>${essaysHTML}</tbody>
  </table>
</div>

<!-- ── SIMULATIONS ────────────────────────────────────────────────────── -->
<div class="section">
  <div class="section-title">Simulation Results</div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Subject</th>
        <th>Score</th>
        <th>Status</th>
        <th>Time</th>
        <th>Questions</th>
      </tr>
    </thead>
    <tbody>${simulationsHTML}</tbody>
  </table>
</div>

<!-- ── ACHIEVEMENTS ───────────────────────────────────────────────────── -->
<div class="section page-break">
  <div class="section-title">Achievements Unlocked (${achievements.length})</div>
  <div class="achievements-grid">${achievementsHTML}</div>
</div>

<!-- ── SAVED CASES ────────────────────────────────────────────────────── -->
<div class="section">
  <div class="section-title">Saved Case Law (${savedCases.length})</div>
  <table>
    <thead>
      <tr>
        <th>Case Name</th>
        <th>Citation</th>
        <th>Year</th>
        <th>Court</th>
        <th>Jurisdiction</th>
        <th>Saved</th>
      </tr>
    </thead>
    <tbody>${casesHTML}</tbody>
  </table>
</div>

</div><!-- end body -->

<!-- ── FOOTER ─────────────────────────────────────────────────────────── -->
<div class="footer">
  This report contains personal study data from FE-1 Made Simple. Keep it confidential. &nbsp;|&nbsp; fe1madesimple.com
</div>

</body>
</html>`;

    // ── Render HTML → PDF via puppeteer ────────────────────────────────────────
    const puppeteer = require('puppeteer');

    
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      headless: true,
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
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
