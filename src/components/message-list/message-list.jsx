import React from 'react';
import './message-list.css';
import PropTypes from 'prop-types';
import MessageDisplay from '../message-display/message-display';

const MessageList = ({ messages, setMessages }) => (
  <div className="MessageList-container">
    <ul className="MessageList">
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageDisplay
            key={message.messageid}
            message={message}
            setMessages={setMessages}
          />
        ))
      ) : (
        <div className="Choose-Channel">Choose a channel to get started!</div>
      )}
    </ul>
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.instanceOf(Array).isRequired,
  setMessages: PropTypes.func.isRequired
};

export default MessageList;
