import type {
    Request,
    Response,
} from "express";

import { startScan } from "./security.service.js";

export async function scan(
    req: Request,
    res: Response
) {
    const result =
        await startScan(
            req.user!.userId,
            String(
                req.params.endpointId
            )
        );

    return res.status(201)
        .json({
            success: true,
            data: result,
        });
}