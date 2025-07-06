// controllers/searchController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SearchParams {
    resourceType?: 'SHIVANI_BOOKS' | 'MID_SEM_PAPER' | 'END_SEM_PAPER' | 'IMP_QUESTION' | 'NOTES' | 'LAB_MANUAL' | 'SYLLABUS';
    branchId?: string;
    semesterId?: string;
    query?: string;
}

export const handleSearch = async (req: Request, res: Response) => {
    try {
        const { type, branch, semester, query } = req.query;

        // Validate required parameters
        if (!type || !branch || !semester) {
            res.status(400).json({
                success: false,
                message: 'Resource type, branch, and semester are required'
            });
            return;
        }

        // Build search parameters
        const searchParams: SearchParams = {
            resourceType: type as 'SHIVANI_BOOKS' | 'MID_SEM_PAPER' | 'END_SEM_PAPER' | 'IMP_QUESTION' | 'NOTES' | 'LAB_MANUAL' | 'SYLLABUS',
            branchId: branch as string,
            semesterId: semester as string,
            query: query as string
        };

        // Perform search
        const where: any = {
            type: searchParams.resourceType,
            title: searchParams.query ? {
                contains: searchParams.query,
                mode: 'insensitive'
            } : undefined,
            subject: {
                semester: {
                    id: searchParams.semesterId,
                    branch: {
                        id: searchParams.branchId
                    }
                }
            }
        };

        // Clean up undefined filters
        Object.keys(where).forEach(key => where[key] === undefined && delete where[key]);
        if (where.subject) {
            Object.keys(where.subject).forEach(key => where.subject[key] === undefined && delete where.subject[key]);
            if (where.subject.semester) {
                Object.keys(where.subject.semester).forEach(key => where.subject.semester[key] === undefined && delete where.subject.semester[key]);
                if (where.subject.semester.branch) {
                    Object.keys(where.subject.semester.branch).forEach(key => where.subject.semester.branch[key] === undefined && delete where.subject.semester.branch[key]);
                }
            }
        }

        const resources = await prisma.resource.findMany({
            where,
            include: {
                subject: {
                    include: {
                        semester: {
                            include: {
                                branch: true
                            }
                        }
                    }
                },
                uploadedBy: {
                    select: {
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            data: resources,
            message: resources.length > 0
                ? 'Resources found successfully'
                : 'No resources found matching your criteria'
        });
        return;

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
        return;
    }
};