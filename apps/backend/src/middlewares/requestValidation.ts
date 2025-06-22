import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';

export const requestValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const apiSecret = req.headers['x-api-request-secret'];

        if (!apiSecret || typeof apiSecret !== 'string') {
            res.status(400).json({
                success: false,
                message: 'Missing or invalid API request secret',
            });
            return;
        }

        // Check in the database
        const isValid = await prisma.apiRequest.findFirst({
            where: {
                apiSecret: apiSecret,
            },
        });

        if (!isValid) {
            res.status(403).json({
                success: false,
                message: 'Unauthorized: Invalid API request secret',
            });
            return;
        }

        // Passed validation
        next();
    } catch (err) {
        console.error('[RequestValidation Error]', err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error in request validation',
        });
        return;
    }
};
