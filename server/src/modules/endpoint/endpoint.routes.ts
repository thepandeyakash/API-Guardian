import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createEndpointSchema, updateEndpointSchema } from "./endpoint.validation.js";
import { create, deleteById, getAll, getById, update } from "./endpoint.controller.js";


const router = Router();

router.post(
    "/",
    authMiddleware,
    validate(createEndpointSchema),
    create
);

router.get(
    "/",
    authMiddleware,
    getAll
);

router.get(
    "/:id",
    authMiddleware,
    getById
);

router.patch(
    "/:id",
    authMiddleware,
    validate(updateEndpointSchema),
    update
);

router.delete(
    "/:id",
    authMiddleware,
    deleteById
);

export default router;