import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { ZodError } from "zod";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    //  Zod validation error
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            errors: err.errors.map(e => ({
                field: e.path.join("."),
                message: e.message,
            })),
        });
    }


    //  Custom business error
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }


    //  Unknown error
    res.status(500).json({
        message: "Internal Server Error",
    });
};
