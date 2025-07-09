import { Router } from "express";
import { forgotPassword, logout, me, passwordReset, session, signin, signup, updateContact, updateUsername, verify_email } from "../controllers/userControllers";
import { UserAuth } from "../middlewares/userAuthentication";
import { requestValidation } from "../middlewares/requestValidation";

export const UserRouter = Router();

UserRouter.post("/signup", requestValidation, signup);
UserRouter.post("/signin", requestValidation, signin);
UserRouter.post("/logout", logout)
UserRouter.post("/verify-mail", requestValidation, verify_email);
UserRouter.post("/send-otp-for-forgot-password", requestValidation, forgotPassword);
UserRouter.post("/reset-password", requestValidation, passwordReset);
UserRouter.get("/session", UserAuth, session);
UserRouter.get("/me", UserAuth, me);

// Dashboard Settings Routes:

UserRouter.put("/update-username", UserAuth, requestValidation, updateUsername);
UserRouter.put("/update-contact", UserAuth, requestValidation, updateContact);