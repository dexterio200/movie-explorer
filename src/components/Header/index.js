import React from 'react';
import SearchBar from '../../components/SearchBar';
import './index.css';

const Header = () => {
    return (
        <div className="App-header">
            <div className="App-logo">
                <a className="App-header-title" href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Symbol_from_The_Incredibles_logo.svg/1280px-Symbol_from_The_Incredibles_logo.svg.png" alt="App Logo" /></a>
            </div>
            <SearchBar />
        </div>
    );
}

export default Header;
