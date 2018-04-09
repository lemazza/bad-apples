//addplayer
import React from 'react';

export function NewPlayer(props) {
  const playerType = (props.bot)? 'this will be an AI opponent' : `invite link goes here: ${props.gameId}/playerid??`
  return(
    <div>
      <h3>{props.playername || 'player' + props.index}</h3>
      <p>{playerType}</p>
    </div>
  )
} 

NewPlayer.defaultProps = {
    bot: true,
    gameId: 1234,
    index: 0,
};