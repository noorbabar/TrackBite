// backend/controllers/userController.ts
import { Request, Response } from 'express';

// Extend the Express Request type
interface AuthenticatedRequest extends Request {
  user?: any; // Replace `any` with your actual User type if known
}
export const getProfile = (req: AuthenticatedRequest, res: Response): void => {
    console.log('📄 Get profile hit', req.user);

  if (!req.user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(req.user);
};
