// src/server.ts
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { gql } from 'graphql-tag';


// Define your GraphQL type definitions
const typeDefs = gql`
  type Query {
    hello: String
  }
`;


// Define resolvers for your schema
const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo Server v4!',
  },
};


// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });


async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);


  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });


  await server.start();


  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
  );


  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}


startApolloServer();
