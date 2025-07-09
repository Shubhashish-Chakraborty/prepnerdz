// routes/searchRoutes.ts
import { Router } from 'express';
import { handleLandingSearch, handleSearch } from '../controllers/searchControllers';

export const searchRouter = Router();

searchRouter.get('/', handleSearch); // Later add userauth, in prod
searchRouter.get('/landing', handleLandingSearch); // Later add userauth, in prod