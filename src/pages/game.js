import React from 'react';
import OtherPlayers from '../components/other-players';
import PlayerConsole from '../components/player-console';
import Chat from '../components/chat';
import {connect} from 'react-redux';
import {API_URL} from '../config';
import {loadGameState} from '../actions';
import {loadAuthToken} from '../local-storage';
import GameStatusDisplay from '../components/game-status-display';

export class Game extends React.Component {
  //onmount hydrate gameState from DB
  componentDidMount() {
    const authToken = loadAuthToken();

    if(authToken) {
      fetch(API_URL.games + `/${this.props.match.params.gameId}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
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
      })
    }
  }

  render() {
    console.log(this.props.gameState);
    return (
      <div>
        <GameStatusDisplay />
        <OtherPlayers />
        <PlayerConsole />
        <Chat />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    gameState: state.game
});

export default connect(mapStateToProps)(Game);