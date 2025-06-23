import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config";
import prisma from "../db/prisma";

export const AdminAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.token ||
        req.headers.authorization?.split(' ')[1] ||
        req.query.token;

    if (!token) {
        res.status(401).json({
            message: "Unauthorized: No token provided"
        });
        return;
    }

    if (req.query.token && req.originalUrl) {
        const cleanUrl = req.originalUrl.replace(/[?&]token=[^&]*/, '');
        if (cleanUrl !== req.originalUrl) {
            res.redirect(cleanUrl);
            return;
        }
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET) as { id: string; email: string };

        // Fetch user from DB to verify role
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { role: true },
        });

        if (!user || user.role !== "ADMIN") {
            res.status(403).json({
                message: "Access denied: Admins only"
            });
            return;
        }

        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
        return;
    }
};
