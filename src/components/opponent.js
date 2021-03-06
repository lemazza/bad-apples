//opponent
import React from 'react';

import './opponent.css';

export function Opponent (props) {
  if(!props.player) {
    return (null);
  }
  function displayCardBacks() {
    let cardArray = []
    for(let i = 0; i < props.player.hand; i ++) {
      cardArray.push(
        <div className="opp-card-back">
        </div>
      )
    }
     return cardArray
  };

  const cardBacks = displayCardBacks();
  const passed = (props.player.passed)? "passed-player" : '';
  const active = (props.player.active)? 'active-player' : '';

  return (
    <div className={`opponent ${props.oppIndex} ${passed} ${active}`}>
      <h4>{props.player.name}</h4>
      <div className="bid-status">
        <p>Bid: {props.player.bid}</p>
      </div>
      <div className="opp-cards">
        {cardBacks}
      </div>
    </div>
  )  
}