import { ApolloClient, InMemoryCache } from '@apollo/client';

export function useApollo() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', // your GraphQL server endpoint
    cache: new InMemoryCache(),
  });
  return client;
}