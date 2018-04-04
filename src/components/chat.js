//chat
import React from 'react';
import {connect} from 'react-redux';
import {sendMessage} from '../actions';

export function Chat(props) {
  const messages = props.chat.map(message => {
    console.log('message in chat', message)
    return  <li>{message.name}: {message.text}</li>
  });
  let inputMessage

  function handleClick (e) {
    e.preventDefault();
    props.dispatch(sendMessage('player1', inputMessage.value))
  }

  return (
    <div>
      <ol>
        {messages}
      </ol>
      <input type='text' ref={input => inputMessage = input}/>
      <button type='submit' onClick={handleClick} >Send Message</button>
    </div>
  )
}

const mapStateToProps = state => ({
    chat: state.chat
});

export default connect(mapStateToProps)(Chat);