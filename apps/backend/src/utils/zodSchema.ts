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
