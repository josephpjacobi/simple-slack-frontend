import React, { useState } from "react";
import "./input-box.css";
import PropTypes from "prop-types";

const InputBox = ({ selectedChannel, addNewMessage }) => {
  const [content, setContent] = useState("");

  const createNewMessage = e => {
    e.preventDefault();
    const newMessage = {
      messageID: Math.random(),
      postedByID: 1,
      channelId: 1,
      postedBy: "Joe",
      channelName: selectedChannel,
      timestamp: new Date().toISOString(),
      content
    };
    addNewMessage(newMessage, selectedChannel);
    setContent("");
  };

  const inputDisplay = channel => `InputBox-${channel ? "container" : "hide"}`;

  return (
    <div className={inputDisplay(selectedChannel)}>
      <form onSubmit={createNewMessage}>
        <input
          className="InputBox-userinput"
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Type your message here. Press Enter to Send"
        />
      </form>
    </div>
  );
};

InputBox.propTypes = {
  selectedChannel: PropTypes.string.isRequired,
  addNewMessage: PropTypes.func.isRequired
};

export default InputBox;
