-- AlterEnum
ALTER TYPE "SubscriptionStatus" ADD VALUE 'FREEMIUM';

-- CreateTable
CREATE TABLE "share_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "share_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "share_tokens_token_key" ON "share_tokens"("token");

-- CreateIndex
CREATE INDEX "share_tokens_token_idx" ON "share_tokens"("token");
