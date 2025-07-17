// src/graphql/resolvers.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()


export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.user) throw new Error("Not authenticated")


      return await prisma.user.findUnique({
        where: { id: context.user.id },
      })
    },


    courses: async () => {
      return await prisma.course.findMany({
        include: { teacher: true }
      })
    },


    course: async (_: any, { id }: { id: string }) => {
      return await prisma.course.findUnique({
        where: { id },
        include: { teacher: true }
      })
    },


    alphaOwnerData: async (_: any, { secretKey }: { secretKey: string }) => {
      if (secretKey !== process.env.OWNER_SECRET_KEY) {
        throw new Error("Unauthorized master access.")
      }
      const totalUsers = await prisma.user.count()
      const totalCourses = await prisma.course.count()
      return {
        masterOverride: true,
        message: "Diamond-grade access granted",
        totalUsers,
        totalCourses
      }
    },
  },


  Mutation: {
    register: async (_: any, args: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 10)
      await prisma.user.create({
        data: {
          email: args.email,
          password: hashedPassword,
          firstName: args.firstName,
          lastName: args.lastName,
          role: 'ADMIN'
        }
      })
      return "Registration successful"
    },


    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({ where: { email }})
      if (!user) throw new Error("User not found")


      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw new Error("Invalid password")


      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      )


      return { token, user } // ✅ now returns AuthPayload
    },


    createCourse: async (_: any, args: any, context: any) => {
      if (!context.user || context.user.role !== "TEACHER") {
        throw new Error("Only teachers can create courses")
      }


      return await prisma.course.create({
        data: {
          title: args.title,
          description: args.description,
          price: args.price,
          isPublished: args.isPublished ?? false,
          teacherId: context.user.id
        }
      })
    },


    enroll: async (_: any, { courseId }: any, context: any) => {
      if (!context.user) throw new Error("Not authenticated")
      return await prisma.enrollment.create({
        data: {
          studentId: context.user.id,
          courseId
        }
      })
    },
  }
}
