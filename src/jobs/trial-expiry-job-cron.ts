import cronTrialExpiry from 'node-cron';
import { prisma as prismaJob } from '@/shared/config';
import emailService from '@/shared/services/email.service';


type ExpiredTrial = {
  id: string;
  userId: string;
  user: { email: string; fullName: string | null };
};

cronTrialExpiry.schedule('*/5 * * * *', async () => {
  console.log('⏰ Running trial expiry check...');

  const now = new Date();
  const BATCH_SIZE = 100;
  let processed = 0;
  let cursor: string | undefined = undefined;

  while (true) {
    // Fetch 100 at a time
    const expiredTrials: ExpiredTrial[] = await prismaJob.subscription.findMany({
      where: {
        status: 'TRIAL',
        trialEndsAt: { lte: now },
      },
      include: {
        user: { select: { email: true, fullName: true } },
      },
      take: BATCH_SIZE,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { id: 'asc' },
    });

    if (expiredTrials.length === 0) break;

    // Downgrade this batch
    await prismaJob.subscription.updateMany({
      where: { id: { in: expiredTrials.map((s) => s.id) } },
      data: { status: 'FREEMIUM' },
    });

    // Send emails — catch per user so one failure doesn't stop the rest
    for (const trial of expiredTrials) {
      try {
        await emailService.sendTrialExpiredEmail(trial.user.email, trial.user.fullName);
      } catch (err) {
        console.error(`❌ Failed email for ${trial.user.email}:`, err);
        // Continues to next user regardless
      }
    }

    processed += expiredTrials.length;
    cursor = expiredTrials[expiredTrials.length - 1]!.id;

    console.log(`   Processed ${processed} so far...`);

    // If we got less than batch size we've reached the end
    if (expiredTrials.length < BATCH_SIZE) break;
  }

  console.log(`✅ Trial expiry complete — ${processed} subscription(s) downgraded`);
});

export {};
