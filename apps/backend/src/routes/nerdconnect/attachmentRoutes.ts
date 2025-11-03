import { Router } from "express";
import { getCloudinarySignature } from "../../controllers/nerdconnect/attachmentControllers";
import { UserAuth } from "../../middlewares/userAuthentication";

export const attachmentRouter = Router();

// This route is protected. Only logged-in users can get a signature to upload.
attachmentRouter.get('/signature', UserAuth, getCloudinarySignature);