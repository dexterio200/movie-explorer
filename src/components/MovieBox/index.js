import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function MovieBox(props) {
    const { movies } = props
    const titleURL = (title) => title.replace(/\W+/g, '-').toLowerCase()

    return (
        <div className="list-container">
            {movies.map(movie =>
                movie.poster_path
                    ? <div key={movie.id} className="list-container__movie-box">
                        <span className="movie-box__movie-vote-average">{movie.vote_average}</span>

                        <div className="movie-box__movie-image">
                            <div>
                                <Link className="movie-box__movie-image-link" to={`/movie/${movie.id}-${titleURL(movie.title)}`}><img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`} alt={movie.title} /></Link>
                            </div>
                        </div>

                        <div className="movie-box__movie-title">
                            {movie.title}
                        </div>
                    </div>

                    : <div key={movie.id} className="list-container__movie-box">
                        <div>
                            <Link to={`/movie/${movie.id}-${titleURL(movie.title)}`}><div className="movie-box__movie-no_image_holder"></div></Link>
                        </div>

                        <div className="movie-box__movie-title">
                            {movie.title}
                        </div>
                    </div>
            )}
        </div>
    )
}

export default MovieBox 
