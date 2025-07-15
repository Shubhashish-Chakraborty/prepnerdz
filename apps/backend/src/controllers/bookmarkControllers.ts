import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface BookmarkRequest {
    userId: string;
    resourceId: string;
}

// Add bookmark
export const addBookmark = async (req: Request, res: Response) => {
    try {
        const { userId, resourceId }: BookmarkRequest = req.body;

        // Check if bookmark already exists
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                userId,
                resourceId
            }
        });

        if (existingBookmark) {
            res.status(400).json({
                success: false,
                message: 'Resource already bookmarked'
            });
            return;
        }

        // Create new bookmark
        const bookmark = await prisma.bookmark.create({
            data: {
                userId,
                resourceId
            },
            include: {
                resource: true
            }
        });

        res.status(201).json({
            success: true,
            data: bookmark,
            message: 'Resource bookmarked successfully'
        });

    } catch (error) {
        console.error('Error adding bookmark:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to bookmark resource'
        });
        return;
    }
};

// Remove bookmark
export const removeBookmark = async (req: Request, res: Response) => {
    try {
        const { userId, resourceId }: BookmarkRequest = req.body;

        const bookmark = await prisma.bookmark.findFirst({
            where: {
                userId,
                resourceId
            }
        });

        if (!bookmark) {
            res.status(404).json({
                success: false,
                message: 'Bookmark not found'
            });
            return;
        }

        await prisma.bookmark.delete({
            where: {
                id: bookmark.id
            }
        });

        res.status(200).json({
            success: true,
            message: 'Bookmark removed successfully'
        });

    } catch (error) {
        console.error('Error removing bookmark:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove bookmark'
        });
        return;
    }
};

// Get user bookmarks
export const getUserBookmarks = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId
            },
            include: {
                resource: {
                    include: {
                        subject: {
                            include: {
                                semester: {
                                    include: {
                                        branch: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            data: bookmarks,
            count: bookmarks.length
        });

    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookmarks'
        });
        return;
    }
};