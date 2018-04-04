import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/home';
import Game from './pages/game';
import CreateUser from './pages/create-user'
import SetupGame from './pages/setup-game'


export default function App(props) {
    return (
        <Router>
            <div className="app">
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/create-user" component={CreateUser} />
                    <Route exact path="/setup-game" component={SetupGame} />
                </main>
            </div>
        </Router>
    );
}
