import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat, onCreateChat }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const handleCreateChat = () => {
    if (phoneNumber.trim()) {
      onCreateChat(phoneNumber);
      setPhoneNumber('');
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    onSelectChat(chat);
  };

  return (
    <div className="chat-list">
      <input
        id="phoneNumber"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleCreateChat}>Create Chat</button>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat}
            onClick={() => handleSelectChat(chat)}
            className={selectedChat === chat ? 'selected' : ''}
          >
            {chat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
