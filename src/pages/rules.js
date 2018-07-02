//rules
import React from 'react';
import PageHeader from '../components/page-header';
import {Link} from 'react-router-dom';
import './rules.css';

export default function Rules(props) {
  return (
    <div>
      <PageHeader title="Rules" />
      <div id="rules-page">

        <section class="rounded">
          <h2>Overview</h2>
          <p>Bad Apples is a bidding and bluffing game for 2-6 people. The goal 
          of the game is to be the first player to win 2 rounds, or (less likely) be the last player standing. </p>
          <p>
        Each player starts with 4 cards: 3 good apples and 1 bad apple.  Each round 
        players will place  some of their cards on the table in front of themselves, then players
        take turns bidding how many cards on the table they think they can reveal
         without revealing a bad apple. The high bidder reveals cards until they 
         prove themselves successful by revealing the number that they bid, or fail by revealing a bad apple.
        </p>
        </section>  

        <section class="rounded">
          <h2>How to Setup a Game</h2>
          <p>Simply select the 'start game' button from the main screen, or follow <Link className="link" to='/setup-game'>This Link</Link>, choose a number of players, and
           press play. Send the link to anyone you want to join you. Once your room
            is full, hit the 'Start Game' button</p>
        </section>

        <section class="rounded">
          <h2>The Game</h2>
          <p>The game is played over a series of rounds unitl a player wins two 
          rounds, or only one player remains.  Each round can be broken down into 5 phases:</p>
          <ol>
            <li>Place First Card</li>
            <li>Place or Bid</li>
            <li>Bid or Pass</li>
            <li>Reveal Cards</li>
            <li>Reset for New Round</li>
          </ol>
          <h3>Place First Card</h3>
          <p>Each round starts with each player choosing one of their cards to place on the table. 
          Once each player has 1 card in front of them it becomes the first player’s turn. 
          When it is your turn during the 'Place First Card' phase, click on one 
          of the available cards in your hand to add it to the table.</p>

          <h3>Place or Bid</h3>
          <p>On a player’s turn they have 2 choices.  PLACE another card down on top
           of their previously played card, adding to their stack on the table, or BID: declare 
           the number of cards you believe you can reveal from the table without revealing a Bad Apple.</p>
          <p>
          If a player chooses to PLACE a card on their stack, their turn ends and the next 
          player’s turn begins, giving them the same choice of placing or bidding. 
          To bid, click on of the available cards in your hand and it will be added to your stack on the table.</p>
          <p>
          If a player chooses to BID, the bidding phase begins, no further player may 
          place another card until the round is over.  To bid, choose a number and press bid.  
          This number is the number of cards you believe you can reveal from everyone's 
          stacks without revealing a bad apple. Note, that if you are the high bidder, 
          you will have to reveal starting with your own stack</p>

          <h3>Bid or Pass</h3>
          <p>Once the bidding starts, no further cards can be played. The next
           player in turn order can choose to BID higher than the current high bid, or
            to PASS.  This continues with each player raising or passing until only 
            one player remains. That remaining player starts the REVEAL phase.</p>
          <p>Bidding must be at least one more then the current high bid, and 
          can't be higher then the number of cards on the table. To bid, type a
          number into the box, and press Bid.  If your bid is equal to the number
          of cards on the table, you will be the high bidder by default, and 
          the reveal phase will begin.  Otherwise, it will be the next player's
          turn.</p>
          <p>If you do not wish to bid higher than the current high bid, press the
          Pass button.  Passed players are out of the round, and will not be able to
           bid again.  If all players except one have passed, the 'Reveal Cards' phase
            begins and that player must reveal cards equal to the high bid without 
            revealing a bad apple</p>

          <h3>Revealing</h3>
          <p>The high bidder for the round must now reveal cards.  In order to win the
           round they must reveal only Good Apple cards.  When they start revealing 
           cards they MUST START WITH THEIR OWN STACK OF CARDS.  This is important. 
            A player can only move on to other players’ stacks after all cards from 
            their own stack are revealed.</p>
          <p>To reveal a card from a stack, click on the stack, the top card will be revealed.
            If a good apple is revealed, good.  You want to continue clicking stacks 
            until the number of good apples face up on the table equals your high bid.</p>

          <p>If at any point a player reveals a Bad Apple card, whether from their 
          own stack or another player’s stack, they lose the round.  The will randomly
           lose one of their cards, and the game will reset for a new round.
          If they lose their last card they are out of the game.</p>

          <h3>End of Round, Winning the Game, and Reset</h3>
          <p>If a player successfully revealed the number they said they could, THEY 
          WIN THE ROUND! If this the second time that player has won a round, they 
          WIN THE GAME! Otherwise, the game will reset for the next round. All players
           take back into their hands all cards from their stack. The player 
          who was the high bidder will be the start player for the next round.</p>

          <p>If the player lost the round,  they will randomly lose on of their cards.  If the player is now out of cards, they're out of the game.</p>

        </section> 
      </div>
    </div>
  )
}