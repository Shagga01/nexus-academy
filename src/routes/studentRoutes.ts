import express from 'express';
import { getAllStudents } from '../controllers/studentController';

const router = express.Router();

router.get('/', getAllStudents);

export default router;