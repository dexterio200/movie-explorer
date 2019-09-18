import React, { useState, useEffect } from 'react'
import { API_KEY, BASE_URL, MOVIE_LINK } from '../../api'
import Header from '../Header'
import MovieBox from '../MovieBox'
import ReadMoreReact from 'read-more-react'
import './index.css'

const Movie = (props) => {
    const movieId = props.match.params.id

    const [movie, setMovieDetails] = useState(null)
    const [movieReviews, setMovieReviews] = useState(null)
    const [similarMovies, setSimilarMovies] = useState(null)
    let movieTrailer = ''

    if (movie && movie.videos) {
        movieTrailer = movie.videos.results.find(video => video.type === 'Trailer')
    }

    useEffect(() => {
        fetch(`${BASE_URL}${MOVIE_LINK}/${movieId}?api_key=${API_KEY}&append_to_response=videos`)
            .then(response => response.json())
            .then(movie => setMovieDetails(movie))

        fetch(`${BASE_URL}${MOVIE_LINK}/${movieId}/reviews?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(reviews => {
                if (reviews.results.length !== 0)
                    setMovieReviews(reviews.results)
            })

        fetch(`${BASE_URL}${MOVIE_LINK}/${movieId}/similar?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movies => setSimilarMovies(movies.results))

        // Scroll to top
        setTimeout(async () => await window.scrollTo(0, 0), 200)
    }, [movieId])

    return (movie
        ? <div>
            <Header />
            <div className="Movie-wrapper">
                <div className="movie-content">
                    <div className="movie-poster">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie-poster" />
                    </div>
                    <div className="movie-data">
                        <h1 className="movie-title">{movie.title}</h1>

                        {movieTrailer !== '' &&
                            <h3 className="watch-trailer"><a href={`https://www.youtube.com/watch?v=${movieTrailer.key}`} target={"_blank"}>
                                Watch trailer
                            </a></h3>}

                        {movie.overview && <div>
                            <h3 className="movie-info-title">Overview:</h3>
                            <span className="movie-info">{movie.overview}</span>
                        </div>}
                        {movie.release_date && <div>
                            <h3 className="movie-info-title">Release date:</h3>
                            <span className="movie-info">{movie.release_date}</span>
                        </div>}
                        {!!movie.budget && movie.budget !== 0 && <div>
                            <h3 className="movie-info-title">Budget:</h3>
                            <span className="movie-info">${movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </div>}
                        {!!movie.revenue && movie.revenue !== 0 && <div>
                            <h3 className="movie-info-title">Revenue:</h3>
                            <span className="movie-info">${movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </div>}
                        {!!movie.vote_average && <div>
                            <h3 className="movie-info-title">Average Rating Score:</h3>
                            <span className="movie-info">{movie.vote_average}</span>
                        </div>}
                    </div>
                </div>
            </div>

            {movieReviews &&
                <div className="reviews">
                    <h3 className="review-similar-heading">Reviews</h3>
                    {movieReviews.map(review => <div key={review.id} className="review">
                        <span className="review-author">{review.author}:</span>
                        <span className="review-content">
                            <ReadMoreReact
                                text={review.content}
                                min={250}
                                ideal={320}
                                max={360}
                            ></ReadMoreReact>
                        </span>
                    </div>)}
                </div>
            }

            {similarMovies &&
                <div>
                    <h3 className="review-similar-heading">You might be interested in</h3>
                    <MovieBox movies={similarMovies} />
                </div>
            }
        </div>

        : <p>Loading...</p>
    )
}

export default Movie