// src/services/auth.service.ts
import jwt from 'jsonwebtoken'
import { hashPassword, verifyPassword } from '@/lib/hash'
import { PrismaClient, User } from '@prisma/client'


const prisma = new PrismaClient()


const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = '7d'


if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in the environment variables')
}


export class AuthService {
  static async register(email: string, password: string): Promise<User> {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw new Error('User already exists')
    }


    const hashed = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, password: hashed },
    })


    return user
  }


  static async login(email: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error('Invalid credentials')
    }


    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }


    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })


    return token
  }


  static async getUserByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new Error('User not found')
    return user
  }


  static verifyToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string }
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}
