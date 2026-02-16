// src/jobs/weekly-email-reminder.cron.ts
import cron from 'node-cron';
import emailService from '@/shared/services/email.service';
import progressService from '@/modules/progress/services/progress.service';
import { prisma } from '@/shared/config';

// Run every Monday at 9 AM
cron.schedule('0 9 * * 1', async () => {
  console.log('📧 Running weekly email reminder job...');

  const users = await prisma.user.findMany({
    where: { emailReminders: true },
    select: { id: true, email: true, fullName: true },
  });

  for (const user of users) {
    try {
        const stats = await progressService['getWeeklyStats'](user.id); // Private method
        
        await emailService.sendWeeklyProgressEmail(user.email, user.fullName || 'Student', stats);
        
    } catch (err) {
      console.error(`Failed to send weekly email to ${user.email}:`, err);
    }
  }

  console.log(`✅ Weekly emails sent to ${users.length} users`);
});

export {}; 