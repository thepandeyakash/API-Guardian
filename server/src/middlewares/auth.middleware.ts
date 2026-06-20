import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new ApiError("Unauthorized", 401);
    }

    try {
        const payload = verifyAccessToken(token);

        req.user = {
            userId: payload.userId,
        };

        return next();
    } catch {
        throw new ApiError("Unauthorized", 401);
    }
}