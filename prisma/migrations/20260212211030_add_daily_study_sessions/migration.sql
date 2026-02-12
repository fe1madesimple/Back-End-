/*
  Warnings:

  - You are about to drop the `study_sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "study_sessions" DROP CONSTRAINT "study_sessions_userId_fkey";

-- DropTable
DROP TABLE "study_sessions";

-- CreateTable
CREATE TABLE "daily_study_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "currentSessionStart" TIMESTAMP(3),
    "todayTotalSeconds" INTEGER NOT NULL DEFAULT 0,
    "lifetimeTotalSeconds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_study_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "daily_study_sessions_userId_idx" ON "daily_study_sessions"("userId");

-- CreateIndex
CREATE INDEX "daily_study_sessions_date_idx" ON "daily_study_sessions"("date");

-- CreateIndex
CREATE UNIQUE INDEX "daily_study_sessions_userId_date_key" ON "daily_study_sessions"("userId", "date");

-- AddForeignKey
ALTER TABLE "daily_study_sessions" ADD CONSTRAINT "daily_study_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
