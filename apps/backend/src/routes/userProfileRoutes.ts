import { Router } from "express";
import { UserAuth } from "../middlewares/userAuthentication";
import { getPublicMentorProfile, getPublicUserProfile, searchProfiles, toggleFollowUser, updateUserProfile } from "../controllers/userProfileControllers";

export const profileRouter = Router();


profileRouter.get('/profile/search', searchProfiles);
profileRouter.post('/profile/follow/:followingId', UserAuth, toggleFollowUser);

profileRouter.get('/user/:username', UserAuth, getPublicUserProfile);
profileRouter.get('/mentor/:username', UserAuth, getPublicMentorProfile);

profileRouter.patch('/user/update', UserAuth, updateUserProfile);