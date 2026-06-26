import { Redis } from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    maxRetriesPerRequest: null,
});

redis.on("connect", () => {
    console.log("✅ Redis connected");
});

redis.on("error", (error: Error) => {
    console.error("❌ Redis error:", error);
});