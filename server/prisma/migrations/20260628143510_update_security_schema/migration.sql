/*
  Warnings:

  - Added the required column `code` to the `SecurityIssue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SecurityScanStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "SecurityIssue" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SecurityScan" ADD COLUMN     "status" "SecurityScanStatus" NOT NULL DEFAULT 'PENDING';
