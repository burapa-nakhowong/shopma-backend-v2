import { Request, Response, NextFunction } from 'express';
import { RegisterInput, registerSchema } from "../validators/auth.schema";
import * as authService from '../services/auth.service';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const data:RegisterInput  = registerSchema.parse(req.body); // validate input and type check
        const result = await authService.register(data);            //send to service

        //respond to client
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

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {


        // const result = await authService.login(req.body);
        res.json('login');
    } catch (err) {
        next(err);
    }
};