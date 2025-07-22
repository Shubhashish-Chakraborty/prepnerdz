import { Router } from 'express';
import { getUsers } from '../controllers/superAdminControllers';
import { requestValidation } from '../middlewares/requestValidation';
import { AdminAuth } from '../middlewares/adminAuthentication';

export const superAdminRouter = Router();

superAdminRouter.get('/getUsers', requestValidation, AdminAuth , getUsers); 