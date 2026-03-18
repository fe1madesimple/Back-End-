// src/jobs/ai-progress-trend.cron.ts

import cron from 'node-cron';
import emailService from '@/shared/services/email.service';
import progressService from '@/modules/progress/services/progress.service';
import { prisma } from '@/shared/config';

cron.schedule('0 9 * * 1', async () => {
  console.log('📊 Running AI progress trend job...');

  const users = await prisma.user.findMany({
    where: { showRelevantEpisodes: true }, // Using this toggle for AI trends
    select: { id: true, email: true, fullName: true },
  });

  for (const user of users) {
    try {
      const trendData = await progressService['getAIProgressTrend'](user.id);

      if (!trendData.hasActivity) {
        // No essays last week - skip
        continue;
      }

      if (trendData.improvement === 0 && trendData.previousWeekAverage > 0) {
        // Same performance as last week - send motivational email
        await emailService.sendMotivationalEmail(user.email, user.fullName || 'Student', trendData);
      } else {
        // Send progress report
        await emailService.sendAIProgressTrendEmail(
          user.email,
          user.fullName || 'Student',
          trendData
        );
      }
    } catch (err) {
      console.error(`Failed to send AI trend email to ${user.email}:`, err);
    }
  }

  console.log(`✅ AI progress trends sent to ${users.length} users`);
});

export {};