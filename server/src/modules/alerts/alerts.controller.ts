import type {
    Request,
    Response,
} from "express";

import {
    getAlerts,
    markAsRead,
} from "./alerts.service.js";

export async function getAllAlerts(
    req: Request,
    res: Response
) {
    const alerts =
        await getAlerts(
            req.user!.userId
        );

    return res.json({
        success: true,
        data: alerts,
    });
}

export async function readAlert(
    req: Request,
    res: Response
) {
    const alert =
        await markAsRead(
            req.user!.userId,
            String(
                req.params.id
            )
        );

    return res.json({
        success: true,
        data: alert,
    });
}