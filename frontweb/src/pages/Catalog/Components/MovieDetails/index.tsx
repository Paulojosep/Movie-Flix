import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Movie } from '../../../../types/Movie';
import { hasAnyRoles } from '../../../../util/auth';
import { makePrivateRequest } from '../../../../util/request';
import MovieCardLoader from '../Loaders/MovieCardLoaders';
import MovieDetailsComment from '../MovieDetailsComment';
import MovieDetailsReviews from '../MovieDetailsReviews';
import './styles.css';

type ParamsType = {
    movieId: string;
}

const MovieDetails = () => {
    const { movieId } = useParams<ParamsType>();
    const [movie, setMovie] = useState<Movie>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        makePrivateRequest({ url: `/movies/${movieId}/` })
        .then(response => setMovie(response.data))
        .finally(() => setIsLoading(false))
    }, [movieId])

    return (
        <>
        <div className="container">
            <Link to="/movies" className="movie-details-goback">
                <h1 className="text-goback">Voltar</h1>
            </Link>
            <div className="movie-details-info">
                {isLoading ? (
                    <MovieCardLoader />
                ) : (
                    <>
                    <div className="movie-details-card">
                        <img className="movie-details-image" src={movie?.imgUrl} alt={movie?.title} />
                    </div>
                    </>
                )}
                <div className="movie-info-fields">
                    {isLoading ? (
                        <MovieCardLoader />
                    ) : (
                        <>
                        <h1 className="movie-details-name">{movie?.title}</h1>
                        <h4 className="movie-details-year">{movie?.year}</h4>
                        <h6 className="movie-details-subtitle">{movie?.subTitle}</h6>
                        <div className="movie-details-sinopse">
                            <span>{movie?.synopsis}</span>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>

        {isLoading ? (
            <MovieCardLoader />
        ) : (
            hasAnyRoles(['ROLE_MEMBER']) && <MovieDetailsReviews id={movieId} />
        )}

        {movie?.reviews.map((review) => (
            <MovieDetailsComment
            key={review.id}
            commentReview={review.text}
            autorReview={review.user.name}
            />
        ))}
        </>
    );
};

export default MovieDetails;