import { Router } from "express";
import { getMentorProfile, getUserProfile } from "../controllers/userProfileControllers";

export const profileRouter = Router();

// Public routes, no auth required
profileRouter.get('/user/:username', getUserProfile);
profileRouter.get('/mentor/:username', getMentorProfile);