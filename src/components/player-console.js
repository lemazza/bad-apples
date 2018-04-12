import React from 'react';
import {connect} from 'react-redux';
import Card from './card';

import './player-console.css';

export function PlayerConsole(props) {
  const handState = props.hand.map(card=> {
    return <Card type={card} />
  })

  const stackState = props.stack.map(card=> {
    return <Card type={card} />
  })

  return (
    <div className="player-console">
      <h2>{props.username}</h2>
      <p>Rounds Won: {props.roundsWon}</p>
       <input type='number' min={props.bidMin} max={props.bidMax} step='1' />
      <button>Bid</button>
      <button>Pass</button>

      <div>
        <h2>Your Hand</h2>
         {handState}
      </div>

      <div>
        <h2>Your Stack</h2>
        <p>{props.stack.length}</p>
        {stackState} 
      </div>
    </div>   
  )
};

const mapStateToProps = state => {
  let player = state.game.userPlayer;
  let cardsInStacks = state.game.players.map(x=> x.stack);
  let bidMax = cardsInStacks.reduce((acc, cv) => acc + cv);
  return {
    username: player.name,
    hand: player.hand,
    stack: player.stack,
    roundsWon: player.roundsWon,
    bidMin: state.game.highBid + 1, 
    bidMax: bidMax,
    creator: player.creator,
    active: player.active,
    passed: player.passed,
    loggedIn: player.loggedIn,
  }
};

export default connect(mapStateToProps)(PlayerConsole);