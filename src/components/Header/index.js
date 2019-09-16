import React from 'react';
import { Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar';
import './index.css';

const Header = () => {
    return (
        <div className="App-header">
            <div className="App-logo">
                <Link className="App-header-title" to={"/"}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Symbol_from_The_Incredibles_logo.svg/1280px-Symbol_from_The_Incredibles_logo.svg.png" alt="App Logo" /></Link>
            </div>
            <SearchBar />
        </div>
    );
}

export default Header;
