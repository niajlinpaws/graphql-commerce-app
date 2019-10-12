const initialState = {
  username: '',
  role: '',
  token: null,
  currency: '$'
};

const appReducer = (state = initialState, action) => {
  switch(action.type){
    case 'USER_LOGIN_SUCCESS':
      // Storing user state in localStorage to persist between page refresh
      // Normally would make a call to API to reauthenticate user with token only
      // and check session to confirm user can stay active
      if(localStorage.getItem('gql-token') && !localStorage.getItem('gql-role')){
        localStorage.setItem('gql-username', action.user.username);
        localStorage.setItem('gql-role', action.user.role)
      }
      return {
        ...state,
        username: action.user.username,
        role: action.user.role,
        token: action.user.token
      };
    case 'USER_LOGOUT_SUCCESS':
      localStorage.removeItem('gql-username');
      localStorage.removeItem('gql-role');
      return {
        ...state,
        username: '',
        role: '',
        token: null
      };
    case 'USER_STATE_LOAD': 
    //To handle page refresh persistence of user session
      if(localStorage.getItem('gql-token') && localStorage.getItem('gql-role')){
        return {
          ...state,
          username: localStorage.getItem('gql-username'),
          role: localStorage.getItem('gql-role'),
          token: localStorage.getItem('gql-token')
        }
      }else{
        return state;
      }
    case 'CURRENCY_UPDATE':
      return {
        ...state,
        currency: action.currency
      };
    default: return state;
  }
}

export default appReducer;