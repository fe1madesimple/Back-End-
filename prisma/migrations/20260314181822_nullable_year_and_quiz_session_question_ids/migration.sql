-- AlterTable
ALTER TABLE "practice_sessions" ALTER COLUMN "year" DROP NOT NULL;

-- AlterTable
ALTER TABLE "quiz_sessions" ADD COLUMN     "questionIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
