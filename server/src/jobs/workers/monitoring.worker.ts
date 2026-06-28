import { Worker } from "bullmq";
import { performance } from "node:perf_hooks";

import { redis } from "../../config/redis.js";
import { prisma } from "../../config/prisma.js";
import { AlertChannel, AlertType } from "@prisma/client";

export const monitoringWorker = new Worker(
    "monitoring",

    async (job) => {
        const { endpointId } = job.data;

        const endpoint = await prisma.endpoint.findUnique({
            where: {
                id: endpointId,
            },
        });

        if (!endpoint) {
            console.log(`❌ Endpoint ${endpointId} not found`);
            return;
        }

        if (!endpoint.monitoringEnabled) {
            console.log(`⏸ Monitoring disabled: ${endpoint.id}`);
            return;
        }

        console.log(`🚀 Monitoring: ${endpoint.name}`);

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 5000);

        const start = performance.now();

        let latency = 0;
        let statusCode: number | null = null;
        let responseSize: number | null = null;
        let isUp = false;
        let isHealthy = false;
        let errorMessage: string | null = null;

        try {
            const fetchOptions: RequestInit = {
                method: endpoint.method,
                signal: controller.signal,
            };

            if (endpoint.headers && typeof endpoint.headers === "object") {
                fetchOptions.headers = endpoint.headers as HeadersInit;
            }

            const response = await fetch(endpoint.url, fetchOptions);

            isUp = true;

            statusCode = response.status;

            responseSize =
                Number(
                    response.headers.get("content-length")
                ) || null;

            isHealthy =
                response.status ===
                endpoint.expectedStatusCode;
        } catch (error) {
            isUp = false;

            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = "Unknown error";
            }
        } finally {
            clearTimeout(timeout);

            latency = Math.round(
                performance.now() - start
            );
        }

        await prisma.monitoringLog.create({
            data: {
                endpointId: endpoint.id,
                statusCode,
                latency,
                responseSize,
                isUp,
                isHealthy,
                errorMessage,
            },
        });

        await prisma.endpoint.update({
            where: {
                id: endpoint.id,
            },
            data: {
                lastStatus: isUp ? "UP" : "DOWN",
                lastHealthCheckPassed: isHealthy,
                lastStatusCode: statusCode,
                lastLatency: latency,
                lastCheckedAt: new Date(),
            },
        });

        if (!isUp) {
            const openIncident =
                await prisma.incident.findFirst({
                    where: {
                        endpointId: endpoint.id,
                        status: "OPEN",
                    },
                });

            if (openIncident) {
                await prisma.incident.update({
                    where: {
                        id: openIncident.id,
                    },
                    data: {
                        failureCount: {
                            increment: 1,
                        },
                        lastErrorMessage:
                            errorMessage,
                    },
                });
            } else {
                const incident = await prisma.incident.create({
                    data: {
                        endpointId: endpoint.id,
                        lastErrorMessage:
                            errorMessage,
                    },
                });

                await prisma.alert.create({
                    data: {
                        endpointId,

                        incidentId:
                            incident.id,

                        type:
                            AlertType.DOWN,

                        channel:
                            AlertChannel.DASHBOARD,

                        title:
                            "Endpoint Down",

                        message:
                            `${endpoint.name} is down.`,
                    },
                });
            }
        } else {
            const openIncident =
                await prisma.incident.findFirst({
                    where: {
                        endpointId: endpoint.id,
                        status: "OPEN",
                    },
                });

            if (openIncident) {
                const endedAt = new Date();

                await prisma.incident.update({
                    where: {
                        id: openIncident.id,
                    },
                    data: {
                        status: "CLOSED",
                        endedAt,
                        duration: Math.floor(
                            (
                                endedAt.getTime() -
                                openIncident.startedAt.getTime()
                            ) / 1000
                        ),
                    },
                });

                await prisma.alert.create({
                    data: {
                        endpointId,

                        incidentId:
                            openIncident.id,

                        type:
                            AlertType.RECOVERED,

                        channel:
                            AlertChannel.DASHBOARD,

                        title:
                            "Endpoint Recovered",

                        message:
                            `${endpoint.name} has recovered.`,
                    },
                });
            }
        }

        console.log({
            endpoint: endpoint.name,
            isUp,
            isHealthy,
            latency,
            statusCode,
        });
    },

    {
        connection: redis as any,
    }
);

monitoringWorker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
});

monitoringWorker.on("failed", (job, error) => {
    console.error(
        `❌ Job ${job?.id} failed`,
        error.message
    );
});

