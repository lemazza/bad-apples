//page-header
import React from 'react';
import {Link} from 'react-router-dom';

import './page-header.css';

export default function PageHeader (props) {
  return (
    
      <header>
        <h1>
          <Link to='/'>Bad Apples</Link>
        </h1>
        <h3>{props.title || 'subtitle text here'}</h3>
      </header>
  )
}