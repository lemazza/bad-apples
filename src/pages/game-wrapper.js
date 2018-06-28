import React from 'react';
import {connect} from 'react-redux';
import {API_URL} from '../config';
import {loadAuthToken} from '../local-storage';
import {LoginPrompt} from '../components/login-prompt';
import Game from './game';


class GameWrapper extends React.Component {

  checkAuth() {
    return (this.props.authToken)? <Game /> : <LoginPrompt />;
  } 

  render() {
    let display = (this.props.authToken)? <Game /> : <LoginPrompt />;
    return (
      <div>
      {display}
      </div>
    )
  }
}

const mapStateToProps = state => {
  let localToken = loadAuthToken()
  let authToken = (localToken)? localToken : state.auth.authToken;
  return {
    authToken,
    gameId: state.game.gameId,
  }
};

export default connect(mapStateToProps)(GameWrapper);