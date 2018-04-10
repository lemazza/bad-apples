//setup-game
import React from 'react';
import PageHeader from '../components/page-header';
import {connect} from 'react-redux';
import {reduxForm, SubmissionError, Field} from 'redux-form';
import Input from '../components/input';
import {required, nonEmpty, totalPlayers} from '../components/validators';
import {API_URL} from '../config';
import {setGameId} from '../actions';


class SetupGame extends React.Component {
  
  onSubmit(values) {
    const {bots, humans} = values;
    console.log('props', this.props)
    return fetch(API_URL.games, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bots,
        humans,
        username: this.props.user,
      })
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(gameObj => {
      this.props.dispatch(setGameId(gameObj.id));
      this.props.history.push(`/games/${gameObj.id}`);
    })
  }


  render () {
    return (
      <div>
        <PageHeader />
          <form 
              onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
          >

          <Field component={Input} label='Number of AI Players' 
            validate={[required, nonEmpty]} 
            type="number" name="bots" min="0" max="5" step="1" value="0" 
          />

          <Field component={Input} label="Number of human players" 
            validate={[required, nonEmpty]} 
            type="number" name="humans" min="1" max="6" step="1" value="1" 
          />

          <button disabled={this.props.pristine || this.props.submitting}>Start Game</button>
        </form>   
      </div>
    )
  }
}

const mapStateToProps = state => ({
    user: state.auth.currentUser,
    gameId: state.setupGame.gameId,
});

SetupGame = connect(mapStateToProps)(SetupGame);

export default reduxForm({
    form: 'setupGame'
})(SetupGame);