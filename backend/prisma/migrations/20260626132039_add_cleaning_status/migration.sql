-- CreateEnum
CREATE TYPE "CleaningStatus" AS ENUM ('CLEAN', 'DIRTY', 'CLEANING');

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "cleaningStatus" "CleaningStatus" NOT NULL DEFAULT 'CLEAN';
