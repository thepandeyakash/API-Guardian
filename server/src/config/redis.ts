import { Redis } from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
});

let logged = false;

redis.on("connect", () => {
    if (!logged) {
        console.log("✅ Redis connected");
        logged = true;
    }
});

redis.on("error", (error: Error) => {
    console.error("❌ Redis error:", error);
});