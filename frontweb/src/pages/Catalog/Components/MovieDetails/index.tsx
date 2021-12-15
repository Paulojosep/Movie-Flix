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
};

const MovieDetails = () => {
  const { movieId } = useParams<ParamsType>();
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    makePrivateRequest({ url: `/movies/${movieId}/` })
      .then((response) => setMovie(response.data))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <>
      <div className="movie-details-info">
        {isLoading ? (
          <MovieCardLoader />
        ) : (
          <>
            <div className="movie-details-card">
              <img src={movie?.imgUrl} alt={movie?.title} />
            </div>
          </>
        )}
        <div className="movie-info-fields">
          {isLoading ? (
            <MovieCardLoader />
          ) : (
            <>
              <h1>{movie?.title}</h1>
              <h4>{movie?.year}</h4>
              <h6>{movie?.subTitle}</h6>
              <div className="movie-details-sinopse">
                <span>{movie?.synopsis}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {isLoading ? (
        <MovieCardLoader />
      ) : (
        hasAnyRoles(['ROLE_MEMBER']) && <MovieDetailsReviews id={movieId} />
      )}

      <div className="movie-coments-card">
        {movie?.reviews.map((review) => (
          <MovieDetailsComment
            key={review.id}
            commentReview={review.text}
            autorReview={review.user.name}
          />
        ))}
      </div>
    </>
  );
};

export default MovieDetails;
