// src/jobs/podcast-recommendations.cron.ts
import cron from 'node-cron';
import emailService from '@/shared/services/email.service';
import { prisma } from '@/shared/config';

// Run every Sunday at 10 AM
cron.schedule('0 10 * * 0', async () => {
  const users = await prisma.user.findMany({
    where: { podcastRecommendations: true },
    select: { id: true, email: true, fullName: true, focusSubjects: true },
  });

  for (const user of users) {
    const recommendations = await getRelevantPodcasts(user.focusSubjects);
    await emailService.sendPodcastRecommendations(
      user.email,
      user.fullName || 'Student',
      recommendations
    );
  }
});
