<<<<<<< HEAD:react-graphql/apollo-client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
=======
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
>>>>>>> refs/remotes/origin/master:react-graphql/client/src/index.js
