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
        const { type, branch, semester, query, page = '1', limit = '5' } = req.query;

        // Validate required parameters
        if (!type || !branch || !semester) {
            res.status(400).json({
                success: false,
                message: 'Resource type, branch, and semester are required'
            });
            return;
        }

        // Convert page and limit to numbers
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Build search parameters
        const searchParams: SearchParams = {
            resourceType: type as 'SHIVANI_BOOKS' | 'MID_SEM_PAPER' | 'END_SEM_PAPER' | 'IMP_QUESTION' | 'NOTES' | 'LAB_MANUAL' | 'SYLLABUS',
            branchId: branch as string,
            semesterId: semester as string,
            query: query as string
        };

        // Build where clause for Prisma
        const where: any = {
            type: searchParams.resourceType,
            subject: {
                semester: {
                    id: searchParams.semesterId,
                    branch: {
                        id: searchParams.branchId
                    }
                }
            }
        };

        // Add search query if provided
        if (searchParams.query) {
            where.title = {
                contains: searchParams.query,
                mode: 'insensitive'
            };
        }

        // Get total count for pagination
        const totalCount = await prisma.resource.count({ where });

        // Get paginated results
        const resources = await prisma.resource.findMany({
            where,
            skip,
            take: limitNum,
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
            total: totalCount,
            page: pageNum,
            limit: limitNum,
            hasMore: skip + limitNum < totalCount,
            message: resources.length > 0
                ? 'Resources found successfully'
                : 'No resources found matching your criteria'
        });
        return

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
        return
    }
};
interface LandingSearchQuery {
    subject?: string;
    semester?: string;
    landingResourceType?: 'SHIVANI_BOOKS' | 'MID_SEM_PAPER' | 'END_SEM_PAPER' | 'IMP_QUESTION' | 'NOTES' | 'LAB_MANUAL' | 'SYLLABUS';
}

export const handleLandingSearch = async (req: Request, res: Response) => {
    try {
        const { subject, semester, landingResourceType }: LandingSearchQuery = req.query;
        const limit = 5; // Limit results to 5 for landing page

        // Validate required parameters
        if (!subject || !semester || !landingResourceType) {
            res.status(400).json({
                success: false,
                message: 'Subject, semester and resource type are required'
            });
            return
        }

        // Convert semester to number and validate
        const semesterNumber = parseInt(semester);
        if (isNaN(semesterNumber)) {
            res.status(400).json({
                success: false,
                message: 'Semester must be a valid number'
            });
            return
        }

        // Find matching resources
        const resources = await prisma.resource.findMany({
            where: {
                type: landingResourceType,
                subject: {
                    subjectName: {
                        contains: subject,
                        mode: 'insensitive'
                    },
                    semester: {
                        semNumber: semesterNumber
                    }
                }
            },
            take: limit,
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
            hasMore: resources.length >= limit,
            message: resources.length > 0
                ? 'Resources found successfully'
                : 'No resources found matching your criteria'
        });
        return

    } catch (error: any) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
        return
    }
};