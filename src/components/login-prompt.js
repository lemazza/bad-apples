import React from 'react';
import LoginForm from './login-form';
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
      formType = <LoginForm />;
      buttonText = 'Create New User'
    } else {
      formName = 'Create New User';
      formType = '';
      buttonText = 'Current User Login'
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