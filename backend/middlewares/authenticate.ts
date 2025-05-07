// backend/middlewares/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request type to include userId
interface UserRequest extends Request {
  userId?: string;
}

export const authenticateUser = (req: UserRequest, res: Response, next: NextFunction): void => {
  // Get the auth header
  const authHeader = req.headers.authorization;
  
  // Check if no auth header
  if (!authHeader) {
    res.status(401).json({ message: 'No authorization header provided' });
    return;
  }

  try {
    // If using Clerk authentication
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      // For Clerk tokens, we can verify with your Clerk public key
      // or simply extract the user ID from the request parameters for now
      // as Clerk has already verified the token on the frontend
      
      // If userId is in params, we'll use that (for profile/:userId routes)
      const userId = req.params.userId || extractUserIdFromToken(token);
      
      if (!userId) {
        res.status(401).json({ message: 'Invalid user ID' });
        return;
      }
      
      req.userId = userId;
      next();
    } else {
      res.status(401).json({ message: 'Invalid authorization format' });
      return;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed' });
    return;
  }
};

// Helper function to extract user ID from token
// This implementation depends on your token format
function extractUserIdFromToken(token: string): string | undefined {
  try {
    // For demonstration - this will need to be adapted based on your actual token structure
    // If using Clerk, they provide methods to validate and extract user info
    
    // Simple JWT decode (not verification) to extract payload
    // In production, use proper verification with your secret key
    const decoded = jwt.decode(token);
    
    if (decoded && typeof decoded === 'object' && 'sub' in decoded) {
      return decoded.sub as string;
    }
    
    return undefined;
  } catch (error) {
    console.error('Error extracting user ID:', error);
    return undefined;
  }
}