import * as actions from './actions.js'

const initialState = {
  round: 1,
  turn: 0,
  highBid: 0,
  phase: 'place first card',
  players: [ 
    {
      name: 'player1',
      hand: [0,0,0,1],
      stack: [],
      roundsWon: 0, 
      bid: '',
      active: true,
      passed: false,
    },
    {
      name: 'player2',
      hand: [0,0,0,1],
      stack: [],
      roundsWon: 0,
      bid: '',
      active: true,
      passed: false,
    },
    {
      name: 'player3',
      hand: [0,0,0,1],
      stack: [],
      roundsWon: 0,
      bid: '',
      active: true,
      passed: false,
    }
  ],
  chat: [ { text: 'Welcome to the game!' } ]

};

export const gameReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.SEND_MESSAGE:
      return Object.assign({}, state, 
        { chat: [...state.chat, { name: action.name, text: action.text, }]}
      );

    case actions.PLACE_CARD_ON_STACK:
      const currentPlayer = state.players[action.playerIndex];
      console.log('cardType', action.cardType)
      const slicer = (action.cardType)? currentPlayer.hand.pop() : currentPlayer.hand.shift();
      const newHand = currentPlayer.hand;
      console.log('current hand, slicer, newhand', currentPlayer.hand, slicer, newHand)
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