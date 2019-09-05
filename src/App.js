import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import FrontPage from './components/FrontPage';
import SearchResult from './components/SearchResult';

function App() {
  return (
    <div className="App">
      <div className="App-main">
        <div className="App-content-wrapper">
          <Route path="/" exact component={FrontPage} />
          <Route path="/search" component={SearchResult} />
        </div>
      </div>
    </div>
  );
}

export default App;
