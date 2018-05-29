import React from 'react';
import OtherPlayers from '../components/other-players';
import PlayerConsole from '../components/player-console';
import {connect} from 'react-redux';
import {API_URL} from '../config';
import {fetchGameState, loadGameState} from '../actions';
import {loadAuthToken} from '../local-storage';
import GameStatusDisplay from '../components/game-status-display';
import {LoginPrompt} from '../components/login-prompt';
import {socket} from '../components/websockets';

import './game.css'


export class Game extends React.Component {
  constructor(props) {
    super(props);

    let gameId = this.props.match.params.gameId
    socket.on('update game', function(data) {
      console.log('attempting game update');
      props.dispatch(loadGameState(data));
    });
    socket.on('get update', function(data) {
      console.log('i am requesting an update for gameId', gameId);
      socket.emit('request update', gameId)
    })
    socket.on('error', function(err) {
      console.log('error occured on server side, probably', err);
    })
  }

  //onmount hydrate gameState from DB
  getGameData () {
    const authToken = loadAuthToken();
    fetch(API_URL.games + `/${this.props.match.params.gameId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
      this.props.dispatch(loadGameState(data));
    })
    .catch(err=> {
      console.log(JSON.stringify(err));
      //display in status component, don't redirect
      //this.props.dispatch(updateGameStatusError(err))
    })
  }

  componentDidMount() {
    let gameId = this.props.match.params.gameId
    this.props.dispatch(fetchGameState(gameId));
    
    socket.emit('join game', {gameId});
    socket.emit('get update');    
  }

  render() {
    const authToken = loadAuthToken();
    const prompt = (authToken)? '' : <LoginPrompt />

    return (
      <div className="game-page">
        <GameStatusDisplay />
        {prompt}
        <OtherPlayers />
        <PlayerConsole />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    username: state.game.userPlayer.name,
    gameState: state.game,
    gameId: state.game.gameId,
});

export default connect(mapStateToProps)(Game);