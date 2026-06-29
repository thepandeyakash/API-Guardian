import type {
    Request,
    Response,
} from "express";

import {
    generateReport,
} from "./reports.service.js";

export async function getReport(
    req: Request,
    res: Response
) {
    const report =
        await generateReport(
            req.user!.userId,
            String(
                req.params
                    .endpointId
            )
        );

    return res.json({
        success: true,
        data: report,
    });
}