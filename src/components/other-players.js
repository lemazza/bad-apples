//otherPlayers
import React from 'react';
import {connect} from 'react-redux';
import {loadAuthToken} from '../local-storage';
import {API_URL} from '../config';
import {loadGameState} from '../actions';
import {Opponent} from './opponent';
import {Table} from './table';
import './other-players.css';

export function OtherPlayers (props) {
  const oppDisplayMatrix = [
    [, 1, 1, 2, 2],
    [1, , 2, 3, 3],
    [, 2, 3, 4, 4],
    [, , , 1, 1],
    [, , , , , 5]
  ]

  function getProperIndex(numPlayers, oppDisplayLocation) {
    return oppDisplayMatrix[numPlayers-1][oppDisplayLocation];
  }

  const oppOneIndex = getProperIndex(props.players.length, 1);
  const oppTwoIndex = getProperIndex(props.players.length, 2);
  const oppThreeIndex = getProperIndex(props.players.length, 3);
  const oppFourIndex = getProperIndex(props.players.length, 4);
  const oppFiveIndex = getProperIndex(props.players.length, 5);

  function displayPlayersOrder() {
    // the goal is to set the userPlayer to 0 index and the player to their left to 1 index, etc
    // get find user in the players array
    let userIndex = props.players.findIndex(x=> x.controller === props.userId);
    // if user is already 0, our work here is done
    if (userIndex === 0) return props.players;

    let startArray = props.players.slice(userIndex);
    let endArray = props.players.slice(0,userIndex);

    return [...startArray, ...endArray];
  }

  const displayPlayers = displayPlayersOrder();

  return (
    <div className='other-players'>
      <div className="row">
        <div className="opponent-container col-3">
          <Opponent player={displayPlayers[2]}/>
        </div>

        <div className="opponent-container col-3">
          <Opponent player={displayPlayers[3]}/>
        </div>

        <div className="opponent-container col-3">
          <Opponent player={displayPlayers[4]}/>
        </div>
      </div>

      <div className="row">
        <div className="opponent-container col-3">
          <Opponent player={displayPlayers[1]}/>
        </div>

        <div className="table-container col-6">
          <Table socket={props.socket} gameId={props.gameId} players={displayPlayers} />
        </div>

        <div className="opponent-container col-3">
          <Opponent player={displayPlayers[5]}/>
        </div>
      </div>
    </div>
  )
};


const mapStateToProps = state => ({
    players: state.game.players,
    gameId: state.game.gameId,
    userId: state.game.userPlayer.controller,
});

export default connect(mapStateToProps)(OtherPlayers);