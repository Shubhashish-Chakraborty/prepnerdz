import { Router } from "express";
import { addCourse, getAllCourses } from "../controllers/courseControllers";
import { requestValidation } from "../middlewares/requestValidation";
import { AdminAuth } from "../middlewares/adminAuthentication";
export const courseRouter = Router();

courseRouter.post('/add' , requestValidation , AdminAuth, addCourse);
courseRouter.get('/', requestValidation , AdminAuth, getAllCourses);