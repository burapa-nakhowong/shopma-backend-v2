import { id } from 'zod/v4/locales';
import { Request, Response, NextFunction } from 'express';
import { RegisterInput, registerSchema } from "../validators/auth.schema.js";
import * as authService from '../services/auth/auth.service.js';
import jwt, { JwtPayload } from "jsonwebtoken";


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data: RegisterInput = registerSchema.parse(req.body); // validate input and type check
        const result = await authService.register(data);            //send to service
        res.status(201).json({
            message: "Register success",
            user: {
                id: result.id,
                username: result.username,
            }
        });

    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.login(req.body);
        const accessToken = await authService.generateAccessToken(result.id, result.role);
        res.cookie("access_token", accessToken, {
            httpOnly: true,                                 // JS อ่านไม่ได้ (กัน XSS)
            secure: process.env.NODE_ENV === "production",  // https เท่านั้น
            sameSite: "lax",                                // ป้องกัน CSRF พื้นฐาน
            maxAge: 60 * 60 * 1000,                         // 1 ชั่วโมง
        });

        res.status(200).json({
            message: "Login success",
            user: {
                id: result.id,
                username: result.username,
                role: result.role,
            },
        });

    } catch (err) {
        next(err);
    }
};