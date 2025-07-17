



// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // ✅ Skip auth for login and register mutations
  const body = req.body?.query || '';


  if (
    body.includes('mutation') &&
    (body.includes('login') || body.includes('register'))
  ) {
    req.user = undefined;
    return next();
  }


  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"


  if (!token) {
    req.user = undefined;
    return next(); // Still pass to resolvers; some might not need auth
  }


  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
      req.user = undefined;
      return next();
    }


    req.user = decoded as { id: string, email: string, role: string };
    next();
  });
}








