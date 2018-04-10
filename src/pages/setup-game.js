//setup-game
import React from 'react';
import PageHeader from '../components/page-header';
import {NewPlayer} from '../components/new-player';
import {connect} from 'react-redux';
import {addPlayer, fetchNewGame} from '../actions';

class SetupGame extends React.Component {
  // onmount, this page makes a request to the db to start a new game instance, 
  // the res gives the gameId, which is used to pass info, mostly for links.

  //should have state.  with keys: gameId, players [{name, type}], maybe turn timer length

  componentDidMount() {
    console.log("component did mount, here's the auth state: ", this.props.auth);
    const currentUser = {
      username: this.props.username,
      id: this.props.id,
      bot: false,
    }
    this.props.dispatch(addPlayer(currentUser))
    this.props.dispatch(fetchNewGame(currentUser.id));
  }

  handleClick() {
    console.log("i've been clicked");
    //dispatch action ADD PLAYER TO SETUP
    const defaultUser = {
      username: 'bot',
      bot: true,
    }
    this.props.dispatch(addPlayer(defaultUser))
  }

  render () {
    const players = this.props.players.map((player, index) => {
      return (
        <NewPlayer 
          playername={player.username} 
          bot={player.bot}
          index={index}
          gameId={this.props.gameId}
        />
      )
    })

    return (
      <div>
        <PageHeader />
        {this.props.gameId}
        
        {players}

        <button onClick={e=> this.handleClick()}>add player</button>
        <button>Start Game</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    username: state.auth.currentUser.username,
    userId: state.auth.currentUser.id,
    players: state.setupGame.players,
    gameId: state.setupGame.gameId,
});

export default connect(mapStateToProps)(SetupGame);