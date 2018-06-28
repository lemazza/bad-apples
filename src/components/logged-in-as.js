//loggedInAs
import React from 'react';
import './logged-in-as.css'

export default function loggedInAs (props) {

  return (
    <div id="logged-in-as">
      User: {props.username}
    </div>
  )
}