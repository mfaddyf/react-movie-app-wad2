import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";
import WriteReview from "../components/cardIcons/writeReview";

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  // One query per movie in the list, run in parallel.
  // Each uses the same ['movie', { id }] key as the details page,
  // so movies you've already opened come straight from the cache.
  const mustWatchQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = mustWatchQueries.find((m) => m.isPending === true);
  if (isPending) {
    return <Spinner />;
  }

  const failedQuery = mustWatchQueries.find((m) => m.isError === true);
  if (failedQuery) {
    return <h1>{failedQuery.error.message}</h1>;
  }

  // The single-movie endpoint returns `genres`, but the genre filter
  // expects `genre_ids`, so build that list for each movie.
  const movies = mustWatchQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="Must Watch"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromMustWatch movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default MustWatchMoviesPage;