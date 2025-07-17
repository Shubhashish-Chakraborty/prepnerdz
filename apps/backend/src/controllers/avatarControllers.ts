import { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../db/prisma';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config';


// Cloudinary Configuration!
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

// Multer configuration
const upload = multer({ storage: multer.memoryStorage() });

export const uploadAvatar = [
    upload.single('image'),
    async (req: Request, res: Response) => {
        try {


            if (!req.file) {
                res.status(400).json({ error: 'No image provided' });
                return
            }

            // Get user ID from authenticated request
            const userId = (req as any).user.id;

            // Convert buffer to base64
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            // Upload to Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
                folder: 'prepnerdz_prod_avatar_uploads'
            });

            // First, deleting any existing avatar for this user 
            await prisma.avatar.deleteMany({
                where: {
                    userId
                }
            });

            // Save to database

            const avatar = await prisma.avatar.create({
                data: {
                    publicId: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url,
                    userId: userId
                }
            });

            // const image = await prisma.avatar.create({
            //     data: {
            //         publicId: cloudinaryResponse.public_id,
            //         url: cloudinaryResponse.secure_url
            //     }
            // });

            res.status(201).json({
                message: 'Image uploaded successfully',
                avatar
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Failed to upload image' });
        }
    }
];


export const getAvatar = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id; // Get from authentication middleware

        const avatar = await prisma.avatar.findFirst({
            where: {
                userId
            } // Only get avatar for this user
        });

        if (!avatar) {
            res.status(404).json({
                message: 'No avatar found'
            });
            return
        }

        res.json(avatar);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
};

export const deleteAvatar = async (req: Request, res: Response) => {
    try {
        // Get user ID from authenticated request
        const userId = (req as any).user.id;

        // Find the avatar for the user
        const avatar = await prisma.avatar.findFirst({
            where: {
                userId
            }
        });

        // If no avatar exists, return a success message as there's nothing to delete
        if (!avatar) {
            res.status(200).json({ message: 'No avatar to delete.' });
            return
        }

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(avatar.publicId);

        // Delete the avatar from the database
        await prisma.avatar.delete({
            where: {
                id: avatar.id
            }
        });

        res.status(200).json({ message: 'Avatar deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Failed to delete avatar"
        });
        return;
    }
};