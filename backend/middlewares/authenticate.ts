// middlewares/authenticate.ts
import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔐 Token:', req.headers.authorization);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user to request
    next(); // ✅ CRUCIAL!
  } catch (err) {
    return res.status(403).json({ message: 'Token invalid' });
  }
};
