/*
  Warnings:

  - You are about to drop the column `isSimulation` on the `essay_attempts` table. All the data in the column will be lost.
  - You are about to drop the `question_sets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `question_timers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "essay_attempts" DROP CONSTRAINT "essay_attempts_questionId_fkey";

-- DropForeignKey
ALTER TABLE "essay_attempts" DROP CONSTRAINT "essay_attempts_simulationId_fkey";

-- DropForeignKey
ALTER TABLE "question_sets" DROP CONSTRAINT "question_sets_parentQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "question_timers" DROP CONSTRAINT "question_timers_userId_fkey";

-- DropIndex
DROP INDEX "essay_attempts_userId_questionId_idx";

-- DropIndex
DROP INDEX "questions_moduleId_idx";

-- AlterTable
ALTER TABLE "essay_attempts" DROP COLUMN "isSimulation",
ADD COLUMN     "appPass" BOOLEAN,
ADD COLUMN     "sampleAnswer" TEXT;

-- AlterTable
ALTER TABLE "modules" ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "lessonId" TEXT;

-- AlterTable
ALTER TABLE "simulations" ADD COLUMN     "failReason" TEXT,
ADD COLUMN     "subject" TEXT,
ADD COLUMN     "year" INTEGER;

-- DropTable
DROP TABLE "question_sets";

-- DropTable
DROP TABLE "question_timers";

-- CreateTable
CREATE TABLE "practice_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "questionIds" TEXT[],
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "totalTimeSeconds" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practice_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "practice_sessions_userId_idx" ON "practice_sessions"("userId");

-- CreateIndex
CREATE INDEX "practice_sessions_userId_createdAt_idx" ON "practice_sessions"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "essay_attempts_userId_createdAt_idx" ON "essay_attempts"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "questions_lessonId_idx" ON "questions"("lessonId");

-- AddForeignKey
ALTER TABLE "essay_attempts" ADD CONSTRAINT "essay_attempts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_attempts" ADD CONSTRAINT "essay_attempts_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "simulations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_sessions" ADD CONSTRAINT "practice_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
