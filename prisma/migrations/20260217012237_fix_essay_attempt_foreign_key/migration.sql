-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AchievementType" ADD VALUE 'PRACTICE_MILESTONE';
ALTER TYPE "AchievementType" ADD VALUE 'TIME_ACHIEVEMENT';
ALTER TYPE "AchievementType" ADD VALUE 'IMPROVEMENT_ACHIEVEMENT';
ALTER TYPE "AchievementType" ADD VALUE 'VIDEO_ENGAGEMENT';
ALTER TYPE "AchievementType" ADD VALUE 'CASE_LAW_MASTERY';
ALTER TYPE "AchievementType" ADD VALUE 'COMBO_ACHIEVEMENT';

-- DropForeignKey
ALTER TABLE "essay_attempts" DROP CONSTRAINT "essay_attempts_questionId_fkey";

-- AddForeignKey
ALTER TABLE "essay_attempts" ADD CONSTRAINT "essay_attempts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
