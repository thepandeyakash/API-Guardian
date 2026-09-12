import { Queue } from "bullmq";

export const monitoringQueue = new Queue("monitoring", {
    connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        tls: {},
        maxRetriesPerRequest: null,
    },

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