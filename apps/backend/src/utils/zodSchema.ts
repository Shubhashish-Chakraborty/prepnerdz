import { z } from "zod";

export const signupValidationSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const signinValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const courseValidationSchema = z.object({
    courseName: z.string().min(1, "Course name is required"),
});

export const branchValidationSchema = z.object({
    branchName: z.string().min(1, "Branch name is required"),
    courseId: z.string().min(1, "Course id is required"),
});

export const semesterValidationSchema = z.object({
    semNumber: z.number().int(),
    branchId: z.string().min(1, "Branch id is required"),
});

export const subjectValidationSchema = z.object({
    subjectName: z.string().min(1, "Subject name is required"),
    subjectCode: z.string().min(1, "Subject code is required"),
    semesterId: z.string().min(1, "Semester id is required"),
});

// current Available resources in prepnerdz!
enum ResourceType {
    SHIVANI_BOOKS = "SHIVANI_BOOKS",
    MID_SEM_PAPER = "MID_SEM_PAPER",
    END_SEM_PAPER = "END_SEM_PAPER",
    IMP_QUESTION = "IMP_QUESTION",
    IMP_TOPIC = "IMP_TOPIC",
    NOTES = "NOTES",
    LAB_MANUAL = "LAB_MANUAL",
    SYLLABUS = "SYLLABUS",
}

export const resourceValidationSchema = z.object({
    subjectId: z.string().min(1, "Subject id is required"),
    uploadedById: z.string().min(1, "Uploaded by id is required"),
    type: z.nativeEnum(ResourceType),
    title: z.string().min(1, "Resource title is required"),
    year: z.string().optional(),
    month: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    fileUrl: z.string().min(1, "File url is required"),
    fileSize: z.number().min(1, "File size is required"), // Size in KB
    fileType: z.string().min(1, "File type is required"),
});


// Zod validation schema for attachments
export const attachmentSchema = z.object({
    url: z.string().url(),
    type: z.string(),
});

// Zod validation schema for creating a post
export const createPostSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters long'),
    content: z.string().min(10, 'Content must be at least 10 characters long'),
    isAnonymous: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    attachments: z.array(attachmentSchema).optional(), // Validate attachments
});

// Zod validation schema for adding a reply
export const addReplySchema = z.object({
    content: z.string().min(1, 'Reply content cannot be empty'),
    attachments: z.array(attachmentSchema).optional(), // Validate attachments
});