import { z } from "zod";

export const httpMethods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
] as const;

export const httpMethodSchema = z.enum(httpMethods);

export const createProjectSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const createEndpointSchema = z.object({
  projectId: z.string().uuid("Project is required"),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  url: z.string().trim().url("Enter a valid URL"),
  method: httpMethodSchema,
  expectedStatusCode: z
    .number()
    .int()
    .min(100)
    .max(599)
    .optional(),
  monitoringInterval: z.number().int().positive().optional(),
  monitoringEnabled: z.boolean().optional(),
});

export const updateEndpointSchema = createEndpointSchema
  .omit({ projectId: true })
  .partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type CreateEndpointInput = z.infer<typeof createEndpointSchema>;
export type UpdateEndpointInput = z.infer<typeof updateEndpointSchema>;
