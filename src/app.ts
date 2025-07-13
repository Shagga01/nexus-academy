import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

import adminRoutes from './routes/adminRoutes';
import parentRoutes from './routes/parentRoutes';
import studentRoutes from './routes/studentRoutes';

dotenv.config();
const app = express();
const prisma: PrismaClient = new PrismaClient(); // Explicitly typed

app.use(cors());
app.use(express.json());

// Middleware to attach prisma to the request object
// This relies on src/types/express.d.ts correctly extending the Request interface
app.use((req: Request, res: Response, next: NextFunction) => {
  // Direct assignment. If ESLint still complains about 'any',
  // it means the global declaration isn't fully active for ESLint's parser.
  // The tsconfig.json update below aims to fix this.
  req.prisma = prisma;
  next();
});

app.use('/students', studentRoutes);
app.use('/parents', parentRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Nexus Academy API up & running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown for Prisma.
// The `void` operator ensures that the Promise returned by the async IIFE
// (Immediately Invoked Function Expression) is not treated as a "misused promise"
// by ESLint in contexts where a void return is expected.
process.on('beforeExit', () => {
  void (async () => {
    await prisma.$disconnect();
  })();
});
process.on('SIGINT', () => {
  void (async () => {
    await prisma.$disconnect();
    process.exit(0);
  })();
});
process.on('SIGTERM', () => {
  void (async () => {
    await prisma.$disconnect();
    process.exit(0);
  })();
});
