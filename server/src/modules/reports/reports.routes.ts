import { Router }
from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import {
    getReport,
} from "./reports.controller.js";

const router =
    Router();

router.get(
    "/:endpointId",
    authMiddleware,
    getReport
);

export default router;