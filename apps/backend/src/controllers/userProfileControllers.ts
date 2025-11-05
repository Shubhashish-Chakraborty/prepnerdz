import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { updateUserSchema } from '../utils/mentorZodSchema';


export const getPublicUserProfile = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const loggedInUserId = (req as any).user?.id; // Get logged in user ID (if any)

        const user = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                bio: true,
                socials: true,
                role: true,
                UserAddedAt: true,
                avatar: { select: { url: true } },
                _count: {
                    select: {
                        uploads: true,
                        posts: true,
                        replies: true,
                        following: true, // Count of people this user follows
                        followedBy: true, // Count of followers
                    },
                },
                // Check if the logged-in user is following this profile
                followedBy: loggedInUserId ? {
                    where: { followerId: loggedInUserId }
                } : false,
            },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Format the 'followedBy' check into a simple boolean
        const { followedBy, ...profileData } = user;
        const isFollowing = loggedInUserId ? (Array.isArray(followedBy) && followedBy.length > 0) : false;

        res.status(200).json({ ...profileData, isFollowing });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getPublicMentorProfile = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const loggedInUserId = (req as any).user?.id; // Get logged in user ID (if any)

        const mentor = await prisma.user.findUnique({
            where: { username, role: 'MENTOR' },
            select: {
                id: true,
                username: true,
                bio: true,
                socials: true,
                role: true,
                UserAddedAt: true,
                avatar: { select: { url: true } },
                mentorProfile: true, // Include full mentor profile details
                _count: {
                    select: {
                        uploads: true,
                        posts: true,
                        replies: true,
                        following: true,
                        followedBy: true,
                    },
                },
                // Check if the logged-in user is following this profile
                followedBy: loggedInUserId ? {
                    where: { followerId: loggedInUserId }
                } : false,
            },
        });

        if (!mentor) {
            res.status(404).json({ message: 'Mentor not found' });
            return;
        }

        const { followedBy, ...profileData } = mentor;
        const isFollowing = loggedInUserId ? (Array.isArray(followedBy) && followedBy.length > 0) : false;

        res.status(200).json({ ...profileData, isFollowing });
    } catch (error) {
        console.error("Error fetching mentor profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// later

// export const getUserProfile = async (req: Request, res: Response) => {
//     try {
//         const { username } = req.params;
//         const profile = await prisma.user.findUnique({
//             where: { username },
//             select: {
//                 id: true,
//                 username: true,
//                 email: true,
//                 contactNumber: true,
//                 role: true,
//                 bio: true,
//                 socials: true,
//                 UserAddedAt: true,
//                 avatar: { select: { url: true } },
//                 _count: {
//                     select: {
//                         uploads: true,
//                         posts: true,
//                         replies: true
//                     }
//                 }
//             }
//         });

//         if (!profile) {
//             res.status(404).json({ message: 'User not found' });
//             return;
//         }
//         res.status(200).json(profile);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// export const getMentorProfile = async (req: Request, res: Response) => {
//     try {
//         const { username } = req.params;
//         const mentorUser = await prisma.user.findUnique({
//             where: { username },
//             select: {
//                 id: true,
//                 username: true,
//                 email: true,
//                 UserAddedAt: true,
//                 avatar: { select: { url: true } },
//                 mentorProfile: {
//                     select: {
//                         id: true,
//                         bio: true,
//                         expertise: true,
//                         category: true,
//                         introVideoUrl: true,
//                         socials: true,
//                         rating: true
//                     }
//                 }
//             }
//         });

//         if (!mentorUser || !mentorUser.mentorProfile) {
//             res.status(404).json({ message: 'Mentor not found' });
//             return;
//         }

//         // Combine user and profile info
//         const mentorProfileData = {
//             user: {
//                 id: mentorUser.id,
//                 username: mentorUser.username,
//                 UserAddedAt: mentorUser.UserAddedAt,
//                 avatar: mentorUser.avatar
//             },
//             profile: mentorUser.mentorProfile
//         };

//         res.status(200).json(mentorProfileData);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// later

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const result = updateUserSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({ errors: result.error.flatten().fieldErrors });
            return;
        }

        const { username, contactNumber, bio, socials } = result.data;

        // Check if username is already taken by another user
        if (username) {
            const existingUser = await prisma.user.findUnique({ where: { username } });
            if (existingUser && existingUser.id !== userId) {
                res.status(409).json({ message: 'Username is already taken' });
                return;
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username,
                contactNumber,
                bio,
                socials,
            },
            select: { id: true, username: true, email: true, contactNumber: true, bio: true, socials: true } // Return safe data
        });

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const toggleFollowUser = async (req: Request, res: Response) => {
    try {
        const followerId = (req as any).user.id;
        const { followingId } = req.params;

        if (followerId === followingId) {
            res.status(400).json({ message: "You cannot follow yourself." });
            return;
        }

        // Check if the follow relationship already exists
        const existingFollow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        if (existingFollow) {
            // Unfollow
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId,
                    },
                },
            });
            res.status(200).json({ message: 'Successfully unfollowed user.' });
        } else {
            // Follow
            await prisma.follows.create({
                data: {
                    followerId,
                    followingId,
                },
            });
            res.status(200).json({ message: 'Successfully followed user.' });
        }
    } catch (error) {
        console.error("Error toggling follow:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const searchProfiles = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        let whereClause = {}; // Default: empty filter

        // If a search query 'q' exists, build the filter
        if (q && typeof q === 'string' && q.trim().length > 0) {
            const query = q.trim();
            whereClause = {
                OR: [
                    { username: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                    { bio: { contains: query, mode: 'insensitive' } },
                ],
            };
        }

        // If no 'q' is provided, whereClause remains {} and fetches all users
        const users = await prisma.user.findMany({
            where: whereClause,
            select: {
                id: true,
                username: true,
                bio: true,
                avatar: { select: { url: true } },
                role: true,
            },
            take: 20, // Limit results
            orderBy: {
                username: 'asc' // Order alphabetically
            }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error searching profiles:", error);
        res.status(500).json({ message: 'Server error' });
    }
};