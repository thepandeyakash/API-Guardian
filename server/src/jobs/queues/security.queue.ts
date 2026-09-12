import { Queue } from "bullmq";

export const securityQueue = new Queue("security", {
    connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        tls: {},
        maxRetriesPerRequest: null,
    },
});