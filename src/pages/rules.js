//rules
import React from 'react';
import PageHeader from '../components/page-header';
import './rules.css';

export default function Rules(props) {
  return (
    <div>
      <PageHeader title="Rules" />
      <div id="rules-page">
        <h2>Welcome to Bad Apples!</h2>  
        <h3>How to Start</h3>  
        <p>This game can be played with 2-6 people.  Simply select the start game 
        button, choose a number of players, and press play.  Send the link to 
        anyone you want to join you.  Once your room is full, hit the Start Game button</p>

        <h3>Goal</h3>
        <p>The goal of the game is to be the first player to win 2 rounds. Or (less likely) the last one standing.
        Each player starts with 4 cards.  3 apples, and 1 bad apple.  With these cards also act as your life.  
        If you lose a round, you will lose a card.  If you’re ever out of cards you’re out of the game.</p>

        <h3>PLACE FIRST CARD</h3>
        <p>Each round starts with each player choosing a card to place on the table
        Once each player has 1 card in front of them it becomes the first player’s turn.</p>

        <h3>PLACE OR BID</h3>
        <p>On a player’s turn they have 2 choices.  Place another card down on top
         of their previously played card, creating a STACK on the table, or BID: declare 
         the number of cards you believe you can reveal from the table without revealing a Bad Apple.
        If a player chooses to place a card on their stack, their turn ends and the next 
        player’s turn begins, giving them the same choice of placing or bidding.
        If a player chooses to BID, the bidding phase begins, no further player may 
        place another card until the round is over.</p>

        <h3>Bidding</h3>
        <p>Once the bidding starts, no further cards can be played. The next
         player in turn order can choose to bid higher than the previous player, or
          to PASS.  This continues with each player raising or passing until only 
          one player remains. That remaining player starts the REVEAL phase.</p>

        <h3>Passing</h3>
        <p>Once a player has passed they are out of the round and can no longer participate in bidding.</p>

        <h3>Revealing</h3>
        <p>The high bidder for the round must now reveal cards.  In order to win the
         round they must reveal only Good Apple cards.  When they start revealing 
         cards they MUST START WITH THEIR OWN STACK OF CARDS.  This is important. 
          A player can only move on to other players’ stacks after all cards from 
          their own stack are revealed.</p>

        <h3>Revealing a BAD APPLE</h3>
        <p>If at any point a player reveals a Bad Apple card, whether from their 
        own stack or another player’s stack, they lose the round.  The will randomly
         lose one of their cards, and the game will reset for a new round.
        If they lose their last card they are out of the game.</p>

        <h3>Revealing a Good Apple</h3>
        <p>If a player reveals a good apple, good.  I mean, like, that’s the goal,
         but don’t get cocky.  Keep going, kid.  You need to reveal the same number
          of good apples as you bid.  So if you bid 5, you’re going to have to reveal 5 good apples.</p>

        <h3>Winning a round</h3>
        <p>If a player successfully revealed the number they said they could, THEY 
        WIN THE ROUND! If this the second time that player has won a round, they 
        win the game! Otherwise, the game will reset for the next round, the player
         will be the start player for the next round.</p> 
      </div>
    </div>
  )
}