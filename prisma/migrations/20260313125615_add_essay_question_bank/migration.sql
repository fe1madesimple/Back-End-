-- AlterTable
ALTER TABLE "essay_attempts" ADD COLUMN     "essayQuestionId" TEXT;

-- CreateTable
CREATE TABLE "essay_questions" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "essay_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "essay_questions_moduleId_idx" ON "essay_questions"("moduleId");

-- CreateIndex
CREATE INDEX "essay_questions_lessonId_idx" ON "essay_questions"("lessonId");

-- CreateIndex
CREATE INDEX "essay_questions_subject_idx" ON "essay_questions"("subject");

-- CreateIndex
CREATE INDEX "essay_attempts_essayQuestionId_idx" ON "essay_attempts"("essayQuestionId");

-- AddForeignKey
ALTER TABLE "essay_attempts" ADD CONSTRAINT "essay_attempts_essayQuestionId_fkey" FOREIGN KEY ("essayQuestionId") REFERENCES "essay_questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_questions" ADD CONSTRAINT "essay_questions_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_questions" ADD CONSTRAINT "essay_questions_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
