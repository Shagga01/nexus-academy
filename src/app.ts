// src/app.ts
import express from 'express';
// CHANGE START: Import ApolloServer from the correct package and expressMiddleware
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; // Use express4 for Express v4/v5 compatibility
// CHANGE END

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { authenticateToken } from './middleware/auth';
import cors from 'cors'; // Keep this import for the middleware
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

// Initialize Express app
const app = express();

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
// Ensure authenticateToken runs before the GraphQL endpoint if user context is needed there
app.use(authenticateToken); // ✅ Attach decoded JWT to req.user

async function startApolloServer() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    // CHANGE START: Apply Apollo Server middleware using the new @apollo/server/express4 API
    // Note: express.json() and cors are typically applied directly to the GraphQL path
    // when using expressMiddleware, to ensure they run *before* GraphQL processing.
    app.use(
      '/graphql',
      cors<cors.CorsRequest>({
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
        credentials: true,
      }),
      express.json(), // Body parser for JSON
      expressMiddleware(server, {
        context: async ({ req }) => ({ // Context function is now async and receives the request directly
          user: (req as any).user, // Access user directly from the request object
        }),
      })
    );
    // CHANGE END

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`); // GraphQL path is hardcoded in app.use
    });
  } catch (err) {
    console.error('🔥 Failed to start Apollo Server:', err);
  }
}

startApolloServer();