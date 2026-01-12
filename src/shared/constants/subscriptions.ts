/**
 * Subscription Status
 */
export enum SubscriptionStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  SUSPENDED = 'SUSPENDED',
}

/**
 * Subscription Plan Type
 */
export enum PlanType {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

/**
 * Trial Duration (days)
 */
export const TRIAL_DURATION_DAYS = 7;

/**
 * Plan Features
 */
export const PLAN_FEATURES = {
  TRIAL: {
    aiEvaluationsPerDay: 3,
    accessToContent: true,
    accessToCaseLaw: false,
    accessToQuizzes: true,
    durationDays: TRIAL_DURATION_DAYS,
  },
  MONTHLY: {
    aiEvaluationsPerDay: 10,
    accessToContent: true,
    accessToCaseLaw: true,
    accessToQuizzes: true,
    durationDays: 30,
  },
  ANNUAL: {
    aiEvaluationsPerDay: 15,
    accessToContent: true,
    accessToCaseLaw: true,
    accessToQuizzes: true,
    durationDays: 365,
  },
};
