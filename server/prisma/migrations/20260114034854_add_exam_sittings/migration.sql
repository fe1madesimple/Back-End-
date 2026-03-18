-- CreateTable
CREATE TABLE "exam_sittings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "registrationDeadline" TIMESTAMP(3),
    "resultsDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_sittings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "exam_sittings_examDate_idx" ON "exam_sittings"("examDate");

-- CreateIndex
CREATE INDEX "exam_sittings_isActive_idx" ON "exam_sittings"("isActive");
