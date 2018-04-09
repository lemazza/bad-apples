//game
import React from 'react';
import OtherPlayers from '../components/other-players';
import PlayerConsole from '../components/player-console';
import Chat from '../components/chat';
import {connect} from 'react-redux';

export function Game(props) {
  return (
    <div>
      <div className='game-state'>
        <ul>
          <li>Round: {props.round}</li>
          <li>Phase: {props.phase}</li>
          <li>Turn: {props.turn}</li>
          <li>High Bid: {props.highBid || 'none'}</li>
        </ul>
      </div>

      <OtherPlayers />
      <PlayerConsole />
      <Chat />
    </div>
  )
}

const mapStateToProps = state => ({
    round: state.game.round,
    phase: state.game.phase,
    turn: state.game.turn,
});

export default connect(mapStateToProps)(Game);