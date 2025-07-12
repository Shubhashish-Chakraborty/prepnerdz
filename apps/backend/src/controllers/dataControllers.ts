import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCourses = async () => {
    return await prisma.course.findMany({
        select: {
            id: true,
            courseName: true
        }
    });
};

export const getBranchesByCourse = async (courseId: string) => {
    return await prisma.branch.findMany({
        where: { courseId },
        select: {
            id: true,
            branchName: true
        }
    });
};

export const getSemestersByBranch = async (branchId: string) => {
    return await prisma.semester.findMany({
        where: { branchId },
        select: {
            id: true,
            semNumber: true
        }
    });
};

export const getSubjectsBySemester = async (semesterId: string) => {
    return await prisma.subject.findMany({
        where: { semesterId },
        select: {
            id: true,
            subjectName: true,
            subjectCode: true
        }
    });
};