-- AlterTable
ALTER TABLE "SecurityScan" ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "scanDuration" DROP NOT NULL;
