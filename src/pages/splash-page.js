//home 
import React from 'react';
import {Link} from 'react-router-dom';
import './splash-page.css';

export default function SplashPage (props) {
  return (
    <div id="splash-page">
      <h2><img src="/images/ba-title-text2.jpeg" alt="bad-apples" /></h2>
      <div class="row">
        <div class="ba-splash-img-container mx-auto col-3">
          <img class="img-fluid" src="/images/baddest-apple2.jpg" alt="one bad apple" />
        </div>
      </div>
      <button>PLAY</button>
    </div>
  )
}