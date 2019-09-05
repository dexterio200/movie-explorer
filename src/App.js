import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import FrontPage from './components/FrontPage';

function App() {
  return (
    <div className="App">
      <div className="App-main">
        <div className="App-content-wrapper">
          <Route path="/" exact component={FrontPage} />
        </div>
      </div>
    </div>
  );
}

export default App;
