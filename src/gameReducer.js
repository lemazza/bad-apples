import * as actions from './actions.js'

const initialState = {
  status: 'Waiting',
  gameId: 'none',
  round: 0,
  turn: 0,
  startPlayer: 0,
  highBid: 0,
  phase: 'place first card',
  userPlayer: {
    creator: false,
    controller: 'userId here',
    name: 'username here',
    hand: ['goodCard', 'goodCard', 'goodCard', 'badCard'],
    stack: [],
    roundsWon: 0,
    bid: 0,
    tablePosition: -1,
    active: false,
    passed: false,
    loggedIn: false,
  },
  players: [ 
    {
      name: 'player1',
      hand: ['goodCard','goodCard','goodCard','badCard'],
      stack: [],
      roundsWon: 0, 
      bid: '',
      active: false,
      passed: false,
    },
  ],
  chat: [ { text: 'Welcome to the game!' }, {text: 'Waiting to Load'}]

};

export const gameReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.SEND_MESSAGE:
      return Object.assign({}, state, 
        { chat: [...state.chat, { name: action.name, text: action.text, }]}
      );

    case actions.LOAD_GAME_STATE:
      console.log('LOAD_GAME_STATE', action);
      return Object.assign({}, state, action.gameStateObj);

    case actions.PLACE_CARD_ON_STACK:
      const currentPlayer = state.players[action.playerIndex];
      (action.cardType)? currentPlayer.hand.pop() : currentPlayer.hand.shift();
      const newHand = currentPlayer.hand;
      const newStack = [...currentPlayer.stack, action.cardType];
      const updatedPlayer = Object.assign({}, currentPlayer, {hand: newHand, stack: newStack});
      const updatedPlayers = [...state.players];
      updatedPlayers[action.playerIndex] = updatedPlayer;

      return Object.assign({}, state, 
        { players: updatedPlayers}
      );

    default:
      return state;
  };
};