import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(8, "name must be at least 8 characters")
        .max(50, "name must be at most 50 characters"),
    username: z
        .string()
        .min(6, "Username must be at least 6 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

export type RegisterInput = z.infer<typeof registerSchema>;
