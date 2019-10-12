import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { LOGIN_USER } from '../../graphql/mutations';

const signIn = (props) => {
  return (
    <Mutation 
      mutation={LOGIN_USER}
      >
      {(login) => (
        <Grid container direction="row" spacing={24}>
          <Grid item xs={12} md={4}>
            <TextField value={props.user.username} label="Username" onChange={props.handleInput('username')} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField value={props.user.password} type="password" label="Password" onChange={props.handleInput('password')} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="secondary" onClick={() => props.handleSignInSubmit(login)}>Sign In</Button>
          </Grid>
        </Grid>
      )}
    </Mutation>
  )
};

export default signIn;