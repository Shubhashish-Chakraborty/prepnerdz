import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const getCloudinarySignature = (req: Request, res: Response) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);

        // Get a signature for uploading
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
                folder: 'nerdconnect_attachments',
            },
            process.env.CLOUDINARY_API_SECRET!
        );

        res.status(200).json({
            timestamp,
            signature,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
        });
    } catch (error) {
        console.error('Error getting Cloudinary signature:', error);
        res.status(500).json({ message: 'Server error while getting upload signature' });
    }
};
