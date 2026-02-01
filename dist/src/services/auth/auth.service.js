import * as bcrypt from 'bcrypt';
import prisma from '../../config/db.js';
import { Prisma } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { findUserByUsername } from '../auth/auth.repository';
import jwt from "jsonwebtoken";
// service สำหรับสมัครสมาชิก 
export const register = async (data) => {
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
    }
    catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002") {
            throw new AppError("Username already exists", 409);
        }
        throw err;
    }
};
// service สำหรับLognin
export const login = async (data) => {
    console.time("find user by username");
    const user = await findUserByUsername(data.username);
    if (!user)
        throw new AppError("User not found", 404);
    console.timeEnd("find user by username");
    console.time("bcrypt.compare");
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch)
        throw new AppError("Invalid credentials", 401);
    console.timeEnd("bcrypt.compare");
    //ประมาณ 700 ms
    return user;
};
export const generateAccessToken = async (sub, role) => {
    return jwt.sign({
        sub: sub,
        role: role,
    }, process.env.JWT_SECRET, { expiresIn: "15m" });
};
