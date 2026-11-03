import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";
import MovieList from "../movieList";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import { getActorMovieCredits } from "../../api/tmdb-api";

const ActorMovies = ({ actorId }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["actorMovies", { id: actorId }],
    queryFn: getActorMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  // An actor can appear in the same film more than once (e.g. two roles),
  // so remove duplicates, then show their most popular films first.
  const movies = data.cast
    .filter((m, index, arr) => arr.findIndex((x) => x.id === m.id) === index)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mt: 3 }}>
        Known For
      </Typography>
      <Grid container>
        <MovieList
          movies={movies}
          action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
      </Grid>
    </>
  );
};

export default ActorMovies;