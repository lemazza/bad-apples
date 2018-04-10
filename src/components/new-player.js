//addplayer
import React from 'react';
import './new-player.css';

export function NewPlayer(props) {
  const playerType = (props.bot)? 'this will be an AI opponent' : `invite link goes here: localhost:3000/games/${props.gameId}`
  return(
    <div className="newPlayer">
      <h3>{props.playername || 'player' + ( props.index + 1 ) }</h3>
      <p>{playerType}</p>
    </div>
  )
} 

NewPlayer.defaultProps = {
    bot: true,
    gameId: 1234,
    index: 0,
};