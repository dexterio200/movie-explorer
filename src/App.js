import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import FrontPage from './components/FrontPage';
import SearchResult from './components/SearchResult';
import MovieDetails from './components/MovieDetails'

function App() {
  return (
    <div className="App">
      <div className="App-main">
        <div className="App-content-wrapper">
          <Route path="/" exact component={FrontPage} />
          <Route path="/search" component={SearchResult} />
          <Route path="/movie/:id-:title" component={MovieDetails} />
        </div>
      </div>
    </div>
  );
}

export default App;
