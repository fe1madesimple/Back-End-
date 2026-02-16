// src/jobs/podcast-recommendations.cron.ts
import cron from 'node-cron';
import emailService from '@/shared/services/email.service';
import { prisma } from '@/shared/config';

// Run every Sunday at 10 AM

async function getRelevantPodcasts(focusSubjects: string[]) {
  if (focusSubjects.length === 0) {
    return await prisma.podcast.findMany({
      where: { isPublished: true },
      select: { id: true, title: true, subject: true, duration: true, thumbnail: true },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
  }

  return await prisma.podcast.findMany({
    where: { isPublished: true, subject: { in: focusSubjects } },
    select: { id: true, title: true, subject: true, duration: true, thumbnail: true },
    take: 3,
  });
}

cron.schedule('0 10 * * 0', async () => {
  console.log('🎙️ Running podcast recommendations job...');

  const users = await prisma.user.findMany({
    where: { podcastRecommendations: true },
    select: { id: true, email: true, fullName: true, focusSubjects: true },
  });

  for (const user of users) {
    try {
      const recommendations = await getRelevantPodcasts(user.focusSubjects);
      await emailService.sendPodcastRecommendations(
        user.email,
        user.fullName || 'Student',
        recommendations
      );
    } catch (err) {
      console.error(`Failed to send podcast recommendations to ${user.email}:`, err);
    }
  }

  console.log(`✅ Podcast recommendations sent to ${users.length} users`);
});

export {};