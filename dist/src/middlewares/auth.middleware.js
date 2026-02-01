import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.access_token;
    if (!token) {
        throw new AppError("Unauthorized", 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: Number(decoded.sub),
            role: decoded.role,
        };
        next();
    }
    catch {
        throw new AppError("Invalid token", 401);
    }
};
