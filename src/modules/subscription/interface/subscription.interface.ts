// Subscription status from Prisma
export enum SubscriptionStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  SUSPENDED = 'SUSPENDED',
}

export enum PlanType {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

// Request DTOs
export interface ICreateCheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

// Response DTOs
export interface ICheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface ISubscriptionResponse {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  planType: PlanType | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
  cancelledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
