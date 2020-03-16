import React, { useState, useEffect } from "react";
import "./App.css";
import NavColumn from "./nav-column/nav-column";
import MessageList from "./message-list/message-list";
import InputBox from "./input/input-box";

function App() {
  const [selectedChannel, setSelectedChannel] = useState("");
  const [allChannels, setAllChannels] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/channels").then(channels => channels.json()),
      fetch("http://localhost:3001/users").then(users => users.json())
    ]).then(([channels, users]) => {
      setAllChannels(channels);
      setAllPeople(users);
    });
  }, []);

  useEffect(() => {
    const buildEndpoint = channel => {
      if (allPeople.find(user => user.username === channel)) {
        return `http://localhost:3001/messages/username/${channel}`;
      } else {
        return `http://localhost:3001/messages/channelname/${channel}`;
      }
    };

    if (selectedChannel) {
      const endpoint = buildEndpoint(selectedChannel);
      fetch(endpoint)
        .then(response => {
          return response.json();
        })
        .then(messages => {
          return setMessages(messages);
        });
    } else {
      return setMessages([]);
    }
  }, [selectedChannel, allPeople]);

  const addNewMessage = (newMessage, channel) => {
    const updatedChannels = { ...allChannels };
    updatedChannels[channel].messages.push(newMessage);
    setAllChannels(updatedChannels);
    addMessageToPerson(newMessage);
  };

  const addMessageToPerson = newMessage => {
    const updatedPeople = { ...allPeople };
    updatedPeople[newMessage.postedBy].messages.push(newMessage);
    setAllPeople(updatedPeople);
  };

  return (
    <div>
      {allChannels.length === 0 && allPeople.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="App">
          <nav>
            <NavColumn
              selectedChannel={selectedChannel}
              onSectionChange={setSelectedChannel}
              allChannels={allChannels}
              allPeople={allPeople}
            />
          </nav>
          <main className="content">
            <MessageList messages={messages} />
            <InputBox
              selectedChannel={selectedChannel}
              addNewMessage={addNewMessage}
            />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
