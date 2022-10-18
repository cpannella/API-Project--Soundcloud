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

  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();

  dispatch(setUser(data));

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

  switch (action.type) {
    case SET_USER:
      newState = {...state}
      newState.user = action.payload;

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
