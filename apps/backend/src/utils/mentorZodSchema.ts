import { z } from "zod";

export const updateUserSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").optional(),
    contactNumber: z.string().optional(),
    bio: z.string().optional(),
    socials: z.object({
        linkedin: z.string().url().optional().or(z.literal('')),
        github: z.string().url().optional().or(z.literal('')),
        website: z.string().url().optional().or(z.literal('')),
    }).optional(),
});