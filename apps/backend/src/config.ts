import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3001;
export const JWT_USER_SECRET = process.env.JWT_USER_SECRET as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;

export const OTP_SENDERMAIL = process.env.OTP_SENDERMAIL;
export const OTP_MAIL_PASSWORD = process.env.ADMINMAIL_PASSWORD;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;