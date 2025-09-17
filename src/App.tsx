import React from 'react';
import Header from './components/Header';
import Chat from './components/Chat';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Chat />
    </div>
  );
}

export default App;