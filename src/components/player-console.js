import React from 'react';
import {connect} from 'react-redux';
import Card from './card';
import {loadAuthToken} from '../local-storage';
import {API_URL} from '../config';
import {loadGameState} from '../actions';
import Input from '../components/input';
import {reduxForm, SubmissionError, Field} from 'redux-form';

import './player-console.css';

export function PlayerConsole(props) {
  const handState = props.hand.map(card=> {
    return <Card clickable={true} type={card} />
  })

  function handleBid (values) {
    const authToken = loadAuthToken();
    fetch(API_URL.games + `/${props.gameId}/bid/${values.bidAmount}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
      props.dispatch(loadGameState(data));
    })
    .catch(err=> {
      console.log(err);
      //display in status component, don't redirect
      //this.props.dispatch(updateGameStatusError(err))
    })
  }

  function handlePass () {
    const authToken = loadAuthToken();
    fetch(API_URL.games + `/${props.gameId}/pass/`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
      props.dispatch(loadGameState(data));
    })
    .catch(err=> {
      console.log(err);
      //display in status component, don't redirect
      //this.props.dispatch(updateGameStatusError(err))
    })
  }

  function handleStartGame () {
    const authToken = loadAuthToken();
    fetch(API_URL.games + `/${props.gameId}/start/`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
      props.dispatch(loadGameState(data));
    })
    .catch(err=> {
      console.log(err);
      //display in status component, don't redirect
      //this.props.dispatch(updateGameStatusError(err))
    })
  }


  function readyGame() {
    if(props.phase === 'waiting for players' 
      && props.creator 
      && props.numJoined === props.numInvited) {
      return (
        <button onClick={handleStartGame()} type="button" >Start Game</button>
      )
    }
  }



  return (
    <div className="player-console fixed-bottom">
      <div className="row">
        <div className="user-info col-4">
          <h2 className={(props.active)? 'active-user' : ''} >{props.username}</h2>
          <p>Rounds Won: {props.roundsWon}</p>
          {readyGame()}
        </div>

        <div className="player-hand col">
          {handState}
        </div>
      </div>

      <div className="row">
        <form className="col" onSubmit={props.handleSubmit(values => handleBid(values))}>
          <Field component={Input} 
            label='Amount to Bid'
            id='bid-amt' 
            name="bidAmount" 
            type='number' 
            min={props.bidMin} 
            max={props.bidMax} 
            step='1' 
            placeholder={props.bidMin} 
          />
          <button className="col" id='bid-btn' type="submit">Bid</button>
        </form>

        <button className="col" id='pass-btn' onClick={handlePass}>Pass</button>
      </div>
    </div>   
  )
};

const mapStateToProps = state => {
  let player = state.game.userPlayer;
  let cardsInStacks = state.game.players.map(x=> x.stack);
  let bidMax = cardsInStacks.reduce((acc, cv) => acc + cv);
  let activePlayer = state.game.players.find(plyr => plyr.controller === player.controller);
  let active = (activePlayer)? activePlayer.active : ''
  return {
    username: player.name,
    hand: player.hand,
    stack: player.stack,
    revealed: player.revealed,
    roundsWon: player.roundsWon,
    bidMin: (state.game.highBid === bidMax)? bidMax : state.game.highBid + 1, 
    bidMax: bidMax,
    creator: player.creator,
    active: active,
    passed: player.passed,
    loggedIn: player.loggedIn,
    gameId: state.game.gameId,
    creator: player.creator,
    numInvited: state.game.numBots + state.game.numHumans,
    numJoined: state.game.players.length,
    phase: state.game.phase,
  }
};

PlayerConsole = connect(mapStateToProps)(PlayerConsole);

export default reduxForm({
    form: 'PlayerConsole'
})(PlayerConsole);