import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

//Apollo Client 
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';

//Redux Store
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './store/app.reducer';

import CSSBaseline from '@material-ui/core/CssBaseline';

const finalReducer = combineReducers({ appReducer });

const store = createStore(finalReducer);

const errorLink = onError(({ graphQLErrors, networkErrors }) => {
  if (graphQLErrors) {
    console.log(`GraphQLErrors ${graphQLErrors}`);
  } else if (networkErrors) {
    console.log(`N/W Errors ${networkErrors}`);
  }
});

const responseLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.data.login) {
      const { token } = response.data.login;
      if (token) {
        localStorage.setItem('gql-token', token);
      }
    }
    return response;
  });
});

const requestLink = new ApolloLink((operation, forward) => {
  if (localStorage.getItem('gql-token')) {
    operation.setContext({
      headers: {
        auth: localStorage.getItem('gql-token')
      }
    });
  }
  return forward(operation);
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const cache = new InMemoryCache();

let appLinks = ApolloLink.from([errorLink, requestLink, responseLink, httpLink]);

const client = new ApolloClient({
  link: appLinks,
  cache
});

const AppComponent = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <CSSBaseline />
      <App />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(AppComponent, document.getElementById('root'));
