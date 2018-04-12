//card
import React from 'react';
import {placeCardOnStack} from '../actions';
import {connect} from 'react-redux';



export class Card extends React.Component {
  handleClick (e) {
    e.preventDefault();
    //this.props.dispatch(placeCardOnStack(this.props.turn, this.props.type))
  }

  render() {
    return (
      <div onClick={e=>this.handleClick(e)} className="card">{ (this.props.type=== 'badCard')? 'BAD APPLE' : 'Apple' }</div>
    )
  }
  
}

const mapStateToProps = state => ({
    turn: state.game.turn,
});

export default connect(mapStateToProps)(Card);