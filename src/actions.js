//actions

import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_URL} from './config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken, saveLocalUser, loadAuthToken} from './local-storage';



export const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (name, text) => ({
  type: SEND_MESSAGE,
  name,
  text,
});

export const PLACE_CARD_ON_STACK = 'PLACE_CARD_ON_STACK';
export const placeCardOnStack = (cardType) => ({
  type: PLACE_CARD_ON_STACK,
  cardType,
});

export const USER_BID = 'USER_BID';
export const handleUserBid = (bidAmount) => ({
  type: USER_BID,
  bidAmount,
});

export const LOAD_GAME_STATE = 'LOAD_GAME_STATE';
export const loadGameState = (gameStateObj) => ({
  type: LOAD_GAME_STATE,
  gameStateObj,
});

export const fetchGameState = (gameId) => dispatch => {
  console.log('fetching');
  const authToken = loadAuthToken();
  fetch(API_URL.games + '/' + gameId, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res=> {
    if (!res.ok) {
      console.log('res not ok in fetchGameState');
      return Promise.reject(res.statusText);
    }
    return res.json()
  })
  .then(data=> {
    dispatch(loadGameState(data));
  })
  .catch(err => {
    console.log('error in fetchGameState', err);
  });
}


/**
  *
  * Authorization/Login Actions
  *
  */

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
export const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
};

export function login (username, password, gameId, dispatch) {
  console.log('attempting login');
  dispatch(authRequest());
  return (
    fetch(API_URL.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    // Reject any requests which don't return a 200 status, creating
    // errors which follow a consistent format
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({authToken}) => {
      storeAuthInfo(authToken, dispatch);
      saveAuthToken(authToken);
      saveLocalUser(username);
      dispatch(fetchGameState(gameId));
    })
    .catch(err => {
      const {code} = err;
      const message =
        code === 401
            ? 'Incorrect username or password'
            : 'Unable to login, please try again';
      dispatch(authError(err));
      // Could not authenticate, so return a SubmissionError for Redux
      // Form
      return Promise.reject(
        new SubmissionError({
            _error: message
        })
      );
    })
  );
};

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(API_URL.refresh, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};

/**
  *
  * Setup Game Actions
  *
  */

export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = player => ({
    type: ADD_PLAYER,
    player,
});

export const EDIT_PLAYER = 'EDIT_PLAYER';
export const editPlayer = (player, index) => ({
    type: EDIT_PLAYER,
    player,
    index,
});

export const SET_GAME_ID = 'SET_GAME_ID';
export const setGameId = gameId => ({
    type: SET_GAME_ID,
    gameId,
});

export const createNewGame = (userId) => dispatch => {
  fetch(API_URL.games, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(gameObj => {
      dispatch(setGameId(gameObj.id));
  })
}