
import * as bcrypt from 'bcryptjs';
import prisma from '../../config/db';
import { Prisma } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { RegisterInput, LoginInput } from "../../validators/auth.schema";
import { findUserByUsername } from '../auth/auth.repository';
// service สำหรับสมัครสมาชิก 
export const register = async (data: RegisterInput) => {
    try {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                name: data.name,
                username: data.username,
                password: hashed,
                // role: 'ADMIN',
            },
            select: {
                id: true,
                name: true,
                username: true,
            },
        });
        return user;
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            throw new AppError("Username already exists", 409);
        }

        throw err;
    }
};


// service สำหรับLognin
export const login = async (data: LoginInput) => {

    const user = await findUserByUsername(data.username);
    if (!user) throw new AppError("User not found", 404);
    
    // const isMatch = await bcrypt.compare(data.password, user.password);
    // if (!isMatch) {
    //     throw new AppError("Invalid credentials", 401);
    // }

    return user;



};