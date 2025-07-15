// src/graphql/resolvers.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async (_: any, __: any, context: any) => {
      if (!context.user || context.user.role !== 'ADMIN') {
        throw new Error("Unauthorized: Only ADMINs can view all users.");
      }
      return await prisma.user.findMany();
    },

    user: async (_: any, args: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id: args.id },
      });
    },

    me: async (_: any, __: any, context: any) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return await prisma.user.findUnique({
        where: { id: context.user.id },
      });
    },
  },

  Mutation: {
    signup: async (_: any, args: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const user = await prisma.user.create({
        data: {
          email: args.email,
          password: hashedPassword,
          firstName: args.firstName,
          lastName: args.lastName,
          role: args.role ?? "STUDENT",
        },
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      return { token, user };
    },

    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({ where: { email }});
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      return { token, user };
    },

    createCourse: async (_: any, args: any) => {
      return await prisma.course.create({
        data: {
          title: args.title,
          description: args.description,
          price: args.price,
          isPublished: args.isPublished ?? false,
          teacherId: args.teacherId,
        },
      });
    },

    updateCourse: async (_: any, args: any) => {
      return await prisma.course.update({
        where: { id: args.id },
        data: {
          title: args.title,
          description: args.description,
          price: args.price,
          isPublished: args.isPublished,
          teacherId: args.teacherId,
        },
      });
    },

    deleteCourse: async (_: any, { id }: { id: string }) => {
      return await prisma.course.delete({ where: { id } });
    },
  },
};