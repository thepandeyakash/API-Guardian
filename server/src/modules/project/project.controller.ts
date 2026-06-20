import type { Request, Response } from "express";
import type { CreateProjectInput, UpdateProjectInput} from "./project.validation.js";
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from "./project.service.js";
import { ApiError } from "../../utils/apiError.js";



export async function create(
    req: Request<unknown, unknown, CreateProjectInput>,
    res: Response
) {
    const project = await createProject(
        req.user!.userId,
        req.body
    );

    return res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
    });
}

export async function getAll(
    req: Request,
    res: Response
) {
    const projects = await getProjects(
        req.user!.userId
    );

    return res.status(200).json({
        success: true,
        data: projects,
    });
}

export async function getById(
    req: Request<{ id: string }>,
    res: Response
) {
    const project = await getProjectById(
        req.user!.userId,
        req.params.id
    );

    return res.status(200).json({
        success: true,
        data: project,
    });
}


export async function update(
    req: Request<
        { id: string },
        unknown,
        UpdateProjectInput
    >,
    res: Response
) {
    if (Object.keys(req.body).length === 0) {
        throw new ApiError(
            "At least one field is required",
            400
        );
    }

    const project = await updateProject(
        req.user!.userId,
        req.params.id,
        req.body
    );

    return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: project,
    });
}

export async function deleteById(
    req: Request<{ id: string }>,
    res: Response
) {
    await deleteProject(
        req.user!.userId,
        req.params.id
    );

    return res.status(200).json({
        success: true,
        message: "Project deleted successfully",
    });
}

