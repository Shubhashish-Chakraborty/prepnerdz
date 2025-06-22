import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config";

export const UserAuth = (req: Request, res: Response, next: NextFunction) => {
    // Check cookies, authorization header, AND query params
    let token = req.cookies.token ||
        req.headers.authorization?.split(' ')[1] ||
        req.query.token;

    if (!token) {
        res.status(401).json({
            message: "Unauthorized: No token provided"
        });
        return
    }

    // If token is from query params, remove it from URL for security
    if (req.query.token && req.originalUrl) {
        const cleanUrl = req.originalUrl.replace(/[?&]token=[^&]*/, '');
        if (cleanUrl !== req.originalUrl) {
            res.redirect(cleanUrl);
            return
        }
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET) as {
            id: string; email: string
        };
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
        return
    }
};