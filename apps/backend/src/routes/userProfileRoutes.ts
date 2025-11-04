import { Router } from "express";
import { getMentorProfile, getUserProfile, updateUserProfile } from "../controllers/userProfileControllers";
import { UserAuth } from "../middlewares/userAuthentication";

export const profileRouter = Router();

// Public routes, no auth required
profileRouter.get('/user/:username', getUserProfile);
profileRouter.get('/mentor/:username', getMentorProfile);

profileRouter.patch('/user/update', UserAuth, updateUserProfile);