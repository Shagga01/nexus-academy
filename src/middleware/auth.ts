// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"

  if (!token) {
    req.user = undefined;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
      req.user = undefined;
      return next();
    }

    // decoded = payload from jwt.sign
    req.user = decoded as { id: string, email: string, role: string };
    next();
  });
}