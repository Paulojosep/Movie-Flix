import React, { useEffect, useState } from 'react';
import { Genre } from '../../../../types/Genre';
import { requestBackend } from '../../../../util/request';
import Select from 'react-select';

export type FilterForm = {
  genreId?: number;
};

type Props = {
  onSearch: (filter: FilterForm) => void;
};

const FiltersMovies = ({ onSearch }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genre, setGenre] = useState<Genre>();

  useEffect(() => {
    requestBackend({ url: '/genres' }).then((response) =>
      setGenres(response.data.content)
    );
  }, []);

  const handleChangeGenre = (genre: Genre) => {
    setGenre(genre);
    onSearch({ genreId: genre?.id });
  };

  return (
    <div className="catalog-container">
      <div className="catalog-content-search">
        <Select
          options={genres}
          name="Genre"
          key={`select-${genre?.id}`}
          value={genre}
          inputId="genries"
          getOptionLabel={(option: Genre) => option.name}
          getOptionValue={(option: Genre) => String(option.id)}
          classNamePrefix="catalog-select"
          placeholder="Gêneros de Filmes"
          onChange={(value) => handleChangeGenre(value as Genre)}
          isClearable
        />
      </div>
    </div>
  );
};
