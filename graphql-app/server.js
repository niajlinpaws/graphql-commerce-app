import 'isomorphic-fetch';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  ApolloProvider,
  getDataFromTree,
} from 'react-apollo';
import Html from './Html';
import App from './src/containers/App';

console.log(`In server js`);
const app = express();

app.use(express.static(path.resolve(__dirname, '../build'), { index: false }));

app.use(async (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: 'http://localhost:4000',
    }),
    cache: new InMemoryCache(),
  });
  const app = (
    <ApolloProvider client={client}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>
    </ApolloProvider>
  );
  // Executes all graphql queries for the current state of application
  //await getDataFromTree(app);
  // Extracts apollo client cache 
  const state = client.extract();
  const content = ReactDOMServer.renderToStaticMarkup(app);
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html content={content} helmet={helmet} state={state} />,
  );
  res.status(200);
  res.send(`<!doctype html>${html}`);
  res.end();
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Server listening on ${port} port`);
});