// src/jobs/streak-alert.cron.ts
import cron from 'node-cron';
import emailService from '@/shared/services/email.service';
import { prisma } from '@/shared/config';

// Run every day at 8 PM
cron.schedule('0 20 * * *', async () => {
  const today = new Date().toISOString().split('T')[0];

  const users = await prisma.user.findMany({
    where: { studyStreakAlerts: true },
    select: { id: true, email: true, fullName: true },
  });

  for (const user of users) {
    const studiedToday = await prisma.dailyStudySession.findUnique({
      where: { userId_date: { userId: user.id, date: today } },
    });

    if (!studiedToday || studiedToday.todayTotalSeconds === 0) {
      await emailService.sendStreakAlertEmail(user.email, user.fullName || 'Student');
    }
  }
});
