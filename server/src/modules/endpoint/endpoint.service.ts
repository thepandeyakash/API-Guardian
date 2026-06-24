import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/apiError.js";
import type { CreateEndpointInput, UpdateEndpointInput } from "./endpoint.validation.js";

export async function createEndpoint(
    userId: string,
    data: CreateEndpointInput
) {
    const project = await prisma.project.findFirst({
        where: {
            id: data.projectId,
            userId,
        },
    });

    if (!project) {
        throw new ApiError(
            "Project not found",
            404
        );
    }

    const existingEndpoint =
        await prisma.endpoint.findUnique({
            where: {
                projectId_url_method: {
                    projectId: data.projectId,
                    url: data.url,
                    method: data.method,
                },
            },
        });

    if (existingEndpoint) {
        throw new ApiError(
            "Endpoint already exists",
            409
        );
    }

    const endpoint = await prisma.endpoint.create({
        data: {
            projectId: data.projectId,
            name: data.name,
            url: data.url,
            method: data.method,

            ...(data.expectedStatusCode !== undefined && {
                expectedStatusCode: data.expectedStatusCode,
            }),

            ...(data.monitoringInterval !== undefined && {
                monitoringInterval: data.monitoringInterval,
            }),

            ...(data.monitoringEnabled !== undefined && {
                monitoringEnabled: data.monitoringEnabled,
            }),

            ...(data.headers !== undefined && {
                headers: data.headers,
            }),

            ...(data.requestBody !== undefined && {
                requestBody: data.requestBody,
            }),

            ...(data.authConfig !== undefined && {
                authConfig: data.authConfig,
            }),
        },

        select: {
            id: true,
            projectId: true,
            name: true,
            url: true,
            method: true,
            expectedStatusCode: true,
            monitoringInterval: true,
            monitoringEnabled: true,
            lastStatus: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return endpoint;
}

export async function getEndpoints(
    userId: string
) {
    return prisma.endpoint.findMany({
        where: {
            project: {
                userId,
            },
        },
        select: {
            id: true,
            projectId: true,
            name: true,
            url: true,
            method: true,
            monitoringEnabled: true,
            lastStatus: true,
            lastStatusCode: true,
            lastLatency: true,
            lastCheckedAt: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getEndpointById(
    userId: string,
    endpointId: string
) {
    const endpoint = await prisma.endpoint.findFirst({
        where: {
            id: endpointId,
            project: {
                userId,
            },
        },
        select: {
            id: true,
            projectId: true,
            name: true,
            url: true,
            method: true,
            expectedStatusCode: true,
            monitoringInterval: true,
            monitoringEnabled: true,
            headers: true,
            requestBody: true,
            authConfig: true,
            lastStatus: true,
            lastStatusCode: true,
            lastLatency: true,
            lastCheckedAt: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!endpoint) {
        throw new ApiError("Endpoint not found", 404);
    }

    return endpoint;
}

export async function updateEndpoint(
    userId: string,
    endpointId: string,
    data: UpdateEndpointInput
) {
    const existingEndpoint =
        await prisma.endpoint.findFirst({
            where: {
                id: endpointId,
                project: {
                    userId,
                },
            },
        });

    if (!existingEndpoint) {
        throw new ApiError(
            "Endpoint not found",
            404
        );
    }

    if (
        data.url !== undefined ||
        data.method !== undefined
    ) {
        const duplicateEndpoint =
            await prisma.endpoint.findUnique({
                where: {
                    projectId_url_method: {
                        projectId:
                            existingEndpoint.projectId,
                        url:
                            data.url ??
                            existingEndpoint.url,
                        method:
                            data.method ??
                            existingEndpoint.method,
                    },
                },
            });

        if (
            duplicateEndpoint &&
            duplicateEndpoint.id !== endpointId
        ) {
            throw new ApiError(
                "Endpoint already exists",
                409
            );
        }
    }

    const endpoint =
        await prisma.endpoint.update({
            where: {
                id: endpointId,
            },
            data: {
                ...(data.name !== undefined && {
                    name: data.name,
                }),

                ...(data.url !== undefined && {
                    url: data.url,
                }),

                ...(data.method !== undefined && {
                    method: data.method,
                }),

                ...(data.expectedStatusCode !== undefined && {
                    expectedStatusCode:
                        data.expectedStatusCode,
                }),

                ...(data.monitoringInterval !== undefined && {
                    monitoringInterval:
                        data.monitoringInterval,
                }),

                ...(data.monitoringEnabled !== undefined && {
                    monitoringEnabled:
                        data.monitoringEnabled,
                }),

                ...(data.headers !== undefined && {
                    headers: data.headers,
                }),

                ...(data.requestBody !== undefined && {
                    requestBody: data.requestBody,
                }),

                ...(data.authConfig !== undefined && {
                    authConfig: data.authConfig,
                }),
            },
        });

    return endpoint;
}

export async function deleteEndpoint(
    userId: string,
    endpointId: string
) {
    const endpoint =
        await prisma.endpoint.findFirst({
            where: {
                id: endpointId,
                project: {
                    userId,
                },
            },
        });

    if (!endpoint) {
        throw new ApiError(
            "Endpoint not found",
            404
        );
    }

    await prisma.endpoint.delete({
        where: {
            id: endpointId,
        },
    });
}