// src/jobs/trial-expiry.cron.ts

import cronTrialExpiry from 'node-cron';
import { prisma as prismaJob } from '@/shared/config';
import emailService from '@/shared/services/email.service';
import fs from 'fs';
import path from 'path';

type ExpiredTrial = {
  id: string;
  userId: string;
  user: { email: string; fullName: string | null };
};

const LOG_PATH = path.join('/var/www/fe1-backend/logs', 'trial-expiry-errors.log');

// Ensure log directory exists
if (!fs.existsSync(path.dirname(LOG_PATH))) {
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
}

cronTrialExpiry.schedule('0 0 * * *', async () => {
  console.log('⏰ Running trial expiry check...');

  const now = new Date();
  const BATCH_SIZE = 100;
  let processed = 0;
  let cursor: string | undefined = undefined;

  while (true) {
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

    // Downgrade this batch first — email failure won't affect DB update
    await prismaJob.subscription.updateMany({
      where: { id: { in: expiredTrials.map((s) => s.id) } },
      data: { status: 'FREEMIUM' },
    });

    // Send email to each user — isolated per user so one failure doesn't stop others
    for (const trial of expiredTrials) {
      try {
        await emailService.sendTrialExpiredEmail(trial.user.email, trial.user.fullName);
        console.log(`✅ Email sent: ${trial.user.email}`);
      } catch (err) {
        const message = `${new Date().toISOString()} | FAILED | ${trial.user.email} | ${err}\n`;
        console.error(`❌ Failed email for ${trial.user.email}:`, err);
        fs.appendFileSync(LOG_PATH, message);
      }
    }

    processed += expiredTrials.length;
    cursor = expiredTrials[expiredTrials.length - 1]!.id;

    console.log(`   Processed ${processed} so far...`);

    if (expiredTrials.length < BATCH_SIZE) break;
  }

  if (processed === 0) {
    console.log('✅ No expired trials found');
  } else {
    console.log(`✅ Trial expiry complete — ${processed} subscription(s) downgraded`);
  }
});

export {};
