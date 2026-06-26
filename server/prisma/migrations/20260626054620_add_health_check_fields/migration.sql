/*
  Warnings:

  - Added the required column `isHealthy` to the `MonitoringLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "lastHealthCheckPassed" BOOLEAN;

-- AlterTable
ALTER TABLE "MonitoringLog" ADD COLUMN     "isHealthy" BOOLEAN NOT NULL;

-- CreateIndex
CREATE INDEX "Incident_endpointId_idx" ON "Incident"("endpointId");

-- CreateIndex
CREATE INDEX "Incident_status_idx" ON "Incident"("status");

-- CreateIndex
CREATE INDEX "MonitoringLog_endpointId_idx" ON "MonitoringLog"("endpointId");

-- CreateIndex
CREATE INDEX "MonitoringLog_checkedAt_idx" ON "MonitoringLog"("checkedAt");
