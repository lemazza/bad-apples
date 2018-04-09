//home 
import React from 'react';
import {Link} from 'react-router-dom';
import PageHeader from '../components/page-header';
import LoginForm from '../components/login-form';

export default function Home (props) {
  return (
    <div>
      <PageHeader title='Home'/>
      <div className='row'>
        <section className='col'>
          <LoginForm />
          <Link to='/create-user'>Create New User</Link>
        </section>

        <section className='col'>
          <h2>Play Bad Apples</h2>
          <Link to='/setup-game'>Start Game</Link><br />
          <Link to='/tutorial'>Tutorial</Link>
        </section>
      </div>

    </div>
  )
}