import prisma from "../../config/db.js";

export const findUserByUsername = (username: string) => {
    return prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            password: true,
            role: true
        },
    });
};