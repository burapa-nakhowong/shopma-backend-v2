import { z } from "zod";

export const registerSchema = z.object({

    username: z
        .string()
        .min(6, "Username must be at least 6 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
