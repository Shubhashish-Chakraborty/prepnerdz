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
                role: true,
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

