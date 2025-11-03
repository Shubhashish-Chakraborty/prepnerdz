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
        
        // Check if a subject with same code or name exists in this semester
        const existingSubject = await prisma.subject.findFirst({
            where: {
                semesterId,
                OR: [
                    { subjectCode: subjectCode },
                    { subjectName: subjectName }
                ]
            }
        });

        // const exists = await prisma.subject.findUnique({
        //     where: {
        //         subjectCode,
        //         semesterId
        //     }
        // })

        if (existingSubject) {
            // res.status(400).json({ error: "Subject code must be unique" })
            res.status(400).json({ error: "Subject with same name or code already exists in this semester" })
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

export const getAllSubjects = async (req: Request, res: Response) => {
    try {
        const subjects = await prisma.subject.findMany({
            select: {
                subjectName: true,
            },
        });

        // Returning only array of subject names!!
        const subjectNames = subjects.map(subject => subject.subjectName);

        res.status(200).json(subjectNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later",
        });
        return
    }
};