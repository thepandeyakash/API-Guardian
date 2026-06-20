import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/apiError.js";
import type { CreateProjectInput, UpdateProjectInput } from "./project.validation.js";

export async function createProject(userId: string, data: CreateProjectInput) {
    const existingProject = await prisma.project.findUnique({
        where: {
            userId_name: {
                userId,
                name: data.name,
            },
        },
    });

    if (existingProject) {
        throw new ApiError('You already have a project with this name.', 409);
    }

    const newProject = await prisma.project.create({
        data: {
            name: data.name,
            description: data.description ?? null,
            userId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return newProject;
}


export async function getProjects(userId: string) {
    return prisma.project.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getProjectById(
    userId: string,
    projectId: string
) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!project) {
        throw new ApiError(
            "Project not found",
            404
        );
    }

    return project;
}

export async function updateProject(
    userId: string,
    projectId: string,
    data: UpdateProjectInput
) {
    const existingProject = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId,
        },
    });

    if (!existingProject) {
        throw new ApiError("Project not found", 404);
    }

    if (data.name) {
        const duplicateProject = await prisma.project.findUnique({
            where: {
                userId_name: {
                    userId,
                    name: data.name,
                },
            },
        });

        if (
            duplicateProject &&
            duplicateProject.id !== projectId
        ) {
            throw new ApiError(
                "You already have a project with this name.",
                409
            );
        }
    }

    const project = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            ...(data.name !== undefined && {
                name: data.name,
            }),
            ...(data.description !== undefined && {
                description: data.description ?? null,
            }),
        },
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return project;
}

export async function deleteProject(
    userId: string,
    projectId: string
) {
    const existingProject = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId,
        },
    });

    if (!existingProject) {
        throw new ApiError(
            "Project not found",
            404
        );
    }

    await prisma.project.delete({
        where: {
            id: projectId,
        },
    });
}