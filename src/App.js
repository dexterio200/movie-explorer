import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import FrontPage from './components/FrontPage';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={FrontPage} />
    </div>
  );
}

export default App;
