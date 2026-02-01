import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();

    res.on('finish', () => {
        const duration = performance.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${duration.toFixed(2)}ms`);
    });

    next();
};