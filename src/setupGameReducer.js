//setupGameReducer

import {
    ADD_PLAYER,
    EDIT_PLAYER,
    SET_GAME_ID,
} from './actions';

const initialState = {
    players: [],
    gameId: '',
    numberHumans: 1,
    numberBots: 0,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return Object.assign({}, state, {players: [...state.players, action.player]})

    case EDIT_PLAYER:
      let newPlayers = state.players.map((player, index)=> {
        if (index !== action.index) {
          return player;
        }
        return Object.assign({}, player, action.player)
      })
      return Object.assign({}, state, {players: newPlayers});

    case SET_GAME_ID:
      return Object.assign({}, state, {gameId: action.gameId});

    default:
      return state;
  }
}