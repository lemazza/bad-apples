//setup-game
import React from 'react';
import PageHeader from '../components/page-header';

export default function SetupGame (props) {
  return (
    <div>
      <PageHeader />
      
      <form>
        <label>Number of Players</label>
        <input type='number' min='2' max='6' id='player-number' />

        <button type='submit'>Start Game</button>
      </form>
    </div>
  )
}