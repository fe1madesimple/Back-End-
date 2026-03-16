import cronTrialExpiry from 'node-cron';
import { prisma as prismaJob } from '@/shared/config';

cronTrialExpiry.schedule('0 0 * * *', async () => {
  console.log('⏰ Running trial expiry check...');

  const now = new Date();

  const expiredTrials = await prismaJob.subscription.findMany({
    where: {
      status: 'TRIAL',
      trialEndsAt: { lte: now },
    },
    select: { id: true, userId: true },
  });

  if (expiredTrials.length === 0) {
    console.log('✅ No expired trials found');
    return;
  }

  await prismaJob.subscription.updateMany({
    where: { id: { in: expiredTrials.map((s) => s.id) } },
    data: { status: 'FREEMIUM' },
  });

  console.log(`✅ Downgraded ${expiredTrials.length} expired trial(s) to FREEMIUM`);
});

export {};
