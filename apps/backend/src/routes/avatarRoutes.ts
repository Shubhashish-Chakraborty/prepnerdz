import { Router } from 'express';
import { deleteAvatar, getAvatar, uploadAvatar } from '../controllers/avatarControllers';
import { UserAuth } from '../middlewares/userAuthentication';
import { requestValidation } from '../middlewares/requestValidation';

export const AvatarRouter = Router();

AvatarRouter.post('/upload', UserAuth, uploadAvatar);
AvatarRouter.get("/get-avatar", UserAuth, getAvatar);
AvatarRouter.delete("/delete-avatar", requestValidation , UserAuth, deleteAvatar);