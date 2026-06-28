import { Router }
from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { scan }
from "./security.controller.js";

const router =
    Router();

router.post(
    "/scan/:endpointId",
    authMiddleware,
    scan
);

export default router;