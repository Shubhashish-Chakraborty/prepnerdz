import { Router } from "express";
import { getBranchId, getSemesterId } from "../controllers/getMyIdControllers";

export const getMyIdRouter = Router();

getMyIdRouter.get("/branchid" , getBranchId);
getMyIdRouter.get("/semesterid" , getSemesterId);