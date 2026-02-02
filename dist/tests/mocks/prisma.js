import { vi } from "vitest";
export const prisma = {
    user: {
        create: vi.fn(),
        findUnique: vi.fn(),
    },
};
