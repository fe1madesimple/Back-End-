/*
  Warnings:

  - You are about to drop the column `examTip` on the `podcasts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "podcasts" DROP COLUMN "examTip",
ALTER COLUMN "notes" SET DATA TYPE TEXT;
