import { prisma } from "../../config/prisma.js";
import { monitoringQueue } from "../queues/monitoring.queue.js";

export function startMonitoringScheduler() {
    console.log("🕐 Monitoring scheduler started");

    setInterval(async () => {
        console.log("🔍 Running monitoring scheduler");

        const endpoints = await prisma.endpoint.findMany({
            where: {
                monitoringEnabled: true,
            },
            select: {
                id: true,
                name: true,
                monitoringInterval: true,
                lastCheckedAt: true,
            },
        });

        const now = Date.now();

        for (const endpoint of endpoints) {
            const shouldMonitor =
                !endpoint.lastCheckedAt ||
                now - endpoint.lastCheckedAt.getTime() >=
                endpoint.monitoringInterval * 1000;

            if (!shouldMonitor) {
                continue;
            }

            await monitoringQueue.add(
                "health-check",
                {
                    endpointId: endpoint.id,
                },
                {
                    jobId: endpoint.id,
                    removeOnComplete: true,
                }
            );

            console.log(
                `📥 Added monitoring job for ${endpoint.name}`
            );
        }
    }, 60 * 1000);
}