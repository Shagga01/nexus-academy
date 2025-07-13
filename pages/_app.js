import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../graphql/apolloClient';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const loadScript = (src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      }
    };

    try {
      loadScript('https://js.paystack.co/v1/inline.js');
      loadScript('https://checkout.flutterwave.com/v3.js');
      loadScript(
        'https://www.paypal.com/sdk/js?client-id=AcARXHPsfwU7wFOaCvds4WWoBTqSq8UdRN6WJXgcvXjGcxeC0h6-AngtqbI0RDAknt94MzwT4bKJt-EQ&currency=USD',
      );
    } catch (e) {
      console.error('Error loading payment scripts:', e);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
