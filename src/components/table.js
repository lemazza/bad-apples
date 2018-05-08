import React from 'react';
import connect from 'react-redux';
import {loadAuthToken} from '../local-storage';
import {API_URL} from '../config';
import {loadGameState} from '../actions';
import './table.css'

export function Table (props) {
  function handleReveal(values) {
    const revealId = values.target.getAttribute('data-player-id');
    const authToken = loadAuthToken();

    fetch(API_URL.games + `/${props.gameId}/reveal/${revealId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
      this.dispatch(loadGameState(data));
    })
    .catch(err=> {
      console.log(err);
      //display in status component, don't redirect
      //this.props.dispatch(updateGameStatusError(err))
    })
  }


  function displayStack(player) {
    if (!player || !player.stack) {
      return '';
    }
    let stackArray = [];
    for(let i = 0; i < player.stack; i++) {
      stackArray.push(
        <div onClick={val=>handleReveal(val)} className={`opp-card-back stack-card stack-card-${i}`} data-player-id={player.controller}>
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
      return (
        <div className={`revealed-card revealed-${card}`}>
        </div>
      )
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
        <div className="col player-table-area top-left-display">
          {displayStack(props.players[2])}
          {displayRevealed(props.players[2])}
        </div>
        <div className="col player-table-area top-mid-display">
          {displayStack(props.players[3])}
          {displayRevealed(props.players[3])}
        </div>
        <div className="col player-table-area top-right-display">
          {displayStack(props.players[4])}
          {displayRevealed(props.players[4])}
        </div>
      </div>

      <div className="row bottom-table-row">
        <div className="col player-table-area bottom-left-display">
          {displayRevealed(props.players[1])}
          {displayStack(props.players[1])}  
        </div>
        <div className="col player-table-area bottom-mid-display">
          {displayRevealed(props.players[0])}
          {displayStack(props.players[0])}
        </div>
        <div className="col player-table-area bottom-right-display">
          {displayRevealed(props.players[5])}
          {displayStack(props.players[5])}
        </div>
      </div>
    </div>
  )
}