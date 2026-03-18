-- CreateTable
CREATE TABLE "question_timers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "question_timers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "question_timers_userId_questionId_idx" ON "question_timers"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "question_timers" ADD CONSTRAINT "question_timers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
