import { z } from "zod";

export const attachmentSchema = z.object({
    url: z.string().url(),
    type: z.string(),
});

export const createPostSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters long'),
    content: z.string().min(10, 'Content must be at least 10 characters long'),
    isAnonymous: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    attachments: z.array(attachmentSchema).optional(),
});

export const addReplySchema = z.object({
    content: z.string().min(1, 'Reply content cannot be empty'),
    attachments: z.array(attachmentSchema).optional(),
});