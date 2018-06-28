//sockets
import React from 'react';
import {API_URL} from '../config';
import io from 'socket.io-client';
import {loadAuthToken} from '../local-storage';
import {connect} from 'react-redux';

function Socket(props) {
  console.log('here is authToken in websockets component', props.authToken);
  const query = 'token=' + props.authToken
  var socket = io(API_URL.games, {query});
  return socket;
}




const mapStateToProps = state => {
  let localToken = loadAuthToken()
  let authToken = (localToken)? localToken : state.auth.authToken;
  return {
    authToken,
    gameId: state.game.gameId,
  }
};

export default connect(mapStateToProps)(Socket);