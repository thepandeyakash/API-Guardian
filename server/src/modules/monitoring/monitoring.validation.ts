import { z } from "zod";

export const endpointParamSchema =
    z.object({
        endpointId:
            z.string().uuid(),
    });

export const getMonitoringLogsSchema =
    endpointParamSchema.extend({
        limit: z.coerce
            .number()
            .int()
            .positive()
            .max(100)
            .default(20),
    });

export type EndpointParamInput =
    z.infer<
        typeof endpointParamSchema
    >;

export type GetMonitoringLogsInput =
    z.infer<
        typeof getMonitoringLogsSchema
    >;