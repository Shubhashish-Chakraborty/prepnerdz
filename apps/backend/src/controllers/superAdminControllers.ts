import { Request, Response } from 'express';
import prisma from '../db/prisma';

export const getUsers = async (req:Request, res:Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}

export const updateUserByAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, role } = req.body;

        if (!id) {
            res.status(400).json({ message: 'User id is required' });
            return;
        }

        const data: any = {};
        if (username) data.username = username;
        if (role) data.role = role;

        const updated = await prisma.user.update({
            where: { id },
            data
        });

        res.status(200).json({ message: 'User updated', user: updated });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteUserByAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'User id is required' });
            return;
        }

        // Consider cascade constraints; here we try to delete the user
        await prisma.user.delete({ where: { id } });

        res.status(200).json({ message: 'User deleted' });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(500).json({ message: 'Server error' });
    }
}

// Uploads (resources) management
export const getUploadsByAdmins = async (req: Request, res: Response) => {
    try {
        // fetch resources uploaded by users who have role ADMIN
        const uploads = await prisma.resource.findMany({
            include: {
                uploadedBy: {
                    select: { id: true, username: true, email: true, role: true }
                },
                subject: {
                    select: { id: true, subjectName: true }
                }
            }
        });

        // filter uploads where uploader role is ADMIN
        const adminUploads = uploads.filter(u => u.uploadedBy?.role === 'ADMIN');

        res.status(200).json({ uploads: adminUploads });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateUploadByAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // resource id
        const { title, description, fileUrl } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Resource id is required' });
            return;
        }

        const data: any = {};
        if (title) data.title = title;
        if (description !== undefined) data.description = description;
        if (fileUrl) data.fileUrl = fileUrl;

        const updated = await prisma.resource.update({ where: { id }, data });

        res.status(200).json({ message: 'Upload updated', resource: updated });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Resource not found' });
            return;
        }
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteUploadByAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Resource id is required' });
            return;
        }

        await prisma.resource.delete({ where: { id } });
        res.status(200).json({ message: 'Resource deleted' });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Resource not found' });
            return;
        }
        res.status(500).json({ message: 'Server error' });
    }
}

export const getMentorApplications = async (req: Request, res: Response) => {
    try {
        const applications = await prisma.mentorApplication.findMany({
            where: { status: 'PENDING' },
            include: {
                user: {
                    select: { id: true, username: true, email: true }
                }
            },
            orderBy: { createdAt: 'asc' }
        });
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching mentor applications:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const reviewMentorApplication = async (req: Request, res: Response) => {
    try {
        const { appId } = req.params;
        const { status } = req.body; // 'APPROVED' or 'REJECTED'

        if (status !== 'APPROVED' && status !== 'REJECTED') {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }

        const application = await prisma.mentorApplication.update({
            where: { id: appId },
            data: { status }
        });

        // If approved, create the mentor profile and update user role
        if (status === 'APPROVED') {
            // 1. Update User Role
            await prisma.user.update({
                where: { id: application.userId },
                data: { role: 'MENTOR' }
            });
            // 2. Create MentorProfile
            await prisma.mentorProfile.create({
                data: {
                    userId: application.userId,
                    bio: application.bio,
                    expertise: application.expertise,
                    category: application.category,
                    socials: application.socials || undefined,
                }
            });
        }

        res.status(200).json(application);
    } catch (error) {
        console.error("Error reviewing application:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const assignMentor = async (req: Request, res: Response) => {
    try {
        const { userId, bio, expertise } = req.body;

        // 1. Update User Role
        await prisma.user.update({
            where: { id: userId },
            data: { role: 'MENTOR' }
        });

        // 2. Create MentorProfile
        const profile = await prisma.mentorProfile.create({
            data: {
                userId: userId,
                bio: bio || 'Welcome!',
                expertise: expertise || ['General'],
                category: 'SENIOR', // Default
            }
        });

        res.status(201).json(profile);
    } catch (error) {
        console.error("Error assigning mentor:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const unassignMentor = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        // 1. Update User Role
        await prisma.user.update({
            where: { id: userId },
            data: { role: 'STUDENT' }
        });

        // 2. Delete MentorProfile
        await prisma.mentorProfile.delete({
            where: { userId: userId }
        });

        res.status(200).json({ message: 'Mentor unassigned successfully' });
    } catch (error) {
        console.error("Error unassigning mentor:", error);
        res.status(500).json({ message: 'Server error' });
    }
};