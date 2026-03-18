-- CreateEnum
CREATE TYPE "CaseJurisdiction" AS ENUM ('IRISH_SUPREME_COURT', 'IRISH_COURT_OF_APPEAL', 'IRISH_HIGH_COURT', 'UK_SUPREME_COURT', 'UK_COURT_OF_APPEAL', 'UK_HOUSE_OF_LORDS', 'ECJ_CJEU', 'ECHR');

-- CreateEnum
CREATE TYPE "CaseFrequency" AS ENUM ('HIGH_FREQUENCY', 'MEDIUM_FREQUENCY', 'RARE', 'NOT_EXAMINED');

-- AlterTable
ALTER TABLE "case_briefs" ADD COLUMN     "appearsInPapers" TEXT[],
ADD COLUMN     "examRelevance" TEXT,
ADD COLUMN     "examTip" TEXT,
ADD COLUMN     "frequency" "CaseFrequency" NOT NULL DEFAULT 'NOT_EXAMINED',
ADD COLUMN     "jurisdiction" "CaseJurisdiction" NOT NULL DEFAULT 'IRISH_SUPREME_COURT',
ADD COLUMN     "principleAndApplication" TEXT,
ADD COLUMN     "topics" TEXT[];

-- CreateTable
CREATE TABLE "playlists" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist_podcasts" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "podcastId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playlist_podcasts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_relations" (
    "id" TEXT NOT NULL,
    "parentCaseId" TEXT NOT NULL,
    "relatedCaseId" TEXT NOT NULL,
    "relationshipType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caseBriefId" TEXT,

    CONSTRAINT "case_relations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "playlists_userId_idx" ON "playlists"("userId");

-- CreateIndex
CREATE INDEX "playlist_podcasts_playlistId_idx" ON "playlist_podcasts"("playlistId");

-- CreateIndex
CREATE INDEX "playlist_podcasts_podcastId_idx" ON "playlist_podcasts"("podcastId");

-- CreateIndex
CREATE UNIQUE INDEX "playlist_podcasts_playlistId_podcastId_key" ON "playlist_podcasts"("playlistId", "podcastId");

-- CreateIndex
CREATE INDEX "case_relations_parentCaseId_idx" ON "case_relations"("parentCaseId");

-- CreateIndex
CREATE INDEX "case_relations_relatedCaseId_idx" ON "case_relations"("relatedCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "case_relations_parentCaseId_relatedCaseId_key" ON "case_relations"("parentCaseId", "relatedCaseId");

-- CreateIndex
CREATE INDEX "case_briefs_jurisdiction_idx" ON "case_briefs"("jurisdiction");

-- CreateIndex
CREATE INDEX "case_briefs_frequency_idx" ON "case_briefs"("frequency");

-- AddForeignKey
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_podcasts" ADD CONSTRAINT "playlist_podcasts_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_podcasts" ADD CONSTRAINT "playlist_podcasts_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "podcasts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_relations" ADD CONSTRAINT "case_relations_parentCaseId_fkey" FOREIGN KEY ("parentCaseId") REFERENCES "case_briefs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_relations" ADD CONSTRAINT "case_relations_relatedCaseId_fkey" FOREIGN KEY ("relatedCaseId") REFERENCES "case_briefs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_relations" ADD CONSTRAINT "case_relations_caseBriefId_fkey" FOREIGN KEY ("caseBriefId") REFERENCES "case_briefs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
