import { Router } from "express";
import { logout, session, signin, signup, verify_email } from "../controllers/userControllers";
import { UserAuth } from "../middlewares/userAuthentication";
import { requestValidation } from "../middlewares/requestValidation";

export const UserRouter = Router();

UserRouter.post("/signup" , requestValidation , signup);
UserRouter.post("/signin" , requestValidation , signin);
UserRouter.post("/logout", logout)
UserRouter.post("/verify-mail" , requestValidation , verify_email);
UserRouter.get("/session", UserAuth, session);