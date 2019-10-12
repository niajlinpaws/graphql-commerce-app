import React from 'react';
import { Button } from '@material-ui/core';
import { ApolloConsumer } from 'react-apollo';

const signout = (props) => (
  <ApolloConsumer>
    {(client) => <Button variant="contained" color="default" onClick={() => {
      props.handleSignOut();
      client.resetStore();
    }} style={{ alignSelf: 'flex-end' }}>Signout</Button>}
  </ApolloConsumer>
);

export default signout;
