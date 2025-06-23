import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { semesterValidationSchema } from '../utils/zodSchema';

// Add semester to branch
export const addSemester = async (req: Request, res: Response) => {
    try {

        const result = semesterValidationSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { branchId, semNumber } = result.data;

        // Check if semester number already exists for this branch
        const exists = await prisma.semester.findFirst({
            where: {
                branchId,
                semNumber
            }
        })

        if (exists) {
            res.status(400).json({ error: "Semester already exists for this branch" });
            return;
        }

        const semester = await prisma.semester.create({
            data: {
                semNumber,
                branch: { connect: { id: branchId } }
            }
        })

        res.status(201).json({
            message: "Semester Added Successfully",
            semester
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}