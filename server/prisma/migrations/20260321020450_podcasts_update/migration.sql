/*
  Warnings:

  - You are about to drop the column `description` on the `podcasts` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `podcasts` table. All the data in the column will be lost.
  - Added the required column `subjectName` to the `podcasts` table without a default value. This is not possible if the table is not empty.
  - Made the column `duration` on table `podcasts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "podcasts" DROP COLUMN "description",
DROP COLUMN "subject",
ADD COLUMN     "examTip" TEXT,
ADD COLUMN     "isBonus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lessonNumber" INTEGER,
ADD COLUMN     "moduleNumber" INTEGER,
ADD COLUMN     "notes" JSONB,
ADD COLUMN     "part" INTEGER,
ADD COLUMN     "subjectColor" TEXT NOT NULL DEFAULT '#3B82F6',
ADD COLUMN     "subjectName" TEXT NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "duration" SET DEFAULT 0;
