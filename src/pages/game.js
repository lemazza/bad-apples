import React from 'react';
import OtherPlayers from '../components/other-players';
import PlayerConsole from '../components/player-console';
import {connect} from 'react-redux';
import {API_URL} from '../config';
import {fetchGameState, loadGameState} from '../actions';
import {loadAuthToken} from '../local-storage';
import GameStatusDisplay from '../components/game-status-display';
import io from 'socket.io-client';
import Modal from 'react-modal';
//import Socket from '../components/websockets';
import './game.css'
//comment


 /*<button onClick={this.openModal}>Invite Players</button>
        <Modal
          isOpen={this.canInvite()}
          contentLabel="Example Modal"
        >

          <h2>Hello</h2>
          <p>Invite Modal</p>
          <button >close</button>
        </Modal>
        */

let socket;
export class Game extends React.Component {
  constructor(props) {
    super(props);
    let siteId = window.location.href
    let idIndex = siteId.search('games/');
    let gameId = siteId.slice(idIndex + 6);
    //let gameId = this.props.match.params.gameId

    const query = 'token=' + this.props.authToken;
    socket = io.connect(API_URL.games, {query})

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
    let siteIdIndex = window.location.search('games/');
    let gameId = window.location.slice(siteIdIndex + 6);
    fetch(API_URL.games + `/${gameId}`, {
      headers: {
        'Authorization': `Bearer ${this.props.authToken}`
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
    let siteId = window.location.href
    let idIndex = siteId.search('games/');
    let gameId = siteId.slice(idIndex + 6);
    console.log(gameId);
    //let gameId = this.props.match.params.gameId 
   //this.props.dispatch(fetchGameState(gameId));
    console.log('game component mounted');
    
    socket.emit('join game', gameId);
    socket.emit('get update');
        
  }

  canInvite() {
    if(this.props.numJoined < this.props.numInvited) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div className="game-page">
       
        <GameStatusDisplay />
        <OtherPlayers socket={socket}/>
        <PlayerConsole socket={socket}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    username: state.game.userPlayer.name,
    gameState: state.game,
    gameId: state.game.gameId,
    authToken: state.auth.authToken,
    numInvited: state.game.numBots + state.game.numHumans,
    numJoined: state.game.players.length,
});

export default connect(mapStateToProps)(Game);