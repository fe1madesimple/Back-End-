/*
  Warnings:

  - You are about to drop the column `isActive` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `lastPingAt` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `lessonsCompleted` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `pointsEarned` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `questionsAttempted` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `sessionType` on the `study_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `study_sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "study_sessions" DROP CONSTRAINT "study_sessions_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "study_sessions" DROP CONSTRAINT "study_sessions_subjectId_fkey";

-- AlterTable
ALTER TABLE "study_sessions" DROP COLUMN "isActive",
DROP COLUMN "lastPingAt",
DROP COLUMN "lessonId",
DROP COLUMN "lessonsCompleted",
DROP COLUMN "moduleId",
DROP COLUMN "notes",
DROP COLUMN "pointsEarned",
DROP COLUMN "questionsAttempted",
DROP COLUMN "sessionType",
DROP COLUMN "subjectId";

-- CreateIndex
CREATE INDEX "study_sessions_userId_idx" ON "study_sessions"("userId");

-- CreateIndex
CREATE INDEX "study_sessions_endedAt_idx" ON "study_sessions"("endedAt");

-- CreateIndex
CREATE INDEX "study_sessions_createdAt_idx" ON "study_sessions"("createdAt");
