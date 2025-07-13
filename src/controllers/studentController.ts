import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllStudents(req: Request, res: Response) {
    try {
        const students = await prisma.students.findMany({
            include: { parents: true, fees: true, academic_records: true }
        });
        res.json({ count: students.length, students });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch students" });
    }
}