import React, { useState, useEffect } from 'react'
import { API_KEY, BASE_URL, MOVIE_LINK } from '../../api'
import Header from '../Header'
import './index.css'

const Movie = (props) => {
    const movieId = props.match.params.id

    const [movie, setMovieDetails] = useState(null)
    useEffect(() => {
        fetch(`${BASE_URL}${MOVIE_LINK}/${movieId}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movie => setMovieDetails(movie))
    }, [movieId])

    return (movie &&
        <div>
            <Header />
            <div className="Movie-wrapper">
                <div className="movie-content">
                    <div>
                        <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                    </div>
                    <div className="movie-data">
                        <h1 className="movie-title">{movie.title}</h1>
                        <h3 className="movie-info-title">Overview:</h3>
                        <span className="movie-info">{movie.overview}</span>
                        <h3 className="movie-info-title">Release date:</h3>
                        <span className="movie-info">{movie.release_date}</span>
                        <h3 className="movie-info-title">Budget:</h3>
                        <span className="movie-info">${movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <h3 className="movie-info-title">Revenue:</h3>
                        <span className="movie-info">${movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <h3 className="movie-info-title">Average Rating Score:</h3>
                        <span className="movie-info-vote_average">{movie.vote_average}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie