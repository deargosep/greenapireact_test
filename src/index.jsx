import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthScreen from './AuthScreen';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthScreen />
  </React.StrictMode>,
);
