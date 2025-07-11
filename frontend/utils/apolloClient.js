import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error([GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path});
    });
  }
  if (networkError) {
    console.error([Network error]: ${networkError});
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // your federated GraphQL gateway URL
  credentials: "include"
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;