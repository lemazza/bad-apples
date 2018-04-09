//store
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {gameReducer} from './gameReducer';

export default createStore(
  combineReducers({
    form: formReducer,
    game: gameReducer
  })
);