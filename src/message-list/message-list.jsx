import React from "react";
import "./message-list.css";
import PropTypes from "prop-types";

const MessageList = ({ messages }) => (
  <div className="MessageList-container">
    <ul className="MessageList">
      {messages.length > 0 ? (
        messages.map(message => (
          <Message key={message.messageid} message={message} />
        ))
      ) : (
        <div className="Choose-Channel">Choose a channel to get started!</div>
      )}
    </ul>
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.instanceOf(Array).isRequired
};

const Message = ({ message }) => (
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
        <button type="button">{message.messageid}</button>
      </div>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.instanceOf(Object).isRequired
};

export default MessageList;
