import { Request, Response } from 'express';
import prisma from '../db/prisma';

export const getUsers = async (req:Request, res:Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
}