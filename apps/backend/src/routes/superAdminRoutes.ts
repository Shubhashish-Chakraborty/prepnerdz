import { Router } from 'express';
import { getUsers, updateUserByAdmin, deleteUserByAdmin, getUploadsByAdmins, updateUploadByAdmin, deleteUploadByAdmin, getMentorApplications, reviewMentorApplication, assignMentor, unassignMentor } from '../controllers/superAdminControllers';
import { requestValidation } from '../middlewares/requestValidation';
import { AdminAuth } from '../middlewares/adminAuthentication';
import { UserAuth } from '../middlewares/userAuthentication';

export const superAdminRouter = Router();

// Users
superAdminRouter.get('/getUsers', requestValidation, AdminAuth , getUsers);
superAdminRouter.put('/user/:id', requestValidation, AdminAuth, updateUserByAdmin);
superAdminRouter.delete('/user/:id', requestValidation, AdminAuth, deleteUserByAdmin);

// Uploads / resources by admins
superAdminRouter.get('/uploads', requestValidation, AdminAuth, getUploadsByAdmins);
superAdminRouter.put('/upload/:id', requestValidation, AdminAuth, updateUploadByAdmin);
superAdminRouter.delete('/upload/:id', requestValidation, AdminAuth, deleteUploadByAdmin);

// nerdconnect/mentor specific:
superAdminRouter.get('/mentor-applications', AdminAuth, getMentorApplications);
superAdminRouter.patch('/review-application/:appId', AdminAuth, reviewMentorApplication);
superAdminRouter.post('/assign-mentor', AdminAuth, assignMentor);
superAdminRouter.post('/unassign-mentor', AdminAuth, unassignMentor);