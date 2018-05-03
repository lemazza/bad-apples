import React from 'react';
import connect from 'react-redux';
import './table.css'

export function Table (props) {
  console.log('props in Table', props.players)
  function displayStack(player) {
    if (!player || !player.stack) {
      return '';
    }
    let stackArray = [];
    for(let i = 0; i < player.stack; i++) {
      stackArray.push(
        <div className={`opp-card-back stack-card-${i}`}>
        </div>
      ) 
    }
    return stackArray; 
  }

  function displayRevealed(player) {
    if (!player || !player.revealed) {
      return '';
    }
    let revealedCards = player.revealed.map((card, index) => {
      <div className={`revealed-card revealed-${card}`}>
      </div>
    })
    return (
      <div className="revealed-area">
        {revealedCards}
      </div>
    ) 
  }

  return (
    <div className="table">
      <div className="row top-table-row">
        <div className="col top-left-display">
          {displayStack(props.players[2])}
          {displayRevealed(props.players[2])}
        </div>
        <div className="col top-mid-display">
          {displayStack(props.players[3])}
          {displayRevealed(props.players[3])}
        </div>
        <div className="col top-right-display">
          {displayStack(props.players[4])}
          {displayRevealed(props.players[4])}
        </div>
      </div>

      <div className="row bottom-table-row">
        <div className="col bottom-left-display">
          {displayRevealed(props.players[1])}
          {displayStack(props.players[1])}  
        </div>
        <div className="col bottom-mid-display">
          {displayRevealed(props.players[0])}
          {displayStack(props.players[0])}
        </div>
        <div className="col bottom-right-display">
          {displayRevealed(props.players[5])}
          {displayStack(props.players[5])}
        </div>
      </div>
    </div>
  )
}