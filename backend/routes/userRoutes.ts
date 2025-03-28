// backend/routes/userRoutes.ts
import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticate';

const router = Router();

// Protected route to fetch user data
router.get('/user', authenticateUser, (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
