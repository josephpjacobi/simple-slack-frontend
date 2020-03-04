import React, { useState, useEffect } from 'react';
import './App.css';
import NavColumn from './nav-column/nav-column';
import MessageList from './message-list/message-list';
import InputBox from './input/input-box';

function App() {
  useEffect(() => {
      Promise.all([
        fetch('http://localhost:3001/api/channels').then(channels => channels.json()),
        fetch('http://localhost:3001/api/people').then(people => people.json())
      ]).then(([channels, people]) => {
        setAllChannels(channels);
        setAllPeople(people);
      });
  }, []);

  const [selectedChannel, setSelectedChannel] = useState('');
  const [allChannels, setAllChannels] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  
  const addNewMessage = (newMessage, channel) => {
    const updatedChannels = {...allChannels};
    updatedChannels[channel].messages.push(newMessage)
    setAllChannels(updatedChannels);
    addMessageToPerson(newMessage);
  }

  const addMessageToPerson = (newMessage) => {
    const updatedPeople = {...allPeople};
    updatedPeople[newMessage.postedBy].messages.push(newMessage);
    setAllPeople(updatedPeople);
  }

  const sortMessages = ( selectedChannel ) => {
    switch (selectedChannel) {
      default:
      case '':
        return 'Choose a channel to get started!'
      case 'general':
        return allChannels.general.messages;
      case 'help':
        return allChannels.help.messages;
      case 'react':
        return allChannels.react.messages;
      case 'redux':
        return allChannels.redux.messages;
      case 'webpack':
        return allChannels.webpack.messages;
      case 'react-router':
        return allChannels["react-router"].messages;
      case 'Dave':
        return allPeople.Dave.messages;
      case 'Sarah':
        return allPeople.Sarah.messages;
      case 'Zack':
        return allPeople.Zack.messages;
      case 'Pam':
        return allPeople.Pam.messages;
      case 'Erin':
        return allPeople.Erin.messages;
      case 'Joe':
        return allPeople.Joe.messages;
    }
  }

  return (
    <div>
      {(allChannels.length > 0 && allPeople.length > 0) ? <div>Loading...</div> :
      <div className="App">
        <nav>
          <NavColumn selectedChannel={selectedChannel} onSectionChange={setSelectedChannel} allChannels={allChannels} allPeople={allPeople}/>
        </nav>
        <main className="content">
          <MessageList messages={sortMessages(selectedChannel)} />
          <InputBox selectedChannel={selectedChannel} addNewMessage={addNewMessage} />
        </main>
      </div>}
    </div>
    
  );
}

export default App;