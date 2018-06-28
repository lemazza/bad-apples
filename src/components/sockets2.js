//sockets2
import React from 'react';
import {API_URL} from '../config';
import io from 'socket.io-client';
import {loadAuthToken} from '../local-storage';
import {loadGameState} from '../actions';
import {connect} from 'react-redux';

export function Sockets2 (props) {
  const query = 'token=' + props.authToken;
  const socket = io.connect(API_URL.games, {query})
  const gameId = props.gameId;

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

  function joinGame() {
    socket.emit('join game', gameId);
  }

  function tellAlltoUpdateGame() {
    socket.emit('get update');
  }
  
  function placeCard(type) {
    socket.emit('place card', gameId, type)
  }
  
  function makeBid(bidAmount) {
    socket.emit('bid', gameId, bidAmount);
  }
    
  function pass() {
    socket.emit('pass', gameId);
  }

  function startGame() {
    socket.emit('start game', gameId);
  }

  function revealCard(revealId) {
    socket.emit('reveal', gameId, revealId)
  }

  return {
    joinGame,
    tellAlltoUpdateGame,
    placeCard,
    makeBid,
    pass,
    startGame
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

export default connect(mapStateToProps)(Sockets2);