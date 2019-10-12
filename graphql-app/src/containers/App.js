import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';

import SignIn from '../components/User/SignIn';
import SignOut from '../components/User/Signout';
import ViewPromotionBanner from '../components/Promotion/ViewPromotion';
import ProductsContainer from './Products'; //Handle with router ideally

import './App.css';

/**
 * @todo No time to add PropTypes check
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {

  state = {
    currentView: 'list',
    showSignIn: false,
    user: {
      username: '',
      password: ''
    },
    allCategories: [],
    categoriesSet: false,
    currentProduct: null
  };

  /**
   * To restore user if logged in
   *
   */
  componentDidMount(){
    if(!this.props.token){
      this.props.checkUserState();
    }
  }


  handleSignInButtonClick = () => {
    this.setState((prevState) => ({
      showSignIn: true
    }));
  }

  /**
   * @function handleInputChange Updates state values with Input field value
   * 
   * @argument [String] forField Name of field being changed
   * @todo Validation | Move entire sign in section to separate Auth container
   * 
   */
  handleInputChange = (forField) => (event) => {
    let updatedUser = {
      ...this.state.user
    };
    updatedUser[forField] = event.target.value;
    this.setState({ user: updatedUser });
  }

  /**
   * @function handleSignIn Completes the call to the mutate function with the arguments and then dispatches a Redux action
   *         to update the Redux store with the signed in User. The ROLE value is being used for access control
   * 
   * @argument [Function]  Mutate function provided by react-apollo
   * 
   * @todo Use Apollo-link-state to query Apollo Client Redux cache directly and avoid redundancy of data
   *
   */
  handleSignIn = (login) => {
    login({
      variables: { username: this.state.user.username, password: this.state.user.password }
    }).then((res) => {
      this.props.onUserSignedIn(res.data.login.username, res.data.login.role, res.data.login.token);
      let clearUser = { ...this.state.user };
      clearUser.username = '';
      clearUser.password = '';
      this.setState({
        user: clearUser,
        showSignIn: false
      });
    });
  }

  handleSignOut = () => {
    this.props.onUserSignOut();
  }

  render() {
    return (
      <div className="App">
        <Grid container direction="column" alignItems="center">
          <Grid item style={{ alignSelf: 'stretch', paddingBottom: '1rem' }}>
            <header className="App-header">
              <Typography variant="h2" color="secondary">GraphQL EStore!</Typography>
              {this.props.token ? <SignOut handleSignOut={this.handleSignOut} /> : <Button onClick={this.handleSignInButtonClick} color="secondary" variant="outlined" style={{ alignSelf: 'flex-end' }}>Sign in as Admin</Button>}
            </header>
          </Grid>
          
          {/* Sign In form only visible on Button Click */}
          {this.state.showSignIn ? (
            <Grid item>
              <SignIn user={this.state.user} handleInput={this.handleInputChange} handleSignInSubmit={this.handleSignIn} />
            </Grid>) : null}

          <Grid item xs={12} md={6}>
            <ViewPromotionBanner />
          </Grid>

          <Grid item xs md={8}>
           <ProductsContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.appReducer.username,
    role: state.appReducer.role,
    token: state.appReducer.token,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserSignedIn: (username, role, token) => dispatch({ type: 'USER_LOGIN_SUCCESS', user: { username, role, token } }),
    checkUserState: () => dispatch({ type: 'USER_STATE_LOAD'}),
    onUserSignOut: () => dispatch({type: 'USER_LOGOUT_SUCCESS'}),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
