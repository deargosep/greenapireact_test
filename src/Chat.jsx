import React, { useState, useEffect } from 'react';
import getAxiosInstance from './getAxiosInstance';

const Chat = ({ chatId, idInstance, apiTokenInstance, messages, onUpdateMessages }) => {
  const [message, setMessage] = useState('');
  const axiosInstance = getAxiosInstance(idInstance, apiTokenInstance);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = { chatId, from: 'me', text: message };
      await axiosInstance.post(`/sendMessage/${apiTokenInstance}`, {
        chatId: `${chatId}@c.us`,
        message,
      });
      onUpdateMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages
          .filter((msg) => msg.chatId === chatId)
          .map((msg, index) => (
            <div key={index} className={`message ${msg.from}`}>
              {msg.text}
            </div>
          ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
