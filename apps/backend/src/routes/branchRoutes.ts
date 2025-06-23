import { Router } from "express";
import { addBranch } from "../controllers/branchControllers";
import { requestValidation } from "../middlewares/requestValidation";
import { AdminAuth } from "../middlewares/adminAuthentication";
export const branchRouter = Router();

branchRouter.post('/add', requestValidation, AdminAuth, addBranch)