import React from 'react';
import './assets/css/App.css';
import Header from './components/Header';
import BarraLateral from './components/BarraLateral';
import Router from './Router';

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;