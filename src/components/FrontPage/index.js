import React, { useState, useEffect } from 'react';
import Header from '../Header'
import { API_KEY, BASE_URL, DISCOVER_LINK, MOVIE_LINK } from '../../api';

const dt = new Date()
const currentDate = dt.toISOString().split('T')[0]
const priorDate = new Date(dt.setDate(dt.getDate() - 35)).toISOString().split('T')[0]

const FrontPage = () => {
    const [moviesInTheaters, setMoviesInTheaters] = useState([])
    useEffect(() => {
        fetch(`${BASE_URL}${DISCOVER_LINK}${MOVIE_LINK}?primary_release_date.gte=${priorDate}&primary_release_date.lte=${currentDate}&api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movies => setMoviesInTheaters(movies.results))
    }, [moviesInTheaters])

    const [popularMovies, setPopularMovies] = useState([])
    useEffect(() => {
        fetch(`${BASE_URL}${DISCOVER_LINK}${MOVIE_LINK}?sort_by=popularity.desc&api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movies => setPopularMovies(movies.results))
    }, [popularMovies])

    const [topRatedMovies, setTopRatedMovies] = useState([])
    useEffect(() => {
        fetch(`${BASE_URL}${DISCOVER_LINK}${MOVIE_LINK}?sort_by=vote_average.desc&api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movies => setTopRatedMovies(movies.results))
    }, [topRatedMovies])

    return (
        <div>
            <Header />
            <h3>In Theaters</h3>
            <ul>
                {moviesInTheaters.length !== 0 
                    ? moviesInTheaters.map(movie =>
                        <li key={movie.id}>{movie.title}</li>)
                    : 'Loading...'
                }
            </ul>

            <h3>Popular</h3>
            <ul>
                {popularMovies.length !== 0 
                    ? popularMovies.map(movie =>
                        <li key={movie.id}>{movie.title}</li>)
                    : 'Loading...'
                }
            </ul>

            <h3>Top Rated</h3>
            <ul>
                {topRatedMovies.length !== 0 
                    ? topRatedMovies.map(movie =>
                        <li key={movie.id}>{movie.title}</li>)
                    : 'Loading...'
                }
            </ul>
        </div>
    )
}

export default FrontPage
