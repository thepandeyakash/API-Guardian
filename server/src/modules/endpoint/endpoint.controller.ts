import type { Request, Response } from "express";
import { createEndpoint, getEndpoints, getEndpointById, updateEndpoint, deleteEndpoint } from "./endpoint.service.js";
import type { CreateEndpointInput, UpdateEndpointInput } from "./endpoint.validation.js";
import { ApiError } from "../../utils/apiError.js";



export async function create(
    req: Request<
        unknown,
        unknown,
        CreateEndpointInput
    >,
    res: Response
) {
    const endpoint = await createEndpoint(
        req.user!.userId,
        req.body
    );

    return res.status(201).json({
        success: true,
        message: "Endpoint created successfully",
        data: endpoint,
    });
}

export async function getAll(
    req: Request,
    res: Response
) {
    const endpoints = await getEndpoints(
        req.user!.userId
    );

    return res.status(200).json({
        success: true,
        count: endpoints.length,
        data: endpoints,
    });
}

export async function getById(
    req: Request<{ id: string }>,
    res: Response
) {
    const endpoint = await getEndpointById(
        req.user!.userId,
        req.params.id
    );

    return res.status(200).json({
        success: true,
        data: endpoint,
    });
}

export async function update(
    req: Request<
        { id: string },
        unknown,
        UpdateEndpointInput
    >,
    res: Response
) {
    if (Object.keys(req.body).length === 0) {
        throw new ApiError(
            "At least one field is required",
            400
        );
    }

    const endpoint = await updateEndpoint(
        req.user!.userId,
        req.params.id,
        req.body
    );

    return res.status(200).json({
        success: true,
        message: "Endpoint updated successfully",
        data: endpoint,
    });
}

export async function deleteById(
    req: Request<{ id: string }>,
    res: Response
) {
    await deleteEndpoint(
        req.user!.userId,
        req.params.id
    );

    return res.status(200).json({
        success: true,
        message:
            "Endpoint deleted successfully",
    });
}