import { Router } from "express";
import { UserAuth } from "../../middlewares/userAuthentication";
import { applyForMentorship, getMyMentorProfile, updateMyMentorProfile } from "../../controllers/nerdconnect/mentorControllers";
import { MentorAuth } from "../../middlewares/mentorAuthentication";


export const mentorRouter = Router();

// Apply is for any logged-in user
mentorRouter.post('/apply', UserAuth, applyForMentorship);

// Profile management is for Mentors only
mentorRouter.get('/my-profile', UserAuth, MentorAuth, getMyMentorProfile);
mentorRouter.patch('/my-profile', UserAuth, MentorAuth, updateMyMentorProfile);