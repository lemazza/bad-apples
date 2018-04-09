//create-user
import React from 'react';
import PageHeader from '../components/page-header';
import {reduxForm, SubmissionError, Field} from 'redux-form';
import {required, nonEmpty, email} from '../components/validators';
import {API_URL} from '../config';
import Input from '../components/input';

export class CreateUser extends React.Component {
  onSubmit(values) {
    console.log(values);
    return fetch(API_URL.users, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if(!res.ok) {
        if(
          res.headers.has('content-type') 
          && res.headers.get('content-type').startsWith('application/json')
        ) {
          return res.json().then(err=> Promise.reject(err));
        }
        return Promise.reject({
          code: res.status,
          message: res.statusText
        });
      }
      //login
      //redirect
      return;
    })
    .then(() => console.log('Submitted with values', values))
    .catch(err => {
      const {reason, message, location} = err;
      if(reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
      return Promise.reject(
        new SubmissionError({
          _error: 'Error submitting message'
        })
      );
    });
  }

  render() {
    return (
      <div>
        <PageHeader />

        <form 
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <label htmlFor='firstName'>First Name</label>
          <Field component={Input} type='text' name='firstName' id='firstName' />

          <label htmlFor='lastName'>Last Name</label>
          <Field component={Input} type='text' name="lastName" id='lastName' />

          <label htmlFor='email'>email</label>
          <Field component={Input} validate={[required, nonEmpty, email]} type='email' name="email" id='email' />

          <label htmlFor='username'>username</label>
          <Field component={Input} validate={[required, nonEmpty]} type='text' name="username" id='username' />

          <label htmlFor='password'>password</label>
          <Field component={Input} validate={[required, nonEmpty]} type='password' name="password" id='password' />

          <label htmlFor='password2'>re-enter password</label>
          <Field component={Input} validate={[required, nonEmpty]} type='password' name="password2" id='password2' />
          
          <button type='submit' 
            disabled={this.props.pristine || this.props.submitting}>Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'createUser'
})(CreateUser);