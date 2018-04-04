//card
import React from 'react';
import {placeCardOnStack} from '../actions';
import {connect} from 'react-redux';



export class Card extends React.Component {
  handleClick (e) {
    e.preventDefault();
    this.props.dispatch(placeCardOnStack(this.props.turn, this.props.type))
  }

  render() {
    return (
      <div onClick={e=>this.handleClick(e)} class="card">{ (this.props.type)? 'BAD APPLE' : 'Apple' }</div>
    )
  }
  
}

const mapStateToProps = state => ({
    turn: state.turn,
});

export default connect(mapStateToProps)(Card);