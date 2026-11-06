import { useState } from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const NowPlayingMoviesPage = () => {
  const [page, setPage] = useState(1);

  // The page number is part of the query key, so each page is cached separately.
  // keepPreviousData keeps the current movies on screen while the next page loads.
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["nowPlaying", { page }],
    queryFn: getNowPlayingMovies,
    placeholderData: keepPreviousData,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Now Playing"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
      page={page}
      // TMDB won't return anything past page 500
      totalPages={Math.min(data.total_pages, 500)}
      onPageChange={setPage}
    />
  );
};

export default NowPlayingMoviesPage;