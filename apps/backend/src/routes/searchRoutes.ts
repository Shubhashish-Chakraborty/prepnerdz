// routes/searchRoutes.ts
import { Router } from 'express';
import { handleSearch } from '../controllers/searchControllers';

export const searchRouter = Router();

searchRouter.get('/', handleSearch); // Later add userauth, in prod