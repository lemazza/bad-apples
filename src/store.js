//store
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {gameReducer} from './gameReducer';
import thunk from 'redux-thunk';
import {setAuthToken, refreshAuthToken, storeAuthInfo} from './actions';
import {loadAuthToken, loadLocalUser} from './local-storage';
import authReducer from './authReducer';
import setupGameReducer from './setupGameReducer';

const store = createStore(
  combineReducers({
    form: formReducer,
    game: gameReducer,
    auth: authReducer,
    setupGame: setupGameReducer,
  }),
  applyMiddleware(thunk)
);


// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
    console.log('you have an authtoken!', token);
    const user = loadLocalUser();
    console.log('you have a user', user);
    storeAuthInfo(token, store.dispatch);
}

export default store;