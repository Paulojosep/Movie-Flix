import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import { Genre } from '../../types/Genre';
import { Movie } from '../../types/Movie';
import { SpringPage } from '../../types/vendor/spring';
import { makePrivateRequest } from '../../util/request';
import MovieCardLoader from './Components/Loaders/MovieCardLoaders';
import './styles.css';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);
  const [genre] = useState<Genre>();

  const getMovies = useCallback(() => {
    const params = {
      genreId: genre?.id,
    };
    setIsLoading(true);
    makePrivateRequest({ url: '/movies', params })
      .then((response) => setPage(response.data))
      .finally(() => setIsLoading(false));
  }, [genre]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Tela listagem de filmes</h1>
      </div>

      <div className="row catalog-movies">
        {isLoading ? (
          <MovieCardLoader />
        ) : (
          page?.content.map((movie) => (
            <div className="col ">
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Catalog;
