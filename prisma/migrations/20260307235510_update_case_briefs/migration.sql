/*
  Warnings:

  - The values [IRISH_SUPREME_COURT,IRISH_COURT_OF_APPEAL,IRISH_HIGH_COURT,UK_SUPREME_COURT,UK_COURT_OF_APPEAL,UK_HOUSE_OF_LORDS,ECJ_CJEU] on the enum `CaseJurisdiction` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `examRelevance` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the column `examTip` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the column `facts` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the column `issue` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the column `principleAndApplication` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the column `reasoning` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the column `ruling` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the column `significance` on the `case_briefs` table. All the data in the column will be lost.
  - You are about to drop the `case_relations` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CaseJurisdiction_new" AS ENUM ('IRELAND', 'UNITED_KINGDOM', 'AUSTRALIA', 'UNITED_STATES', 'NEW_ZEALAND', 'EUROPEAN_UNION', 'ECHR', 'CANADA', 'INTERNATIONAL', 'ENGLAND', 'ENGLAND_AND_WALES', 'SCOTLAND', 'SCOTLAND_UK', 'NORTHERN_IRELAND', 'NEW_SOUTH_WALES', 'GERMANY', 'JAMAICA', 'HONG_KONG', 'SINGAPORE', 'OTHER');
ALTER TABLE "case_briefs" ALTER COLUMN "jurisdiction" DROP DEFAULT;
ALTER TABLE "case_briefs" ALTER COLUMN "jurisdiction" TYPE "CaseJurisdiction_new" USING ("jurisdiction"::text::"CaseJurisdiction_new");
ALTER TYPE "CaseJurisdiction" RENAME TO "CaseJurisdiction_old";
ALTER TYPE "CaseJurisdiction_new" RENAME TO "CaseJurisdiction";
DROP TYPE "CaseJurisdiction_old";
ALTER TABLE "case_briefs" ALTER COLUMN "jurisdiction" SET DEFAULT 'OTHER';
COMMIT;

-- DropForeignKey
ALTER TABLE "case_relations" DROP CONSTRAINT "case_relations_caseBriefId_fkey";

-- DropForeignKey
ALTER TABLE "case_relations" DROP CONSTRAINT "case_relations_parentCaseId_fkey";

-- DropForeignKey
ALTER TABLE "case_relations" DROP CONSTRAINT "case_relations_relatedCaseId_fkey";

-- DropIndex
DROP INDEX "case_briefs_frequency_idx";

-- AlterTable
ALTER TABLE "case_briefs" DROP COLUMN "examRelevance",
DROP COLUMN "examTip",
DROP COLUMN "facts",
DROP COLUMN "frequency",
DROP COLUMN "issue",
DROP COLUMN "principleAndApplication",
DROP COLUMN "reasoning",
DROP COLUMN "ruling",
DROP COLUMN "significance",
ADD COLUMN     "fullSummary" TEXT,
ADD COLUMN     "isFrequentlyTested" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "keyQuote" TEXT,
ADD COLUMN     "legalPrinciple" TEXT,
ALTER COLUMN "jurisdiction" SET DEFAULT 'OTHER';

-- DropTable
DROP TABLE "case_relations";

-- DropEnum
DROP TYPE "CaseFrequency";
