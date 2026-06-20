import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { create, getAll, getById, update, deleteById } from "./project.controller.js";
import { createProjectSchema, updateProjectSchema } from "./project.validation.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    validate(createProjectSchema),
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
    validate(updateProjectSchema),
    update
);

router.delete(
    "/:id",
    authMiddleware,
    deleteById
);

export default router;