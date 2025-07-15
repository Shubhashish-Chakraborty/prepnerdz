import { Router } from 'express';
import { addBookmark, getUserBookmarks, removeBookmark } from '../controllers/bookmarkControllers';

export const bookmarkRouter = Router();

// Add bookmark
bookmarkRouter.post('/', addBookmark);

// Remove bookmark
bookmarkRouter.delete('/', removeBookmark);

// Get user bookmarks
bookmarkRouter.get('/user/:userId', getUserBookmarks);