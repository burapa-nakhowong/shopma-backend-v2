import * as bcrypt from 'bcryptjs';
import prisma from '../config/db';
import { Prisma } from "@prisma/client";
import { Response, Request, NextFunction } from 'express';
import { AppError } from "../errors/AppError";

interface RegisterData {
    name: string;
    username: string;
    password: string;
}

// service สำหรับสมัครสมาชิก
export const register = async (data:RegisterData) => {
    try {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                name: data.name,
                username: data.username,
                password: hashed,
                // role: 'ADMIN',
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
export const login = async (data: {
    email: string;
    password: string;
}) => {

    return {};
};