import { Router } from "express";
import { login, register,me } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.get(
    "/me",
    authMiddleware,
    me
);

export default router;