import { Router } from 'express';

import {
    getAllCourses,
    getBranchesByCourse,
    getSemestersByBranch,
    getSubjectsBySemester
} from '../controllers/dataControllers';
import { AdminAuth } from '../middlewares/adminAuthentication';

export const dataRouter = Router();

dataRouter.get('/courses', AdminAuth, async (req, res) => {
    try {
        const courses = await getAllCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

dataRouter.get('/branches/:courseId', AdminAuth, async (req, res) => {
    try {
        const branches = await getBranchesByCourse(req.params.courseId);
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch branches' });
    }
});

dataRouter.get('/semesters/:branchId', AdminAuth, async (req, res) => {
    try {
        const semesters = await getSemestersByBranch(req.params.branchId);
        res.json(semesters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch semesters' });
    }
});

dataRouter.get('/subjects/:semesterId', AdminAuth, async (req, res) => {
    try {
        const subjects = await getSubjectsBySemester(req.params.semesterId);
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subjects' });
    }
});