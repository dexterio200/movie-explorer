import React, { useState, useEffect } from 'react'
import Header from '../Header'
import MovieBox from '../MovieBox'
import { API_KEY, BASE_URL, SEARCH_LINK, MOVIE_LINK } from '../../api';

const SearchResult = (props) => {
    const [searchResult, setSearchResult] = useState(null)
    const searchTerm = props.location.search.split('=')[1]

    useEffect(() => {
        fetch(`${BASE_URL}${SEARCH_LINK}${MOVIE_LINK}?api_key=${API_KEY}&query=${searchTerm}`)
            .then(response => response.json())
            .then(movies => setSearchResult(movies.results));
    }, [searchTerm])

    return (
        <div>
            <Header />
            <h1>Search Results</h1>
            {searchResult && <MovieBox movies={searchResult} />}
        </div>
    )
}

export default SearchResult
