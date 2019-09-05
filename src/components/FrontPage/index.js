import React, { useState, useEffect } from 'react';
import { API_KEY, BASE_URL, DISCOVER_LINK, MOVIE_LINK, TOP_RATED_LINK } from '../../api';
import Header from '../Header'
import MovieBox from '../MovieBox'
import './index.css'

const dt = new Date()
const currentDate = dt.toISOString().split('T')[0]
const priorDate = new Date(dt.setDate(dt.getDate() - 35)).toISOString().split('T')[0]

const FrontPage = () => {
    const [moviesInTheaters, setMoviesInTheaters] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}${DISCOVER_LINK}${MOVIE_LINK}?primary_release_date.gte=${priorDate}&primary_release_date.lte=${currentDate}&api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movies => setMoviesInTheaters(movies.results))

        fetch(`${BASE_URL}${DISCOVER_LINK}${MOVIE_LINK}?sort_by=popularity.desc&api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movies => setPopularMovies(movies.results))

        fetch(`${BASE_URL}${MOVIE_LINK}${TOP_RATED_LINK}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movies => setTopRatedMovies(movies.results))
    }, [])

    return (
        <div>
            <Header />
            <h1>In Theaters</h1>
            {moviesInTheaters.length !== 0
                ? <MovieBox movies={moviesInTheaters} />
                : <p>Loading...</p>}

            <h1>Popular</h1>
            {popularMovies.length !== 0
                ? <MovieBox movies={popularMovies} />
                : <p>Loading...</p>}

            <h1>Top Rated</h1>
            {topRatedMovies.length !== 0
                ? <MovieBox movies={topRatedMovies} />
                : <p>Loading...</p>}
        </div>
    )
}

export default FrontPage
