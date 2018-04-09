//setup-game
import React from 'react';
import PageHeader from '../components/page-header';
import {NewPlayer} from '../components/new-player';

export default class SetupGame extends React.Component {
  // getUsernameFromLocalStorage();
  // feed this info to the first NewPlayer;
  // onmount, this page makes a request to the db to start a new game instance, 
  // the res gives the gameId, which is used to pass info, mostly for links.

  //should have state.  with keys: gameId, players [{name, type}], maybe turn timer length
  handleClick() {
    console.log("i've been clicked");
    //dispatch action ADD PLAYER TO SETUP
  }

  render () {
    return (
      <div>
        <PageHeader />
        
        <NewPlayer />
        <button onClick={e=> this.handleClick()}>add player</button>
        <button>Start Game</button>
      </div>
    )
  }
}