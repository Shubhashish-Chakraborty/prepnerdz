import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../db/prisma';

// Zod validation schemas (assuming they are in a separate file)
const attachmentSchema = z.object({
    url: z.string().url(),
    type: z.string(),
});

const createPostSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters long'),
    content: z.string().min(10, 'Content must be at least 10 characters long'),
    isAnonymous: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    attachments: z.array(attachmentSchema).optional(),
});

const addReplySchema = z.object({
    content: z.string().min(1, 'Reply content cannot be empty'),
    attachments: z.array(attachmentSchema).optional(),
});


export const createPost = async (req: Request, res: Response) => {
    try {
        const result = createPostSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ errors: result.error.flatten().fieldErrors });
            return;
        }

        const { title, content, tags, isAnonymous, attachments } = result.data;
        // Accessing user from your UserAuth middleware
        const userId = (req as any).user.id;

        const post = await prisma.post.create({
            data: {
                title,
                content,
                tags,
                isAnonymous,
                authorId: userId,
                attachments: attachments ? {
                    create: attachments.map(att => ({ url: att.url, type: att.type })),
                } : undefined,
            },
            include: { attachments: true }
        });

        res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: 'Server error while creating post' });
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: { select: { username: true, avatar: { select: { url: true } } } },
                _count: { select: { replies: true, votes: true } },
                attachments: { select: { url: true, type: true } }
            },
        });

        const processedPosts = posts.map(post => ({
            ...post,
            author: post.isAnonymous ? { username: 'Anonymous Nerd' } : post.author,
        }));

        res.status(200).json(processedPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: 'Server error while fetching posts' });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: { select: { username: true, avatar: { select: { url: true } } } },
                attachments: { select: { url: true, type: true } },
                replies: {
                    include: {
                        author: { select: { username: true, avatar: { select: { url: true } } } },
                        attachments: { select: { url: true, type: true } },
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const processedPost = {
            ...post,
            author: post.isAnonymous ? { username: 'Anonymous Nerd' } : post.author,
        };

        res.status(200).json(processedPost);
    } catch (error) {
        console.error(`Error fetching post ${req.params.postId}:`, error);
        res.status(500).json({ message: 'Server error while fetching the post' });
    }
};

export const addReplyToPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const result = addReplySchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({ errors: result.error.flatten().fieldErrors });
            return;
        }

        const { content, attachments } = result.data;
        const userId = (req as any).user.id;

        // Fetch user from DB to check their role, since the token doesn't contain it
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        // --- IMPORTANT: Role-based logic for attachments ---
        if (attachments && attachments.length > 0 && user.role !== 'MENTOR') {
            res.status(403).json({
                message: 'Forbidden: Only mentors are allowed to add attachments to replies.'
            });
            return;
        }

        const reply = await prisma.reply.create({
            data: {
                content,
                authorId: userId,
                postId: postId,
                attachments: attachments ? {
                    create: attachments.map(att => ({ url: att.url, type: att.type })),
                } : undefined,
            },
            include: { attachments: true }
        });

        res.status(201).json(reply);
    } catch (error) {
        console.error(`Error adding reply to post ${req.params.postId}:`, error);
        res.status(500).json({ message: 'Server error while adding reply' });
    }
};

export const toggleDoubtCleared = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = (req as any).user.id;

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        if (post.authorId !== userId) {
            res.status(403).json({ message: "Forbidden: You are not the author of this post." });
            return;
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { doubtCleared: !post.doubtCleared },
        });

        res.status(200).json(updatedPost);

    } catch (error) {
        console.error(`Error toggling doubt status for post ${req.params.postId}:`, error);
        res.status(500).json({ message: 'Server error while updating post' });
    }
}
