import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
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

  const getMovies = useCallback((pageNumber: number) => {
    const params = {
      genreId: genre?.id,
      params: {
        page: pageNumber,
        size: 3,
      }
    };
    setIsLoading(true);
    makePrivateRequest({ url: '/movies', params })
      .then((response) => setPage(response.data))
      .finally(() => setIsLoading(false));
  }, [genre]);

  useEffect(() => {
    getMovies(0);
  }, [getMovies]);

  return (
    <div className="catalog-container">
      <div className="row">
        {isLoading ? (
          <MovieCardLoader />
        ) : (
          page?.content.map((movie) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="row">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChanges={getMovies}
        />
      </div>
    </div>
  );
};

export default Catalog;
