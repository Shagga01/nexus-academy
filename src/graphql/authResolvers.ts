// src/graphql/authResolvers.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Import the getAppSecret function from your utils/index.ts
// IMPORTANT: This ensures APP_SECRET is retrieved AFTER dotenv.config() has run in app.ts
import { getAppSecret } from '../utils'; // Path to your utils folder (which contains index.ts)

// Define the Context interface as expected by this resolver
// This should match the MyContext interface in your main resolvers.ts
interface Context {
  prisma: PrismaClient;
  // user?: { id: string; role: string; email: string }; // Not directly used in auth resolvers, but part of global context
}

const authResolvers = {
  Mutation: {
    async signup(parent: any, args: any, context: Context) {
      // Retrieve the APP_SECRET safely here
      const APP_SECRET = getAppSecret();

      const password = await bcrypt.hash(args.password, 10); // Hash the password
      const user = await context.prisma.user.create({
        data: {
          email: args.email,
          password, // Store the hashed password
          firstName: args.firstName,
          lastName: args.lastName,
          role: args.role || 'STUDENT', // Default to STUDENT if role is not provided
        },
      });

      // Generate a JWT
      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      };
    },

    async login(parent: any, args: any, context: Context) {
      // Retrieve the APP_SECRET safely here
      const APP_SECRET = getAppSecret();

      const user = await context.prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) {
        throw new Error('No user found with that email');
      }

      // Compare provided password with hashed password in the database
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      // Generate a JWT
      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      };
    },
  },
};

export default authResolvers;