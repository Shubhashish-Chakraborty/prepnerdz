import { Router } from 'express';
import { 
    createPost, 
    getAllPosts, 
    getPostById, 
    addReplyToPost,
    toggleDoubtCleared 
} from '../../controllers/nerdconnect/postControllers';
import { UserAuth } from '../../middlewares/userAuthentication'; // Adjust the import path for your middleware
import { requestValidation } from '../../middlewares/requestValidation';

export const PostRouter = Router();

// Public routes
PostRouter.get('/', requestValidation , getAllPosts);
PostRouter.get('/:postId', requestValidation , getPostById);

// Protected routes - User must be logged in
PostRouter.post('/', UserAuth, createPost);
PostRouter.post('/:postId/replies', UserAuth, addReplyToPost);
PostRouter.patch('/:postId/toggle-cleared', UserAuth, toggleDoubtCleared);