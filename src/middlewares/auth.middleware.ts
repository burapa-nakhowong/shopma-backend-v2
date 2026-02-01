import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

import { AppError } from "../errors/AppError.js";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.access_token;

    if (!token) {
        throw new AppError("Unauthorized", 401);
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        req.user = {
            id: Number(decoded.sub),
            role: decoded.role,
        };

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
};
