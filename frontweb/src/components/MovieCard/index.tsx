import './styles.css';

import { Movie } from '../../types/Movie';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="base-card movie-card">
      <div className="card-top-container">
        <img src={movie.imgUrl} alt={movie.title} className="movie-card-image" />
      </div>
      <div className="movie-info">
        <h4 className="title">{movie.title}</h4>
        <h6 className="year">{movie.year}</h6>
      </div>
    </div>
  );
};

export default MovieCard;
