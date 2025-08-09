import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3002;
export const JWT_USER_SECRET = process.env.JWT_USER_SECRET || 'dev-secret-key-change-in-production';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret-change-in-production';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
export const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';

export const OTP_SENDERMAIL = process.env.OTP_SENDERMAIL;
export const OTP_MAIL_PASSWORD = process.env.OTP_MAIL_PASSWORD;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
export const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;

// For Avatars!
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;