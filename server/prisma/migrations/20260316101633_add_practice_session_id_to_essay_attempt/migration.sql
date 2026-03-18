-- AlterTable
ALTER TABLE "essay_attempts" ADD COLUMN     "practiceSessionId" TEXT;

-- AddForeignKey
ALTER TABLE "essay_attempts" ADD CONSTRAINT "essay_attempts_practiceSessionId_fkey" FOREIGN KEY ("practiceSessionId") REFERENCES "practice_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
