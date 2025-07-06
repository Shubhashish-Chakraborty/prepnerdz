import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getBranchId = async (req: Request, res: Response) => {
    try {
        const { branchName } = req.query;

        if (!branchName) {
            res.status(400).json({
                message: "Branch name is required in the URL params"
            });
            return;
        }

        const branch = await prisma.branch.findUnique({
            where: {
                branchName: branchName as string
            }
        });

        if (!branch) {
            res.status(404).json({
                success: false,
                message: `Branch Not Found by the name ${branchName}`
            });
            return;
        }

        res.status(200).json({
            message: "Branch Found",
            branchId: branch.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}

export const getSemesterId = async (req: Request, res: Response) => {
    try {
        const { semNumber } = req.query;

        if (!semNumber || isNaN(Number(semNumber))) {
            res.status(400).json({
                message: "Query parameter 'semNumber' is required and must be a valid number."
            });
            return;
        }


        const semester = await prisma.semester.findUnique({
            where: {
                semNumber: Number(semNumber)
            }
        });

        if (!semester) {
            res.status(404).json({
                success: false,
                message: `Semester Not Found by the name ${semNumber}`
            });
            return;
        }

        res.status(200).json({
            message: "Semester Found",
            semesterId: semester.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}