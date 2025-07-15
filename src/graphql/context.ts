// src/graphql/context.ts
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();

export interface MyContext {
  prisma: PrismaClient;
  user?: {
    id: string;
    role: string;
    email: string;
  };
  isOwner?: boolean; // NEW: strictly for your hidden resolvers
}

export const context = ({ req }: { req: Request }): MyContext => {
  const user = (req as any).user; // loaded by middleware/auth.ts

  // NEW: get X-OWNER-SECRET from headers, compare with your OWNER_SECRET in .env
  const ownerSecret = req.headers['x-owner-secret'];
  const isOwner = ownerSecret === process.env.OWNER_SECRET;

  return {
    prisma,
    user,
    isOwner
  };
};