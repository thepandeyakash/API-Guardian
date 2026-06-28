import { prisma } from "../../config/prisma.js";
import { monitoringQueue } from "../../jobs/queues/monitoring.queue.js";
import { ApiError } from "../../utils/apiError.js";


export async function getMonitoringLogs(
    userId: string,
    endpointId: string,
    limit: number
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

    const logs =
        await prisma.monitoringLog.findMany({
            where: {
                endpointId,
            },

            orderBy: {
                checkedAt: "desc",
            },

            take: limit,
        });

    return logs;
}



export async function manualCheck(
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

    await monitoringQueue.add(
        "health-check",
        {
            endpointId,
        }
    );

    return;
}

export async function getAnalytics(
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

    const logs =
        await prisma.monitoringLog.findMany({
            where: {
                endpointId,
            },
            orderBy: {
                checkedAt: "desc",
            },
            take: 1000,
        });

    const totalChecks =
        logs.length;

    if (totalChecks === 0) {
        return {
            totalChecks: 0,
            successfulChecks: 0,
            failedChecks: 0,
            healthyChecks: 0,
            uptimePercentage: 0,
            healthPercentage: 0,
            averageLatency: 0,
        };
    }

    const successfulChecks =
        logs.filter(
            (log) => log.isUp
        ).length;

    const failedChecks =
        logs.filter(
            (log) => !log.isUp
        ).length;

    const healthyChecks =
        logs.filter(
            (log) => log.isHealthy
        ).length;

    const averageLatency =
        Math.round(
            logs.reduce(
                (sum, log) =>
                    sum +
                    (log.latency ??
                        0),
                0
            ) / totalChecks
        );

    const uptimePercentage =
        Number(
            (
                (successfulChecks /
                    totalChecks) *
                100
            ).toFixed(2)
        );

    const healthPercentage =
        Number(
            (
                (healthyChecks /
                    totalChecks) *
                100
            ).toFixed(2)
        );

    return {
        totalChecks,
        successfulChecks,
        failedChecks,
        healthyChecks,
        uptimePercentage,
        healthPercentage,
        averageLatency,
    };
}