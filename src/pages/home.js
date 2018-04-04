//home 
import React from 'react';
import {Link} from 'react-router-dom';
import PageHeader from '../components/page-header';

export default function Home (props) {
  return (
    <div>
      <PageHeader title='Home'/>

      <section>
        <h2>Log In</h2>
        <form>
          <input type='text' id='username' />
          <input type='password' id='password' />
          <button type='submit'>Log In</button>
        </form>
        <Link to='/create-user'>Create New User</Link>
      </section>

      <section>
        <h2>Play Bad Apples</h2>
        <Link to='/setup-game'>Start Game</Link><br />
        <Link to='/tutorial'>Tutorial</Link>
      </section>

    </div>
  )
}