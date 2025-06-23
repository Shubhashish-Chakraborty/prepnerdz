import { Request, Response } from "express"
import prisma from "../db/prisma"
import { subjectValidationSchema } from "../utils/zodSchema"

// Add subject to semester
export const addSubject = async (req: Request, res: Response) => {
    try {
        const result = subjectValidationSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { semesterId, subjectName, subjectCode } = result.data;


        // Check if subject code already exists
        const exists = await prisma.subject.findUnique({
            where: {
                subjectCode,
                semesterId
            }
        })

        if (exists) {
            res.status(400).json({ error: "Subject code must be unique" })
            return;
        }

        const subject = await prisma.subject.create({
            data: {
                subjectName,
                subjectCode,
                semester: { connect: { id: semesterId } }
            }
        })

        res.status(201).json({
            message: "Subject Added Successfully",
            subject
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}