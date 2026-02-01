/*
  Warnings:

  - You are about to drop the column `estimatedDuration` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `totalLessons` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `questionText` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `sampleAnswer` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `topics` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `subjects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moduleId,slug]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectId,slug]` on the table `modules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `lesson_assets` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `lesson_assets` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_subjectId_fkey";

-- DropIndex
DROP INDEX "lesson_assets_lessonId_idx";

-- DropIndex
DROP INDEX "lesson_assets_type_idx";

-- DropIndex
DROP INDEX "lessons_isPublished_idx";

-- DropIndex
DROP INDEX "lessons_moduleId_idx";

-- DropIndex
DROP INDEX "lessons_moduleId_isPublished_idx";

-- DropIndex
DROP INDEX "lessons_order_idx";

-- DropIndex
DROP INDEX "modules_isPublished_idx";

-- DropIndex
DROP INDEX "modules_order_idx";

-- DropIndex
DROP INDEX "modules_subjectId_idx";

-- DropIndex
DROP INDEX "modules_subjectId_isPublished_idx";

-- DropIndex
DROP INDEX "questions_difficulty_idx";

-- DropIndex
DROP INDEX "questions_isPublished_idx";

-- DropIndex
DROP INDEX "questions_moduleId_idx";

-- DropIndex
DROP INDEX "questions_subjectId_idx";

-- DropIndex
DROP INDEX "questions_subjectId_type_isPublished_idx";

-- DropIndex
DROP INDEX "questions_type_idx";

-- DropIndex
DROP INDEX "questions_year_idx";

-- DropIndex
DROP INDEX "questions_year_subjectId_idx";

-- DropIndex
DROP INDEX "subjects_isPublished_idx";

-- DropIndex
DROP INDEX "subjects_order_idx";

-- AlterTable
ALTER TABLE "lesson_assets" ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "order" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "estimatedDuration",
DROP COLUMN "version",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "videoDuration" INTEGER,
ADD COLUMN     "videoPublicId" TEXT,
ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "isPublished" SET DEFAULT true;

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "title",
DROP COLUMN "totalLessons",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "isPublished" SET DEFAULT true;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "difficulty",
DROP COLUMN "questionText",
DROP COLUMN "sampleAnswer",
DROP COLUMN "subjectId",
DROP COLUMN "topics",
ADD COLUMN     "examType" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "subject" TEXT,
ADD COLUMN     "text" TEXT NOT NULL,
ALTER COLUMN "isPublished" SET DEFAULT true;

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "color",
DROP COLUMN "title",
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "isPublished" SET DEFAULT true;

-- CreateTable
CREATE TABLE "user_podcast_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "podcastId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "listenedSeconds" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_podcast_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "podcasts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "subject" TEXT,
    "audioUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "podcasts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT,
    "moduleId" TEXT,
    "lessonId" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "durationSeconds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "study_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_lesson_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "videoWatchedSeconds" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_lesson_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_module_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "progressPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "completedLessons" INTEGER NOT NULL DEFAULT 0,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "lastAccessedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_module_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_subject_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "progressPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "totalTimeSeconds" INTEGER NOT NULL DEFAULT 0,
    "lastAccessedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_subject_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isCorrect" BOOLEAN,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "aiScore" DOUBLE PRECISION,
    "knowledgeScore" DOUBLE PRECISION,
    "authoritiesScore" DOUBLE PRECISION,
    "applicationScore" DOUBLE PRECISION,
    "analysisScore" DOUBLE PRECISION,
    "structureScore" DOUBLE PRECISION,
    "band" TEXT,
    "appPass" BOOLEAN,
    "aiFeedback" TEXT,
    "strengths" JSONB,
    "improvements" JSONB,
    "nextSteps" TEXT,
    "timeTakenSeconds" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_podcast_progress_userId_podcastId_key" ON "user_podcast_progress"("userId", "podcastId");

-- CreateIndex
CREATE UNIQUE INDEX "user_lesson_progress_userId_lessonId_key" ON "user_lesson_progress"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "user_module_progress_userId_moduleId_key" ON "user_module_progress"("userId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_subject_progress_userId_subjectId_key" ON "user_subject_progress"("userId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_moduleId_slug_key" ON "lessons"("moduleId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "modules_subjectId_slug_key" ON "modules"("subjectId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_slug_key" ON "subjects"("slug");

-- AddForeignKey
ALTER TABLE "user_podcast_progress" ADD CONSTRAINT "user_podcast_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_podcast_progress" ADD CONSTRAINT "user_podcast_progress_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "podcasts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_sessions" ADD CONSTRAINT "study_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_module_progress" ADD CONSTRAINT "user_module_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_module_progress" ADD CONSTRAINT "user_module_progress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subject_progress" ADD CONSTRAINT "user_subject_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subject_progress" ADD CONSTRAINT "user_subject_progress_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_attempts" ADD CONSTRAINT "question_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_attempts" ADD CONSTRAINT "question_attempts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
