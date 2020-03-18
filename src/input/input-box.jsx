import React, { useState } from "react";
import "./input-box.css";
import PropTypes from "prop-types";

const InputBox = ({ selectedChannel, addNewMessage }) => {
  const [content, setContent] = useState("");

  const getChannelID = channel => {
    switch (channel) {
      default:
      case "general":
        return 1;
      case "help":
        return 2;
      case "react":
        return 3;
      case "redux":
        return 4;
      case "webpack":
        return 5;
      case "redux-router":
        return 6;
    }
  };

  const createNewMessage = e => {
    e.preventDefault();
    const newMessage = {
      postedbyiD: 6,
      channelid: getChannelID(selectedChannel),
      postedby: "Joe",
      channelname: selectedChannel,
      timestamp: new Date().toISOString(),
      content
    };
    addNewMessage(newMessage);
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
