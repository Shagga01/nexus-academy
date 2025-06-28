import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../graphql/apolloClient';

import '../styles/globals.css';  // adjust if your css is elsewhere

export default function App({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}