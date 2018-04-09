//otherPlayers
import React from 'react';
import {connect} from 'react-redux';

export function OtherPlayers (props) {
  
  const players = props.players.map(player => {
    return <li>name: {player.name}, handcards: {player.hand.length}, stack: {player.stack.length}</li>
  })

  return (
    <div>
      <ul>
        {players}
      </ul>
    </div>
  )
  
};

OtherPlayers.defaultProps = {
    players: [
      {name: 'player A', hand: [0,0,1], stack: [0]},
      {name: 'player B', hand: [0,0,0], stack: [1]},
      {name: 'player C', hand: [0,0], stack: [0,1]},
    ]
};

const mapStateToProps = state => ({
    players: state.game.players
});

export default connect(mapStateToProps)(OtherPlayers);