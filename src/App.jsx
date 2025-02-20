import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import ChatList from './ChatList';
import AuthScreen from './AuthScreen';
import getAxiosInstance from './getAxiosInstance';

const App = ({ idInstance, apiTokenInstance, initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const axiosInstance = getAxiosInstance(idInstance, apiTokenInstance);

  const handleCreateChat = (phoneNumber) => {
    setSelectedChat(phoneNumber);
  };

  const handleUpdateMessages = (newMessages) => {
    setMessages(newMessages);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const receiveMessages = async () => {
    const response = await axiosInstance.get(
      `/receiveNotification/${apiTokenInstance}?receiveTimeout=5`
    );
    if (response.data) {
      const { body } = response.data;
      if (body != null) {
        const newMessage = { chatId: body.senderData.chatId.substring(0, body.senderData.chatId.length - 5), from: 'them', text: body.messageData.textMessageData.textMessage };
        handleUpdateMessages([...messages, newMessage]);
        await axiosInstance.delete(
          `/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`
        );
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(receiveMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [messages]);

  const chatIds = [...new Set(messages.map(msg => msg.chatId))];

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="app">
      <div className="content">
        <ChatList chats={chatIds} onSelectChat={setSelectedChat} onCreateChat={handleCreateChat} />
        {selectedChat && (
          <Chat
            chatId={selectedChat}
            idInstance={idInstance}
            apiTokenInstance={apiTokenInstance}
            messages={messages}
            onUpdateMessages={handleUpdateMessages}
          />
        )}
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
