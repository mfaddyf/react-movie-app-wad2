import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Spinner from "../components/spinner";
import { getActor } from "../api/tmdb-api";
import img from "../images/film-poster-placeholder.png";
import ActorMovies from "../components/actorMovies";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ["actor", { id: id }],
    queryFn: getActor,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <Grid container spacing={4} sx={{ padding: "20px" }}>
      <Grid size={{ xs: 12, md: 3 }}>
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : img
          }
          alt={actor.name}
          style={{ width: "100%", borderRadius: 8 }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Typography variant="h3" component="h2">
          {actor.name}
        </Typography>
        <Paper
          component="ul"
          sx={{ display: "flex", flexWrap: "wrap", listStyle: "none", gap: 1, p: 1.5, my: 2 }}
        >
          <li>
            <Chip label={actor.known_for_department} color="primary" />
          </li>
          {actor.birthday && (
            <li>
              <Chip label={`Born: ${actor.birthday}`} />
            </li>
          )}
          {actor.place_of_birth && (
            <li>
              <Chip label={actor.place_of_birth} />
            </li>
          )}
          {actor.deathday && (
            <li>
              <Chip label={`Died: ${actor.deathday}`} />
            </li>
          )}
        </Paper>
        <Typography variant="h5" component="h3">
          Biography
        </Typography>
        <Typography variant="body1">
          {actor.biography || "No biography available."}
        </Typography>
        <ActorMovies actorId={id} />
      </Grid>
    </Grid>
  );
};

export default ActorDetailsPage;