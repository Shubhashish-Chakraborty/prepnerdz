import { Router } from "express";
import { addSemester } from "../controllers/semesterControllers";
import { requestValidation } from "../middlewares/requestValidation";
import { AdminAuth } from "../middlewares/adminAuthentication";
export const semesterRouter = Router();

semesterRouter.post('/add' , requestValidation , AdminAuth, addSemester);