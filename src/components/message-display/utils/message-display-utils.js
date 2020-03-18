export const updateMessage = (updatedContent, messageToUpdate, setMessages) => {
  fetch('http://localhost:3001/messages', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({ updatedContent, messageToUpdate })
  })
    .then((response) => response.json())
    .then((allMessages) => {
      setMessages(allMessages);
    });
};

export const deleteMessage = (messageToDelete, setMessages) => {
  fetch('http://localhost:3001/messages', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(messageToDelete)
  })
    .then((response) => response.json())
    .then((allMessages) => {
      // eslint-disable-next-line no-console
      console.log(`Message deleted with id ${messageToDelete.messageid}`);
      setMessages(allMessages);
    });
};
