import { Router } from "express";
import { monitoringQueue } from "../jobs/queues/monitoring.queue.js";

const router = Router();

router.get("/", async (_req, res) => {
    await monitoringQueue.add("health-check", {
        endpointId: "4f1ce2a1-6beb-4d7d-8e0d-97babda577c2",
    });

    return res.json({
        success: true,
        message: "Job added successfully",
    });
});

export default router;