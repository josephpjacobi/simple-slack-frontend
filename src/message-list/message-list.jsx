import React from 'react';
import './message-list.css';
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => {
  return (
    <div className="MessageList-container">
      <ul className="MessageList">
        {typeof messages === 'string' ? <div className="Choose-Channel">{messages}</div> :
          messages.map(message =>
          <Message key={message.messageID} message={message} />
        )}
      </ul>
    </div>
  )
};

MessageList.propTypes = {
  messages: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

const Message = ({ message }) => {
  return (
    <div className="Message">
      <div className="Message-image">
        <img src="#" alt="slackPic" />
      </div>
      <div className="Message-data">
        <div className="Message-posted-timestamp">
          <p className="Message-PostedBy">{message.postedBy}</p>
          <p className="Message-timestamp">{message.timestamp}</p>
        </div>
        <div className="Message-content">
          <p>{message.content}</p>
        </div>       
      </div>
    </div>
  )
}



export default MessageList;