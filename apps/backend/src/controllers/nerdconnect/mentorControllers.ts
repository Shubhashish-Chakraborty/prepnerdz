import { Request, Response } from 'express';
import prisma from '../../db/prisma';

export const applyForMentorship = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { bio, expertise, category, socials } = req.body;

        // Check if user already has a pending/approved application
        const existingApplication = await prisma.mentorApplication.findFirst({
            where: { userId, status: { in: ['PENDING', 'APPROVED'] } }
        });
        if (existingApplication) {
            res.status(400).json({ message: `You already have an ${existingApplication.status} application.` });
            return;
        }

        // Check if user is already a mentor
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
        if (user?.role === 'MENTOR') {
            res.status(400).json({ message: "You are already a mentor." });
            return;
        }

        const application = await prisma.mentorApplication.create({
            data: {
                userId,
                bio,
                expertise,
                category,
                socials
            }
        });

        res.status(201).json(application);
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMyMentorProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const profile = await prisma.mentorProfile.findUnique({
            where: { userId },
        });

        if (!profile) {
            res.status(404).json({ message: "Mentor profile not found." });
            return;
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateMyMentorProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { bio, expertise, introVideoUrl, socials } = req.body;

        const updatedProfile = await prisma.mentorProfile.update({
            where: { userId },
            data: {
                bio,
                expertise,
                introVideoUrl,
                socials
            }
        });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};