-- CreateTable
CREATE TABLE "deleted_user_analytics" (
    "id" TEXT NOT NULL,
    "originalUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "accountCreatedAt" TIMESTAMP(3) NOT NULL,
    "accountDeletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "daysActive" INTEGER NOT NULL,
    "subjectsStarted" INTEGER NOT NULL DEFAULT 0,
    "subjectsCompleted" INTEGER NOT NULL DEFAULT 0,
    "subjectsNeverOpened" INTEGER NOT NULL DEFAULT 0,
    "subjectProgress" JSONB,
    "modulesCompleted" INTEGER NOT NULL DEFAULT 0,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalStudyTimeSeconds" INTEGER NOT NULL DEFAULT 0,
    "totalQuizzesTaken" INTEGER NOT NULL DEFAULT 0,
    "totalMCQsAttempted" INTEGER NOT NULL DEFAULT 0,
    "averageQuizScore" INTEGER NOT NULL DEFAULT 0,
    "highestQuizScore" INTEGER NOT NULL DEFAULT 0,
    "lowestQuizScore" INTEGER NOT NULL DEFAULT 0,
    "quizScores" JSONB,
    "hadSubscription" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionPlan" TEXT,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deletionReason" TEXT,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deleted_user_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "deleted_user_analytics_accountDeletedAt_idx" ON "deleted_user_analytics"("accountDeletedAt");

-- CreateIndex
CREATE INDEX "deleted_user_analytics_email_idx" ON "deleted_user_analytics"("email");
