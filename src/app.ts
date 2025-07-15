import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { authenticateToken } from './middleware/auth';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// ✅ Your custom JWT middleware to set req.user
app.use(authenticateToken);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // ✅ Replaces previous "import { context }"
    context: ({ req }) => {
      return { user: req.user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();