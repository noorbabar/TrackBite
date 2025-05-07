// backend/routes/userRoutes.ts
import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticate';
import { getProfile, saveProfile } from '../controllers/userController';

const router = Router();

// Route for getting user profile with authentication
router.get('/profile', authenticateUser, getProfile);

// Route for getting specific user profile with ID (with authentication)
router.get('/profile/:userId', authenticateUser, getProfile);

// Route for saving user profile (with authentication)
router.post('/profile/:userId', authenticateUser, saveProfile);

export default router;