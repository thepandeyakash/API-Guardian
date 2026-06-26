import { Queue } from "bullmq";
import { redis } from "../../config/redis.js";

export const monitoringQueue = new Queue("monitoring", {
    connection: redis as any,
    defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 1000,
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000,
        },
    },
});