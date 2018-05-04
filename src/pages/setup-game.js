//setup-game
import React from 'react';
import PageHeader from '../components/page-header';
import {connect} from 'react-redux';
import {reduxForm, SubmissionError, Field} from 'redux-form';
import Input from '../components/input';
import {required, nonEmpty, totalPlayers} from '../components/validators';
import {API_URL} from '../config';
import {loadAuthToken} from '../local-storage';


class SetupGame extends React.Component {
  
  onSubmit(values) {
    const {bots, humans} = values;
    const authToken = loadAuthToken();
    return fetch(API_URL.games, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        bots,
        humans,
      })
    })
    .then(res => {
      if (!res.ok) {
        console.log(res.statusText);
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(gameObj => {
      this.props.history.push(`/games/${gameObj.gameId}`);
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
            validate={[required, nonEmpty, totalPlayers]} 
            type="number" name="bots" min="0" max="5" step="1" value="0" 
          />

          <Field component={Input} label="Number of human players" 
            validate={[required, nonEmpty, totalPlayers]} 
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
});

SetupGame = connect(mapStateToProps)(SetupGame);

export default reduxForm({
    form: 'setupGame'
})(SetupGame);