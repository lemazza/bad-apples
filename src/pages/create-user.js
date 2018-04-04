//create-user
import React from 'react';
import PageHeader from '../components/page-header';

export default function createUser (props) {
  return (
    <div>
      <PageHeader />

      <form>
        <label>First Name</label>
        <input type='text' id='fname' />
        <label>Last Name</label>
        <input type='text' id='lname' />
        <label>username</label>
        <input type='text' id='username' />
        <label>password</label>
        <input type='password' id='password1' />
        <label>re-enter password</label>
        <input type='password' id='password2' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}