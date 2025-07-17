import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { authMiddleware } from '../middleware/auth'

export function createApolloServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await authMiddleware(req)
      return { user }
    }
  })
}