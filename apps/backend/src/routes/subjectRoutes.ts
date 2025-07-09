import { Router } from "express";
import { addSubject, getAllSubjects } from "../controllers/subjectControllers";
import { AdminAuth } from "../middlewares/adminAuthentication";
import { requestValidation } from "../middlewares/requestValidation";
export const subjectRouter = Router();

subjectRouter.post('/add' , requestValidation , AdminAuth, addSubject);
subjectRouter.get('/all', getAllSubjects);