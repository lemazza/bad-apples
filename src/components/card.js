import React from 'react';
import {placeCardOnStack} from '../actions';
import {connect} from 'react-redux';
import {loadAuthToken} from '../local-storage';
import {API_URL} from '../config';
import {loadGameState} from '../actions';

export class Card extends React.Component {
  handleClick = (e) => {
    if(!this.props.clickable) {
      console.log('the clicking does nothing');
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
      <div onClick={e=>this.handleClick(e)} className="card">{ (this.props.type=== 'badCard')? 'BAD APPLE' : 'Apple' }</div>
    )
  }
}

const mapStateToProps = state => ({
    turn: state.game.turn,
    gameId: state.game.gameId,
});

export default connect(mapStateToProps)(Card);