import React from 'react';
import {placeCardOnStack} from '../actions';
import {connect} from 'react-redux';
import {loadAuthToken} from '../local-storage';
import {API_URL} from '../config';
import {loadGameState} from '../actions';

import './card.css';

export class Card extends React.Component {
  handleClick = (e) => {
    if(!this.props.clickable) {
      console.log('the clicking does nothing');
      //should send error message here
    } else {

      e.preventDefault();
      const authToken = loadAuthToken();
      fetch(API_URL.games + `/${this.props.gameId}/place/${this.props.type}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(res=> res.json())
      .then(data=> {
        this.props.dispatch(loadGameState(data));
      })
      .catch(err=> {
        console.log(err);
        //display in status component, don't redirect
        //this.props.dispatch(updateGameStatusError(err))
      })
    }
    
  }

  render() {
    return (
      <div onClick={e=>this.handleClick(e)} className={`player-card ${this.props.type}`}>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    turn: state.game.turn,
    gameId: state.game.gameId,
});

export default connect(mapStateToProps)(Card);