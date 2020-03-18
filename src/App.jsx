import React, { useState, useEffect } from "react";
import "./App.css";
import { NavColumn } from "./nav-column/nav-column";
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
      }
      return `http://localhost:3001/messages/channelname/${channel}`;
    };

    if (selectedChannel) {
      const endpoint = buildEndpoint(selectedChannel);
      fetch(endpoint)
        .then(response => response.json())
        .then(newMessages => setMessages(newMessages));
    }
    return setMessages([]);
  }, [selectedChannel, allPeople]);

  // It is creating a new message in the database but not using the data I provided in the body
  const addMessage = newMessage => {
    fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(newMessage)
    })
      .then(response => response.json())
      .then(newMessages => setMessages(newMessages));
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
              addNewMessage={addMessage}
            />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
