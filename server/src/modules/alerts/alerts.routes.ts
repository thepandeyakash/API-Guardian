import { Router }
from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import {
    getAllAlerts,
    readAlert,
} from "./alerts.controller.js";

const router =
    Router();

router.get(
    "/",
    authMiddleware,
    getAllAlerts
);

router.patch(
    "/:id/read",
    authMiddleware,
    readAlert
);

export default router;