/*
  Warnings:

  - The values [PREMIUM_MONTHLY,PREMIUM_ANNUAL] on the enum `PlanType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanType_new" AS ENUM ('STANDARD_MONTHLY', 'STANDARD_ANNUAL', 'PRO_MONTHLY', 'PRO_ANNUAL');
ALTER TABLE "subscriptions" ALTER COLUMN "planType" TYPE "PlanType_new" USING ("planType"::text::"PlanType_new");
ALTER TYPE "PlanType" RENAME TO "PlanType_old";
ALTER TYPE "PlanType_new" RENAME TO "PlanType";
DROP TYPE "PlanType_old";
COMMIT;
