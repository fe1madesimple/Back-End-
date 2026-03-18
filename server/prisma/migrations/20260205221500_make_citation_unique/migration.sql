/*
  Warnings:

  - A unique constraint covering the columns `[citation]` on the table `case_briefs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "case_briefs_citation_key" ON "case_briefs"("citation");
