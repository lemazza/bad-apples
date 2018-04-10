//game
import React from 'react';
import OtherPlayers from '../components/other-players';
import PlayerConsole from '../components/player-console';
import Chat from '../components/chat';
import {connect} from 'react-redux';
import {API_URL} from '../config';

export class Game extends React.Component {
  //onmount hydrate gameState from DB
  componentDidMount() {
    fetch(API_URL.games + `/${this.props.match.params.gameId}`)
    .then(res=> console.log(res.body))
  }

  render() {
    return (
      <div>
        <div className='game-state'>
          <ul>
            <li>Round: {this.props.round}</li>
            <li>Phase: {this.props.phase}</li>
            <li>Turn: {this.props.turn}</li>
            <li>High Bid: {this.props.highBid || 'none'}</li>
          </ul>
        </div>

        <OtherPlayers />
        <PlayerConsole />
        <Chat />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    round: state.game.round,
    phase: state.game.phase,
    turn: state.game.turn,
});

export default connect(mapStateToProps)(Game);