import { Request, Response } from "express"
import prisma from "../db/prisma"
import { resourceValidationSchema } from "../utils/zodSchema"
import { ResourceType } from "@prisma/client";

// Add resource to subject
export const addResource = async (req: Request, res: Response) => {
    try {
        const result = resourceValidationSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const {
            subjectId,
            uploadedById,
            type,
            title,
            year,
            month,
            description,
            fileUrl,
            fileSize,
            fileType
        } = result.data;


        // Validate year for exam papers
        // if (['MID_SEM_PAPER', 'END_SEM_PAPER'].includes(type) && !year) {
        //     res.status(400).json({ error: "Year is required for exam papers" })
        //     return;
        // }

        const subjectExists = await prisma.subject.findUnique({
            where: {
                id: subjectId
            }
        })

        if (!subjectExists) {
            res.status(400).json({ error: "Subject does not exist" });
            return;
        }


        const resource = await prisma.resource.create({
            data: {
                type,
                title,
                year: year,
                month: month,
                description: description,
                fileUrl,
                fileSize: fileSize,
                fileType: fileType,
                subject: { connect: { id: subjectId } },
                uploadedBy: { connect: { id: uploadedById } }
            }
        })

        res.status(201).json(resource)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}

// get all resources by type!
export const getAllResourcesByType = async (req: Request, res: Response) => {
    const { type } = req.query;

    // Check if the type is one of the enum values
    if (!Object.values(ResourceType).includes(type as ResourceType)) {
        res.status(400).json({ error: "Invalid resource type" });
        return;
    }

    try {
        const resources = await prisma.resource.findMany({
            where: {
                type: type as ResourceType
            }
        })

        res.status(200).json(resources)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}

