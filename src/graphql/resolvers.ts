// src/graphql/resolvers.ts
import { PrismaClient } from '@prisma/client'
import { AuthService } from '@/services/auth.service'


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
    register: async (_: any, { email, password, firstName, lastName }) => {
      const user = await AuthService.register(email, password)
      const token = await AuthService.login(email, password)
      // 👇 manually attach the additional info (admin role + name)
      await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName,
          lastName,
          role: 'ADMIN'
        }
      })
      const updatedUser = await prisma.user.findUnique({ where: { id: user.id } })
      return { token, user: updatedUser }
    },


    login: async (_: any, { email, password }) => {
      const token = await AuthService.login(email, password)
      const user = await AuthService.getUserByEmail(email)
      return { token, user }
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
