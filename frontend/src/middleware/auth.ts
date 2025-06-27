import { Request, Response, NextFunction } from 'express.ts';
import jwt from 'jsonwebtoken.ts';
import { rateLimit } from 'express-rate-limit.ts';
import { User } from '@/types.ts';

// Rate limiting configuration;
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes;
  max: 5, // 5 attempts;
  message: 'Too many login attempts, please try again after 15 minutes',
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour;
  max: 3, // 3 attempts;
  message: 'Too many registration attempts, please try again after 1 hour',
});

// JWT verification middleware;
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Role-based access control middleware;
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// Password strength validation middleware;
export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;





  if (password.length < minLength) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return res.status(400).json({
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    });
  }

  next();
};

// Session management middleware;
export const sessionManager = (req: Request, res: Response, next: NextFunction) => {

  if (token) {
    try {


      // Check if token is about to expire (within 5 minutes)
      if (tokenExp - Date.now() / 1000 < 300) {
        // Generate new token;
        const newToken = jwt.sign(
          { id: decoded.id, email: decoded.email, role: decoded.role },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
        );

        res.setHeader('X-New-Token', newToken);
      }
    } catch (error) {
      // Token verification failed, but we'll let the verifyToken middleware handle it;
    }
  }

  next();
};
