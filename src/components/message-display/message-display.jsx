import React, { useState } from 'react';
import '../message-list/message-list.css';
import PropTypes from 'prop-types';
import { deleteMessage, updateMessage } from './utils/message-display-utils';

const MessageDisplay = ({ message, setMessages }) => {
  const [content, setContent] = useState(message.content);

  return (
    <div className="Message">
      <div className="Message-image">
        <img src="#" alt="slackPic" />
      </div>
      <div className="Message-data">
        <div className="Message-posted-timestamp">
          <p className="Message-PostedBy">{message.postedby}</p>
          <p className="Message-timestamp">{message.timestamp}</p>
        </div>
        <div className="Message-content">
          <p>{message.content}</p>
          <button type="button" onClick={() => deleteMessage(message, setMessages)}>
            {message.messageid}
          </button>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="button" onClick={() => updateMessage(content, message, setMessages)}>
            Edit Message
          </button>
        </div>
      </div>
    </div>
  );
};

MessageDisplay.propTypes = {
  message: PropTypes.instanceOf(Object).isRequired,
  setMessages: PropTypes.func.isRequired
};


export default MessageDisplay;
