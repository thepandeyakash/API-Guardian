import type {
    Request,
    Response,
} from "express";

import {
    getMonitoringLogs,
    manualCheck,
    getAnalytics,
} from "./monitoring.service.js";

export async function getLogs(
    req: Request,
    res: Response
) {
    const endpointId = req.params.endpointId as string;

    const logs = await getMonitoringLogs(
        req.user!.userId,
        endpointId,
        req.query.limit ? Number(req.query.limit) : 20
    );

    return res.json({
        success: true,
        data: logs,
    });
}

export async function check(
    req: Request,
    res: Response
) {
    const endpointId = req.params.endpointId as string;

    await manualCheck(
        req.user!.userId,
        endpointId
    );

    return res.json({
        success: true,
        message:
            "Manual check queued",
    });
}

export async function analytics(
    req: Request,
    res: Response
) {
    const endpointId = req.params.endpointId as string;

    const data = await getAnalytics(
        req.user!.userId,
        endpointId
    );

    return res.json({
        success: true,
        data,
    });
}