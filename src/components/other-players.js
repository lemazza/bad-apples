//otherPlayers
import React from 'react';
import {connect} from 'react-redux';
import {loadAuthToken} from '../local-storage';
import {API_URL} from '../config';
import {loadGameState} from '../actions';
import './other-players.css';

export function OtherPlayers (props) {
  function handleReveal(values) {
    const revealId = values.target.getAttribute('data-player-id');
    const authToken = loadAuthToken();

    fetch(API_URL.games + `/${props.gameId}/reveal/${revealId}`, {
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
  
  const players = props.players.map(player => {
    const playerStatus = (player.active)? 'active-player' : (player.passed)? 'passed-player' : '';
    return <li onClick={handleReveal} data-player-id={player.controller} className={playerStatus} >
      name: {player.name}, 
      handcards: {player.hand}, 
      stack: {player.stack}, 
      revealed: {player.revealed}, 
      bid: {(player.bid > 0)? player.bid : ''}
    </li>
  })

  return (
    <div className='other-players'>
      <ul>
        {players}
      </ul>
    </div>
  )
};


const mapStateToProps = state => ({
    players: state.game.players,
    gameId: state.game.gameId
});

export default connect(mapStateToProps)(OtherPlayers);