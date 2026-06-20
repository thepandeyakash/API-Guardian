import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

export const errorMiddleware = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const error =
        err instanceof Error
            ? err
            : new Error("Unknown error");

    const statusCode =
        error instanceof ApiError
            ? error.statusCode
            : 500;

    const message =
        error instanceof ApiError
            ? error.message
            : "Internal Server Error";

    const response: Record<string, unknown> = {
        success: false,
        message,
    };

    if (env.NODE_ENV === "development") {
        response.stack = error.stack;
    }

    return res.status(statusCode).json(response);
};