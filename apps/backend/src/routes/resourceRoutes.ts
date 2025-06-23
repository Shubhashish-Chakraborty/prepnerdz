import { Router } from "express";
import { addResource } from "../controllers/resourceControllers";
import { AdminAuth } from "../middlewares/adminAuthentication";
import { requestValidation } from "../middlewares/requestValidation";
export const resourceRouter = Router();

resourceRouter.post('/add' , requestValidation , AdminAuth, addResource)