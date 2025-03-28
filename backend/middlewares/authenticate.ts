// backend/middlewares/authenticate.ts
import jwt from 'jsonwebtoken';

export const authenticateUser = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'sk_test_d4ryRpMHLdUPPsQfPifOgdlWYvhGagamjne97C7AUH'); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
