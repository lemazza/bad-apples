import React from 'react';
import {connect} from 'react-redux';

import './game-status-display.css'

export function GameStatusDisplay (props) {
  return (
    <div className='game-status-display'>
      <h3>Phase: {props.phase}</h3>
      <div className="row">
        <div className="col">Round: {props.round}</div>
        <div className="col">Turn: {props.activePlayer}</div>
        <div className="col">High Bid: {props.highBid || 'none'}</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  let activeIndex = state.game.playerOrder[state.game.turn];
  return {
    status: state.game.status,
    round: state.game.round,
    phase: state.game.phase,
    turn: state.game.turn,
    gameId: state.game.gameId,
    gameState: state.game,
    highBid: state.game.highBid,
    activePlayer: (state.game.players[activeIndex])? state.game.players[activeIndex].name : '',
  }
};

export default connect(mapStateToProps)(GameStatusDisplay);
