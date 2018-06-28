//home 
import React from 'react';
import {Link} from 'react-router-dom';
import PageHeader from '../components/page-header';
//import LoginForm from '../components/login-form';
import {LoginPrompt} from '../components/login-prompt';
import LoggedInAs from '../components/logged-in-as';
import {connect} from 'react-redux';

import './home.css';

export class Home extends React.Component {
  
  render() {
    let formPrompt = (this.props.currentUser)? '' : <section className="col"><LoginPrompt /></section>;
    let logged = (this.props.currentUser)? <LoggedInAs username={this.props.currentUser.username} /> : ''
    return (
      <div id="home-page">
        <PageHeader title='Home'/>
        {logged}
        <div className='row'>
          {formPrompt}
          <section className="col home-choice">
            <Link to='/rules'>Learn Bad Apples</Link>
          </section>
          <section className='col home-choice'>
            <Link to='/setup-game'>Play Bad Apples</Link><br />
          </section>
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    authToken: state.auth.authToken,
    auth: state.auth,
    state: state,
  }
};

export default connect(mapStateToProps)(Home);