/*
  Warnings:

  - You are about to drop the column `emailVerificationToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_emailVerificationToken_idx";

-- DropIndex
DROP INDEX "users_emailVerificationToken_key";

-- DropIndex
DROP INDEX "users_passwordResetToken_idx";

-- DropIndex
DROP INDEX "users_passwordResetToken_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerificationToken",
DROP COLUMN "passwordResetToken",
ADD COLUMN     "emailVerificationCode" TEXT,
ADD COLUMN     "passwordResetCode" TEXT;
