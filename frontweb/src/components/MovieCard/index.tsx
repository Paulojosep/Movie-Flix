import './styles.css';

import { Movie } from '../../types/Movie';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="base-card movie-card">
      <div className="card-top-container">
        <img src={movie.imgUrl} alt={movie.title}/>
      </div>
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <h6>{movie.year}</h6>
      </div>
    </div>
  );
};

export default MovieCard;
