import React from 'react';
import {connect} from 'react-redux';
import Card from './card';

export function PlayerConsole(props) {
  //const handState = props.hand.map(card=> {
  //  return <Card type={card} />
 // })

  /*const stackState = props.stack.map(card=> {
    return <Card type={card} />
  })*/

  return (
    <div>
      <p>Rounds Won: {props.roundsWon}</p>
       <input type='number' min={props.bidMin} max={props.bidMax} step='1' />
      <button>Bid</button>
      <button>Pass</button>

      <div>
        <h2>Your Hand</h2>
        <ul> 
          {/*handState*/}
        </ul>
      </div>

      <div>
        <h2>Your Stack</h2>
        <p>{props.stack.length}</p>
        <ul>
          {/*stackState*/}
        </ul>
      </div>


    </div>   
  )
};

const mapStateToProps = state => {
  let stacks = state.game.players.map(player=> player.stack.length);
  let bidMax = stacks.reduce((acc, cur) => acc + cur);
  return {
    hand: state.game.players[0].hand,
    stack: state.game.players[0].stack,
    roundsWon: state.game.players[0].roundsWon,
    bidMin: state.game.highBid + 1, 
    bidMax
  }
};

export default connect(mapStateToProps)(PlayerConsole);