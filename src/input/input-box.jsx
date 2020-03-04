import React, { useState } from 'react';
import './input-box.css'

const InputBox = ({ selectedChannel, addNewMessage }) => {
  const [content, setContent] = useState('');

  const createNewMessage = (e) => {
    e.preventDefault();
    const newMessage =
    {
      messageID: Math.random(),
      postedByID: 1,
      channelId: 1,
      postedBy: 'Joe',
      channelName: selectedChannel,
      timestamp: new Date().toISOString(),
      content
    };
    addNewMessage(newMessage, selectedChannel);
    setContent('');
  }
  
  const inputDisplay = selectedChannel => `InputBox-${selectedChannel ? 'container' : 'hide'}`

  return (
    <div className={inputDisplay(selectedChannel)}>
      <form onSubmit={createNewMessage}>
        <input className="InputBox-userinput" type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type your message here. Press Enter to Send"/>
      </form>
    </div>
  )
};

export default InputBox;