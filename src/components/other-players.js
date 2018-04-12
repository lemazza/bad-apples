//otherPlayers
import React from 'react';
import {connect} from 'react-redux';

import './other-players.css';

export function OtherPlayers (props) {
  
  const players = props.players.map(player => {
    return <li>name: {player.name}, handcards: {player.hand}, stack: {player.stack}, bid: {player.stack}</li>
  })

  return (
    <div className='other-players'>
      <ul>
        {players}
      </ul>
    </div>
  )
};


const mapStateToProps = state => ({
    players: state.game.players
});

export default connect(mapStateToProps)(OtherPlayers);