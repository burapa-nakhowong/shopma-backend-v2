import prisma from "../../config/db";

export const findUserByUsername = (username: string) => {
    return prisma.user.findUnique({
        where: { username },
        select: {
            username: true,
            password: true,
            role: true
        },
    });
};