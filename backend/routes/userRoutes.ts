// backend/routes/userRoutes.ts
import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticate';
import { getProfile } from '../controllers/userController';

const router = Router();

router.get('/profile', authenticateUser, getProfile);

export default router;
