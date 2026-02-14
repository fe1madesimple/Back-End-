-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "question_sets" (
    "id" TEXT NOT NULL,
    "parentQuestionId" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "subject" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "examType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 20,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "totalTimeSeconds" INTEGER,
    "overallScore" INTEGER,
    "passed" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "essay_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerText" TEXT NOT NULL,
    "timeTakenSeconds" INTEGER NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "aiScore" INTEGER,
    "band" TEXT,
    "feedback" JSONB,
    "strengths" TEXT[],
    "improvements" TEXT[],
    "provider" TEXT,
    "model" TEXT,
    "tokensUsed" INTEGER,
    "isSimulation" BOOLEAN NOT NULL DEFAULT false,
    "simulationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "essay_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "question_sets_parentQuestionId_idx" ON "question_sets"("parentQuestionId");

-- CreateIndex
CREATE INDEX "question_sets_subject_idx" ON "question_sets"("subject");

-- CreateIndex
CREATE INDEX "question_sets_year_idx" ON "question_sets"("year");

-- CreateIndex
CREATE INDEX "simulations_userId_idx" ON "simulations"("userId");

-- CreateIndex
CREATE INDEX "simulations_userId_createdAt_idx" ON "simulations"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "essay_attempts_userId_idx" ON "essay_attempts"("userId");

-- CreateIndex
CREATE INDEX "essay_attempts_questionId_idx" ON "essay_attempts"("questionId");

-- CreateIndex
CREATE INDEX "essay_attempts_simulationId_idx" ON "essay_attempts"("simulationId");

-- CreateIndex
CREATE INDEX "essay_attempts_userId_questionId_idx" ON "essay_attempts"("userId", "questionId");

-- CreateIndex
CREATE INDEX "questions_moduleId_idx" ON "questions"("moduleId");

-- CreateIndex
CREATE INDEX "questions_type_idx" ON "questions"("type");

-- CreateIndex
CREATE INDEX "questions_subject_idx" ON "questions"("subject");

-- CreateIndex
CREATE INDEX "questions_year_idx" ON "questions"("year");

-- AddForeignKey
ALTER TABLE "question_sets" ADD CONSTRAINT "question_sets_parentQuestionId_fkey" FOREIGN KEY ("parentQuestionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulations" ADD CONSTRAINT "simulations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_attempts" ADD CONSTRAINT "essay_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_attempts" ADD CONSTRAINT "essay_attempts_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_attempts" ADD CONSTRAINT "essay_attempts_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "simulations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
