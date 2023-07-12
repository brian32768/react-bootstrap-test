import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client"

const client = new ApolloClient({
    uri: 'http://localhost:4000/api',
    cache: new InMemoryCache(),
    link: createUploadLink({ 
        // See https://www.apollographql.com/docs/apollo-server/v3/data/file-uploads/
        'Apollo-Require-Preflight': 'true',
        uri: 'http://localhost:4000/api', // Defaults to */graphql
    }) 
});

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
