import React from 'react';
import {connect} from 'react-redux';
import Card from './card';
import {loadAuthToken} from '../local-storage';
import {API_URL} from '../config';
import {loadGameState} from '../actions';
import Input from '../components/input';
import {reduxForm, SubmissionError, Field} from 'redux-form';
import {socket} from './websockets';
import {handleUserBid} from '../actions';
import './player-console.css';

class PlayerConsole extends React.Component {
    constructor(props) {
    super(props);

    this.handleStartGame  = this.handleStartGame.bind(this);
    this.handlePass  = this.handlePass.bind(this);
  }

  handleBid (values) {
    socket.emit('bid', this.props.gameId, values.bidAmount);
    //socket.emit('request update', this.props.gameId);

    /*
    fetch(API_URL.games + `/${this.props.gameId}/bid/${values.bidAmount}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
      this.props.dispatch(loadGameState(data));
    })
    .catch(err=> {
      console.log(err);
      //display in status component, don't redirect
      //this.props.dispatch(updateGameStatusError(err))
    })*/
  }

  handlePass () {
    socket.emit('pass', this.props.gameId);
    /*const authToken = loadAuthToken();
    fetch(API_URL.games + `/${this.props.gameId}/pass/`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
      this.props.dispatch(loadGameState(data));
    })
    .catch(err=> {
      console.log(err);
      //display in status component, don't redirect
      //this.props.dispatch(updateGameStatusError(err))
    })*/
  }

  handleStartGame () {
    socket.emit('start game', this.props.gameId);
    /*
    const authToken = loadAuthToken();
    const gameId = this.props.gameId;
    fetch(API_URL.games + `/${gameId}/start/`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
      this.props.dispatch(loadGameState(data));
    })
    .catch(err=> {
      console.log(err);
      //display in status component, don't redirect
      //this.props.dispatch(updateGameStatusError(err))
    })*/
  }


  readyGame() {
    if(this.props.phase === 'waiting for players' 
      && this.props.creator 
      && this.props.numJoined === this.props.numInvited) {
      return (
        <button onClick={this.handleStartGame} type="button" >Start Game</button>
      )
    }
  }

  render() {
    let handState = this.props.hand.map((card, index) => {
      return <Card key={index} clickable={true} type={card} />
    })

    return (
      <div className="player-console fixed-bottom">
        <div className="row">
          <div className="user-info col-4">
            <h2 className={(this.props.active)? 'active-user' : ''} >{this.props.username}</h2>
            <p>Rounds Won: {this.props.roundsWon}</p>
            <p>game is updating</p>
            {this.readyGame()}
          </div>

          <div className="player-hand col">
            {handState}
          </div>
        </div>

        <div className="row">
          <form className="col" onSubmit={this.props.handleSubmit(values => this.handleBid(values))}>
            <Field component={Input} 
              label='Amount to Bid'
              id='bid-amt' 
              name="bidAmount" 
              type='number' 
              min={this.props.bidMin} 
              max={this.props.bidMax} 
              step='1' 
              value={this.props.bidMin} 
              type='text'
            />
            <button className="col" id='bid-btn' type="submit">Bid</button>
          </form>

          <button className="col" id='pass-btn' onClick={this.handlePass}>Pass</button>
        </div>
      </div>   
    )
  }
};

const mapStateToProps = state => {
  let player = state.game.userPlayer;
  let cardsInStacks = state.game.players.map(x=> x.stack);
  let bidMax = cardsInStacks.reduce((acc, cv) => acc + cv);
  let activePlayer = state.game.players.find(plyr => plyr.controller === player.controller);
  let active = (activePlayer)? activePlayer.active : '';
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