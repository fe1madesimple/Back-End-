import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';

type RequiredPlan = 'FREE' | 'STANDARD' | 'PRO';

interface GateOptions {
  aiLimit?: boolean; // true = check monthly AI session count
}

const AI_LIMITS = {
  STANDARD: 15,
  PRO: 40,
  TRIAL: Infinity,
  FREE: 0,
};

// ── gate() ────────────────────────────────────────────────────────────────────
// General purpose plan gate.
//
// Usage:
//   gate('STANDARD')                    → blocks Free/Freemium users
//   gate('PRO')                         → blocks Free/Freemium/Standard users
//   gate('STANDARD', { aiLimit: true }) → Standard users get 15/mo, Pro get 40/mo
//
// Plan resolution:
//   TRIAL                              → full access (same as PRO), no AI limit
//   ACTIVE + PRO_MONTHLY/PRO_ANNUAL    → PRO
//   ACTIVE + STANDARD_MONTHLY/ANNUAL   → STANDARD
//   FREEMIUM / EXPIRED / CANCELLED
//   / SUSPENDED / no subscription      → FREE

export function gate(requiredPlan: RequiredPlan, options: GateOptions = {}) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.user.id;

      const subscription = await prisma.subscription.findUnique({
        where: { userId },
        select: { status: true, planType: true },
      });

     
      if (!subscription) {
        if (requiredPlan === 'FREE') return next();
        throw new AppError('Upgrade your plan to access this feature', 403);
      }

      const { status, planType } = subscription;

      
      let effectiveTier: 'FREE' | 'STANDARD' | 'PRO' | 'TRIAL';

      if (status === 'TRIAL') {
        effectiveTier = 'TRIAL';
      } else if (status === 'ACTIVE') {
        if (planType === 'PRO_MONTHLY' || planType === 'PRO_ANNUAL') {
          effectiveTier = 'PRO';
        } else if (planType === 'STANDARD_MONTHLY' || planType === 'STANDARD_ANNUAL') {
          effectiveTier = 'STANDARD';
        } else {
          effectiveTier = 'FREE';
        }
      } else {
        
        effectiveTier = 'FREE';
      }

      
      const tierRank: Record<string, number> = { FREE: 0, STANDARD: 1, PRO: 2, TRIAL: 3 };
      const requiredRank: Record<string, number> = { FREE: 0, STANDARD: 1, PRO: 2 };

      if (tierRank[effectiveTier]! < requiredRank[requiredPlan]!) {
        const message =
          requiredPlan === 'PRO'
            ? 'This feature requires a Pro plan. Upgrade to unlock it.'
            : 'This feature requires a Standard plan or above. Upgrade to unlock it.';
        throw new AppError(message, 403);
      }

      // ── AI session limit ───────────────────────────────────────────────────
      if (options.aiLimit && effectiveTier !== 'TRIAL') {
        const limit =
          effectiveTier === 'PRO'
            ? AI_LIMITS.PRO
            : effectiveTier === 'STANDARD'
              ? AI_LIMITS.STANDARD
              : AI_LIMITS.FREE;

        if (limit === 0) {
          throw new AppError('AI feedback requires a Standard plan or above.', 403);
        }

        // Count graded essay attempts this calendar month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const usedThisMonth = await prisma.essayAttempt.count({
          where: {
            userId,
            createdAt: { gte: startOfMonth },
            aiScore: { not: null },
          },
        });

        if (usedThisMonth >= limit) {
          throw new AppError(
            `You have used all ${limit} AI feedback sessions for this month. ` +
              `Your limit resets on the 1st of next month.`,
            403
          );
        }
      }

      
      (req as any).userPlan = { effectiveTier, planType, status };

      next();
    } catch (error) {
      next(error);
    }
  };
}

export function gateLesson() {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.user.id;
      const lessonId = req.params.id;

      const subscription = await prisma.subscription.findUnique({
        where: { userId },
        select: { status: true, planType: true },
      });

      const status = subscription?.status;
      const planType = subscription?.planType;

      // TRIAL or any ACTIVE paid plan → full access
      const isPaid = status === 'TRIAL' || (status === 'ACTIVE' && planType !== null);

      if (isPaid) return next();

      // FREE / FREEMIUM / EXPIRED / CANCELLED — check module order
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        select: { module: { select: { order: true } } },
      });

      if (!lesson) return next(); // let service handle 404

      if (lesson.module.order > 1) {
        throw new AppError(
          'This lesson is only available on Standard and Pro plans. Upgrade to unlock all modules.',
          403
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}