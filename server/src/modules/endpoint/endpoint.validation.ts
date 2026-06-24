import { z } from "zod";
import { HttpMethod } from "@prisma/client";

export const createEndpointSchema = z.object({
    projectId: z.string().uuid(),

    name: z
        .string()
        .trim()
        .min(2)
        .max(100),

    url: z
        .string()
        .trim()
        .url(),

    method: z.nativeEnum(HttpMethod),

    expectedStatusCode: z
        .number()
        .int()
        .min(100)
        .max(599)
        .optional(),

    monitoringInterval: z
        .number()
        .int()
        .positive()
        .optional(),

    monitoringEnabled: z
        .boolean()
        .optional(),

    headers: z.record(z.string(), z.string()).optional(),

    requestBody: z.record(z.string(), z.any()).optional(),

    authConfig: z.record(z.string(), z.any()).optional(),
});

export const updateEndpointSchema = createEndpointSchema
    .omit({
        projectId: true,
    })
    .partial();

export type CreateEndpointInput =
    z.infer<typeof createEndpointSchema>;

export type UpdateEndpointInput =
    z.infer<typeof updateEndpointSchema>;