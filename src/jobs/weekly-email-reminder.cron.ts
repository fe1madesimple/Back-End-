// src/jobs/weekly-email-reminder.cron.ts
import cron from 'node-cron';
import emailService from '@/modules/email/services/email.service';
import { prisma } from '@/shared/config';

// Run every Monday at 9 AM
cron.schedule('0 9 * * 1', async () => {
  const users = await prisma.user.findMany({
    where: { emailReminders: true },
    select: { id: true, email: true, fullName: true },
  });

  for (const user of users) {
    // Get user's weekly stats
    const stats = await getWeeklyStats(user.id);
    await emailService.sendWeeklyProgressEmail(user.email, user.fullName || 'Student', stats);
  }
});
