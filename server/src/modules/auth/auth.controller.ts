import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service.js";
import type { LoginInput, RegisterInput } from "./auth.validation.js";
import { getCurrentUser } from "./auth.service.js";
import { ApiError } from "../../utils/apiError.js";

export async function register(
    req: Request<unknown, unknown, RegisterInput>,
    res: Response
) {
    const result = await registerUser(req.body);

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
    });
}

export async function login(
    req: Request<unknown, unknown, LoginInput>,
    res: Response
) {
    const result = await loginUser(req.body);

    return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    });
}

export async function me(
    req: Request,
    res: Response
) {
    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError("Unauthorized", 401);
    }

    const user = await getCurrentUser(userId);

    return res.status(200).json({
        success: true,
        data: user,
    });
}