import { Request, Response } from "express";
import prisma from "../db/prisma";
import { branchValidationSchema } from "../utils/zodSchema";

// Add branch to a course
export const addBranch = async (req: Request, res: Response) => {
    try {

        const result = branchValidationSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { courseId, branchName } = result.data;

        // Check if branch already exists
        const existingBranch = await prisma.branch.findUnique({
            where: {
                branchName: branchName,
                courseId: courseId
            }
        })

        if (existingBranch) {
            res.status(400).json({
                message: "Branch Already Exists!!"
            })
            return;
        }

        const branch = await prisma.branch.create({
            data: {
                branchName,
                course: { connect: { id: courseId } }
            }
        })

        res.status(201).json({
            message: "Branch Added Successfully",
            branch
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}