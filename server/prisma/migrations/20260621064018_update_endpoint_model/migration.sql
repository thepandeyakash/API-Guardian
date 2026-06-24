/*
  Warnings:

  - You are about to drop the column `isActive` on the `Endpoint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId,url,method]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Endpoint" DROP COLUMN "isActive",
ADD COLUMN     "expectedStatusCode" INTEGER NOT NULL DEFAULT 200,
ADD COLUMN     "monitoringEnabled" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "monitoringInterval" SET DEFAULT 300;

-- CreateIndex
CREATE INDEX "Endpoint_projectId_idx" ON "Endpoint"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_projectId_url_method_key" ON "Endpoint"("projectId", "url", "method");
