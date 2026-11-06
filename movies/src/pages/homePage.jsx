import { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const HomePage = (props) => {
  const [page, setPage] = useState(1);

  // The page number is part of the query key, so each page is cached separately.
  // keepPreviousData keeps the current movies on screen while the next page loads.
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover', { page }],
    queryFn: getMovies,
    placeholderData: keepPreviousData,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
      page={page}
      // TMDB won't return anything past page 500
      totalPages={Math.min(data.total_pages, 500)}
      onPageChange={setPage}
    />
  );

};
export default HomePage;