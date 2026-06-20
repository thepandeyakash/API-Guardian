import {z} from "zod";

export const createProjectSchema = z.object({
    name: z.string().trim().min(2).max(100),
    description: z.string().trim().max(500).transform((value) => value || undefined).optional(),
});

export const updateProjectSchema =
    createProjectSchema.partial();

export type CreateProjectInput =
    z.infer<typeof createProjectSchema>;

export type UpdateProjectInput =
    z.infer<typeof updateProjectSchema>;