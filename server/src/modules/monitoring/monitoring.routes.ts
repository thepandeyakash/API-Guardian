import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import {
    getLogs,
    check,
    analytics,
} from "./monitoring.controller.js";



const router = Router();

router.get(
    "/logs/:endpointId",
    authMiddleware,
    getLogs
);

router.post(
    "/check/:endpointId",
    authMiddleware,
    check
);

router.get(
    "/analytics/:endpointId",
    authMiddleware,
    analytics
);

export default router;