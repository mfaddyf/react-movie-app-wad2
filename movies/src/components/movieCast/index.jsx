import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Box from "@mui/material/Box";
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
    // Every card is the same width; the grid fits as many columns as there's room for
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 2,
      }}
    >
      {cast.map((person) => (
        <Card key={person.credit_id} sx={{ height: "100%" }}>
          <CardActionArea component={Link} to={`/actors/${person.id}`} sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start" }}>
            {/* TMDB profile photos are 2:3, so this ratio shows each photo in full, all at the same size */}
            <CardMedia
              sx={{ aspectRatio: "2 / 3" }}
              image={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : img
              }
              title={person.name}
            />
            <CardContent sx={{ p: 1.5 }}>
              <Typography variant="subtitle1">{person.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {person.character}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default MovieCast;