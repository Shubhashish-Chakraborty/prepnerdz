import { Router } from 'express';
import { getUsers, updateUserByAdmin, deleteUserByAdmin, getUploadsByAdmins, updateUploadByAdmin, deleteUploadByAdmin } from '../controllers/superAdminControllers';
import { requestValidation } from '../middlewares/requestValidation';
import { AdminAuth } from '../middlewares/adminAuthentication';

export const superAdminRouter = Router();

// Users
superAdminRouter.get('/getUsers', requestValidation, AdminAuth , getUsers);
superAdminRouter.put('/user/:id', requestValidation, AdminAuth, updateUserByAdmin);
superAdminRouter.delete('/user/:id', requestValidation, AdminAuth, deleteUserByAdmin);

// Uploads / resources by admins
superAdminRouter.get('/uploads', requestValidation, AdminAuth, getUploadsByAdmins);
superAdminRouter.put('/upload/:id', requestValidation, AdminAuth, updateUploadByAdmin);
superAdminRouter.delete('/upload/:id', requestValidation, AdminAuth, deleteUploadByAdmin);