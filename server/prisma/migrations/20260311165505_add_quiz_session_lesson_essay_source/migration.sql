-- AlterTable
ALTER TABLE "essay_attempts" ADD COLUMN     "source" TEXT;

-- AlterTable
ALTER TABLE "quiz_sessions" ADD COLUMN     "lessonId" TEXT,
ADD COLUMN     "moduleId" TEXT;

-- AddForeignKey
ALTER TABLE "quiz_sessions" ADD CONSTRAINT "quiz_sessions_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_sessions" ADD CONSTRAINT "quiz_sessions_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
