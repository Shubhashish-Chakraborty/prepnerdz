import { Router } from "express";
import { sendMessageToDB, sendMessageToMail } from "../controllers/contactControllers";

export const ContactRouter = Router();

ContactRouter.post("/", sendMessageToMail);
ContactRouter.post("/to-db", sendMessageToDB);