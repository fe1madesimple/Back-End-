-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "sitting" TEXT;

-- CreateIndex
CREATE INDEX "questions_sitting_idx" ON "questions"("sitting");
