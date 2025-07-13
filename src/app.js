import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { PrismaClient } from '@prisma/client';
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.use('/students', studentRoutes);
app.use('/parents', parentRoutes);
app.use('/admin', adminRoutes);
app.get('/', (req, res) => {
  res.send('🚀 Nexus Academy API up & running!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
