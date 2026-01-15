-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verificationFailedAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "verificationLockedUntil" TIMESTAMP(3);
