import React, { useState, useEffect } from 'react';
import App from './App';

const AuthScreen = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedIdInstance = localStorage.getItem('idInstance');
    const storedApiTokenInstance = localStorage.getItem('apiTokenInstance');
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    if (storedIdInstance && storedApiTokenInstance) {
      setIdInstance(storedIdInstance);
      setApiTokenInstance(storedApiTokenInstance);
      setMessages(storedMessages);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (idInstance && apiTokenInstance) {
      localStorage.setItem('idInstance', idInstance);
      localStorage.setItem('apiTokenInstance', apiTokenInstance);
      localStorage.setItem('messages', JSON.stringify(messages));
      setIsAuthenticated(true);
    }
  };

  if (isAuthenticated) {
    return <App idInstance={idInstance} apiTokenInstance={apiTokenInstance} initialMessages={messages} />;
  }

  return (
    <div className="auth-screen">
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthScreen;
