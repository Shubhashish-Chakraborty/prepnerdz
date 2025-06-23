import { Request, Response } from 'express'
import prisma from '../db/prisma'
import { courseValidationSchema } from '../utils/zodSchema'

// Add a course
export const addCourse = async (req: Request, res: Response) => {
    try {

        // Validating request body using Zod!!!

        const result = courseValidationSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { courseName } = result.data;

        // Check if course already exists
        const existingCourse = await prisma.course.findUnique({
            where: {
                courseName: courseName
            }
        })

        if (existingCourse) {
            res.status(400).json({
                message: "Course Already Exists!!"
            })
            return;
        }

        const course = await prisma.course.create({
            data: {
                courseName
            }
        })

        res.status(201).json({
            message: "Course Added Successfully",
            course
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}

// GET ALL THE COURSES IN THE DB
export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.course.findMany({
            include: { branches: true }
        })
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}