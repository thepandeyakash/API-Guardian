import { Queue } from "bullmq";
import { redis } from "../../config/redis.js";

export const securityQueue =
    new Queue(
        "security",
        {
            connection: redis as any,
        }
    );