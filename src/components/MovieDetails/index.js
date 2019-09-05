import React, { useState, useEffect } from 'react'
import { API_KEY, BASE_URL, MOVIE_LINK } from '../../api'
import Header from '../Header'
import MovieBox from '../MovieBox'
import './index.css'

const Movie = (props) => {
    const movieId = props.match.params.id

    const [movie, setMovieDetails] = useState(null)
    const [movieReviews, setMovieReviews] = useState(null)
    const [similarMovies, setSimilarMovies] = useState(null)
    let movieTrailer

    if (movie) {
        movieTrailer = movie.videos.results.find(video => video.type === 'Trailer')
    }

    useEffect(() => {
        fetch(`${BASE_URL}${MOVIE_LINK}/${movieId}?api_key=${API_KEY}&append_to_response=videos`)
            .then(response => response.json())
            .then(movie => setMovieDetails(movie))

        fetch(`${BASE_URL}${MOVIE_LINK}/${movieId}/reviews?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(reviews => setMovieReviews(reviews.results))

        fetch(`${BASE_URL}${MOVIE_LINK}/${movieId}/similar?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movies => setSimilarMovies(movies.results))
    }, [movieId])

    return (movie
        ? <div>
            <Header />
            <div className="Movie-wrapper">
                <div className="movie-content">
                    <div>
                        <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                    </div>
                    <div className="movie-data">
                        <h1 className="movie-title">{movie.title}</h1>

                        {movieTrailer &&
                            <h3><a href={`https://www.youtube.com/watch?v=${movieTrailer.key}`} target={"_blank"}>
                                Watch trailer
                            </a></h3>}

                        <h3 className="movie-info-title">Overview:</h3>
                        <span className="movie-info">{movie.overview}</span>
                        <h3 className="movie-info-title">Release date:</h3>
                        <span className="movie-info">{movie.release_date}</span>
                        <h3 className="movie-info-title">Budget:</h3>
                        <span className="movie-info">${movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <h3 className="movie-info-title">Revenue:</h3>
                        <span className="movie-info">${movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <h3 className="movie-info-title">Average Rating Score:</h3>
                        <span className="movie-info">{movie.vote_average}</span>
                    </div>
                </div>

                <div>
                    {movieReviews &&
                        <div className="reviews">
                            <h3 className="similar-movie-heading">Reviews</h3>
                            {movieReviews.map(review => <div className="review">
                                <span className="review-author">{review.author} said:</span>
                                <span className="review-content">{review.content}</span>
                            </div>)}
                        </div>
                    }
                </div>

                <div>
                    {similarMovies &&
                        <div>
                            <h3 className="similar-movie-heading">You might be interested in</h3>
                            <MovieBox movies={similarMovies} />
                        </div>}
                </div>
            </div>
        </div>

        : <p>Loading...</p>
    )
}

export default Movie