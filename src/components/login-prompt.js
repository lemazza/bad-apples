import React from 'react';
import LoginForm from './login-form';
import CreateUser from '../pages/create-user';
import './login-prompt.css';

export class LoginPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleForm: true
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState(prevState => ({
      toggleForm: !prevState.toggleForm
    }))
  }


  render() {
    let formName, formType, buttonText;
    if (this.state.toggleForm) {
      formName = 'Login';
      formType = <LoginForm socket={this.socket} />;
      buttonText = 'Or Create New User'
    } else {
      formName = 'Create New User';
      formType = <CreateUser />;
      buttonText = 'Or Login'
    }
    return(
      <div className='login-prompt'>
        <h4>{formName}</h4>
        <div className='form-area'>
          {formType}
        </div>
        <button id='alt-form-button' onClick={this.handleClick}>{buttonText}</button>
      </div>
    )
  }
}