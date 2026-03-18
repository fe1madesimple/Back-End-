/*
  Warnings:

  - You are about to drop the column `aiFeedback` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `aiScore` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `analysisScore` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `appPass` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `applicationScore` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `authoritiesScore` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `band` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `improvements` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `knowledgeScore` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `nextSteps` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `strengths` on the `question_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `structureScore` on the `question_attempts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "question_attempts" DROP CONSTRAINT "question_attempts_questionId_fkey";

-- DropForeignKey
ALTER TABLE "question_attempts" DROP CONSTRAINT "question_attempts_userId_fkey";

-- AlterTable
ALTER TABLE "question_attempts" DROP COLUMN "aiFeedback",
DROP COLUMN "aiScore",
DROP COLUMN "analysisScore",
DROP COLUMN "appPass",
DROP COLUMN "applicationScore",
DROP COLUMN "authoritiesScore",
DROP COLUMN "band",
DROP COLUMN "improvements",
DROP COLUMN "knowledgeScore",
DROP COLUMN "nextSteps",
DROP COLUMN "strengths",
DROP COLUMN "structureScore",
ADD COLUMN     "quizSessionId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "averageQuizScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "highestQuizScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lowestQuizScore" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "dailyStudyGoal" SET DEFAULT 3;

-- CreateTable
CREATE TABLE "quiz_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizType" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "questionsAnswered" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "totalTimeSeconds" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "quiz_sessions_userId_idx" ON "quiz_sessions"("userId");

-- CreateIndex
CREATE INDEX "quiz_sessions_isCompleted_idx" ON "quiz_sessions"("isCompleted");

-- CreateIndex
CREATE INDEX "question_attempts_userId_idx" ON "question_attempts"("userId");

-- CreateIndex
CREATE INDEX "question_attempts_quizSessionId_idx" ON "question_attempts"("quizSessionId");

-- AddForeignKey
ALTER TABLE "quiz_sessions" ADD CONSTRAINT "quiz_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_attempts" ADD CONSTRAINT "question_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_attempts" ADD CONSTRAINT "question_attempts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_attempts" ADD CONSTRAINT "question_attempts_quizSessionId_fkey" FOREIGN KEY ("quizSessionId") REFERENCES "quiz_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
