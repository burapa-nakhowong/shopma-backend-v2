import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json({
            message: "Register success",
            user: {
                id: result.id,
                username: result.username,
            },
            
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