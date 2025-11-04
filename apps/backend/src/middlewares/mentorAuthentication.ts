import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

/*
Assumed UserAuth middleware has already run and attached `(req as any).user.id`.
*/

export const MentorAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            res.status(401).json({ message: "Authentication required." });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (user && user.role === 'MENTOR') {
            next();
        } else {
            res.status(403).json({ message: "Forbidden: Mentors only." });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "Server error during authorization." });
        return;
    }
};

