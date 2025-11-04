import { Request, Response } from 'express';
import prisma from '../db/prisma';


export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const profile = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                email: true,
                contactNumber: true,
                role: true,
                bio: true,
                socials: true,
                UserAddedAt: true,
                avatar: { select: { url: true } },
                _count: {
                    select: {
                        uploads: true,
                        posts: true,
                        replies: true
                    }
                }
            }
        });

        if (!profile) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMentorProfile = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const mentorUser = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                email: true,
                UserAddedAt: true,
                avatar: { select: { url: true } },
                mentorProfile: {
                    select: {
                        id: true,
                        bio: true,
                        expertise: true,
                        category: true,
                        introVideoUrl: true,
                        socials: true,
                        rating: true
                    }
                }
            }
        });

        if (!mentorUser || !mentorUser.mentorProfile) {
            res.status(404).json({ message: 'Mentor not found' });
            return;
        }

        // Combine user and profile info
        const mentorProfileData = {
            user: {
                id: mentorUser.id,
                username: mentorUser.username,
                UserAddedAt: mentorUser.UserAddedAt,
                avatar: mentorUser.avatar
            },
            profile: mentorUser.mentorProfile
        };

        res.status(200).json(mentorProfileData);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id; // From UserAuth middleware
        const { username, contactNumber, bio, socials } = req.body;

        // 1. Check for username conflict if username is being changed
        if (username) {
            const existingUser = await prisma.user.findUnique({
                where: { username }
            });
            // If a user exists with that username AND it's not the current user
            if (existingUser && existingUser.id !== userId) {
                res.status(400).json({ message: "Username is already taken." });
                return;
            }
        }

        // 2. Update the user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username: username,
                contactNumber: contactNumber,
                bio: bio,
                socials: socials,
                // Do NOT allow editing email or role here
            },
            select: {
                id: true,
                username: true,
                contactNumber: true,
                bio: true,
                socials: true
            }
        });

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
};