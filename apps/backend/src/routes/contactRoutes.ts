import { Router } from "express";
import { sendMessageToMail } from "../controllers/contactControllers";

export const ContactRouter = Router();

ContactRouter.post("/", sendMessageToMail);