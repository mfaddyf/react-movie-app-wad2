import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";
import { getMovieCredits } from "../../api/tmdb-api";
import img from "../../images/film-poster-placeholder.png";

const MovieCast = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const cast = data.cast.slice(0, 12);

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1 }}>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.map((person) => (
          <Grid key={person.credit_id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <Card>
              <CardActionArea component={Link} to={`/actors/${person.id}`}>
                <CardMedia
                  sx={{ height: 180 }}
                  image={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                      : img
                  }
                  title={person.name}
                />
                <CardContent>
                  <Typography variant="subtitle1">{person.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {person.character}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MovieCast;