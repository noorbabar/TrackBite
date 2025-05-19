import * as express from 'express';
import { authenticateUser } from '../middlewares/authenticate';

const router = express.Router();

router.get('/dashboard', authenticateUser, (req, res) => {
  const userId = (req as any).userId;
  res.json({ message: `Hello user ${userId}` });
});

export default router;
