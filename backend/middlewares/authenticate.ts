import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@clerk/clerk-sdk-node';

interface UserRequest extends Request {
  userId?: string;
}

export const authenticateUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No or invalid authorization header' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];

    const verifiedToken = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
      audience: process.env.VITE_CLERK_PUBLISHABLE_KEY!,
    });

    if (!verifiedToken) {
      res.status(401).json({ message: 'Token verification failed' });
      return;
    }

    req.userId = verifiedToken.sub;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed' });
    return;
  }
};
