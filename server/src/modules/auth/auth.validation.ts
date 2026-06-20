import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().trim().min(2).max(50),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8).max(100)
});

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8)
});

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;