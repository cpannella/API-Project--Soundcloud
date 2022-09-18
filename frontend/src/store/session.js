import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SIGNUP = 'session/SIGNUP'

const signUp = (user) => {
  return {
    type: SIGNUP,
    payload: user
  }
}

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
// ------------------------------login
export const login = (user) => async (dispatch) => {
  console.log('this is the login thunk')
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  console.log('this is data from the login thunk', data)//---
  dispatch(setUser(data));
  console.log(response)
  return response;
};


//-----------------------------restoreUser
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};
// ...
//------------------------------------signup user
export const signup = (user) => async (dispatch) => {
  const { username, email, password, firstName, lastName } = user;
  console.log('this is the signup thunk',user)
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      lastName
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

//-----------------------------logout

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


const initialState = { user: null };

const sessionReducer = (state = {user: null}, action) => {
  let newState;
  console.log('this is the reducer working with the state', state)
  switch (action.type) {
    case SET_USER:
      newState = {...state}
      console.log('this is the action', action.payload)
      newState.user = action.payload;
      console.log('this is the newState obj', newState)
      return newState;

    case REMOVE_USER:
      newState = {...state};
      newState.user = null
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
