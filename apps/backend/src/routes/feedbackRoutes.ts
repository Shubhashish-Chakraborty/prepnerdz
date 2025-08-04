import { Router } from "express";
import { submitFeedback } from "../controllers/feedbackControllers";

export const FeedbackRouter = Router();

FeedbackRouter.post("/submit", submitFeedback); 