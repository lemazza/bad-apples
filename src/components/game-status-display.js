import React from 'react';
import {connect} from 'react-redux';

import './game-status-display.css'

export function GameStatusDisplay (props) {
  return (
    <div className='game-status-display'>
      <h3>{props.status}</h3>
      <ul>
        <li>GameId: {props.gameId}</li>
        <li>Round: {props.round}</li>
        <li>Phase: {props.phase}</li>
        <li>Turn: {props.turn}</li>
        <li>High Bid: {props.highBid || 'none'}</li>
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  status: state.game.status,
  round: state.game.round,
  phase: state.game.phase,
  turn: state.game.turn,
  gameId: state.game.gameId,
  gameState: state.game,
  highBid: state.game.highBid,
});

export default connect(mapStateToProps)(GameStatusDisplay);
