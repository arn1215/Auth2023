// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_GOOGLE_USER = 'session/setGoogleUser';
const SET_GITHUB_USER = 'session/setGithubUser';


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

export const login = (user) => async (dispatch) => {

  // const response = await csrfFetch('/api/session', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     user
  //   }),
  // });
  // const data = await response.json();
  dispatch(setUser(user));
  // return response;
};


export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};



const setGoogleUser = (user) => {
  return {
    type: SET_GOOGLE_USER,
    payload: user,
  };
};

const setGithubUser = (user) => {
  return {
    type: SET_GITHUB_USER,
    payload: user,
  };
};

export const loginWithGoogle = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/google', { mode: 'no-cors' });
    const data = await response.json();
    dispatch(setGoogleUser(data.user));
    return response;
  } catch (error) {
    console.error('Error during Google authentication:', error);
  }
};

export const loginWithGithub = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/github');
    const data = await response.json();
    dispatch(setGithubUser(data.user));
    return response;
  } catch (error) {
    console.error('Error during GitHub authentication:', error);
  }
};




















const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
    case SET_GOOGLE_USER:
    case SET_GITHUB_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};


export default sessionReducer;