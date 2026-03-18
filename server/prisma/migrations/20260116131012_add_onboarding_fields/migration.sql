-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hasCompletedOnboarding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingCompletedAt" TIMESTAMP(3),
ADD COLUMN     "onboardingSkipped" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "users_hasCompletedOnboarding_idx" ON "users"("hasCompletedOnboarding");
