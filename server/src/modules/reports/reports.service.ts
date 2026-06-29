import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export async function generateReport(
    userId: string,
    endpointId: string
) {
    const endpoint =
        await prisma.endpoint.findFirst({
            where: {
                id: endpointId,
                project: {
                    userId,
                },
            },
        });

    if (!endpoint) {
        throw new ApiError(
            "Endpoint not found",
            404
        );
    }

    const monitoringLogs =
        await prisma.monitoringLog.findMany({
            where: {
                endpointId,
            },
        });

    const totalChecks =
        monitoringLogs.length;

    const successfulChecks =
        monitoringLogs.filter(
            log => log.isUp
        ).length;

    const healthyChecks =
        monitoringLogs.filter(
            log => log.isHealthy
        ).length;

    const failedChecks =
        totalChecks -
        successfulChecks;

    const averageLatency =
        totalChecks
            ? Math.round(
                  monitoringLogs.reduce(
                      (sum, log) =>
                          sum +
                          (log.latency ??
                              0),
                      0
                  ) / totalChecks
              )
            : 0;

    const uptimePercentage =
        totalChecks
            ? Number(
                  (
                      successfulChecks /
                      totalChecks *
                      100
                  ).toFixed(2)
              )
            : 0;

    const healthPercentage =
        totalChecks
            ? Number(
                  (
                      healthyChecks /
                      totalChecks *
                      100
                  ).toFixed(2)
              )
            : 0;

    const incidents =
        await prisma.incident.findMany({
            where: {
                endpointId,
            },

            orderBy: {
                createdAt:
                    "desc",
            },
        });

    const latestSecurityScan =
        await prisma.securityScan.findFirst({
            where: {
                endpointId,
            },

            include: {
                securityIssues:
                    true,
            },

            orderBy: {
                scannedAt:
                    "desc",
            },
        });

    return {
        endpoint,

        analytics: {
            totalChecks,
            successfulChecks,
            failedChecks,
            healthyChecks,
            averageLatency,
            uptimePercentage,
            healthPercentage,
        },

        incidents,

        latestSecurityScan,
    };
}