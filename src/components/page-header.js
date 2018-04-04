//page-header
import React from 'react';
import {Link} from 'react-router-dom';

export default function PageHeader (props) {
  return (
    
      <header>
        <Link to='/'>
          <h1>Bad Apples</h1>
        </Link>
        <h3>{props.title || 'subtitle text here'}</h3>
      </header>
  )
}