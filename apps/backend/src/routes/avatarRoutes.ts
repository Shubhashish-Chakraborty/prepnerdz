import { Router } from 'express';
import { getAvatar, uploadAvatar } from '../controllers/avatarControllers';
import { UserAuth } from '../middlewares/userAuthentication';

export const AvatarRouter = Router();

AvatarRouter.post('/upload', UserAuth, uploadAvatar);
AvatarRouter.get("/get-avatar", UserAuth, getAvatar)