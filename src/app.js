import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/home';
import GameWrapper from './pages/game-wrapper';
import CreateUser from './pages/create-user';
import SetupGame from './pages/setup-game';
import SplashPage from './pages/splash-page';
import Rules from './pages/rules';


export default function App(props) {
  return (
    <Router>
      <div className="app container">
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/create-user" component={CreateUser} />
          <Route exact path="/setup-game" component={SetupGame} />
          <Route exact path="/games/:gameId" component={GameWrapper} />
          <Route exact path="/rules" component={Rules} />
        </main>
      </div>
    </Router>
  );
}
