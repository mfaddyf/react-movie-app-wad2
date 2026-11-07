import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import Spinner from "../components/spinner";
import { getActor } from "../api/tmdb-api";
import img from "../images/film-poster-placeholder.png";
import ActorMovies from "../components/actorMovies";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ["actor", { id: id }],
    queryFn: getActor,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <Container maxWidth="xl" sx={{ py: 3, pb: 6 }}>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <IconButton aria-label="go back" size="small" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton aria-label="go forward" size="small" onClick={() => navigate(+1)}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      {/* Photo on the left, details on the right; stacks on small screens */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "200px 1fr", md: "260px 1fr" },
          gap: 4,
          alignItems: "start",
        }}
      >
        <Box
          component="img"
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : img
          }
          alt={actor.name}
          sx={{
            width: { xs: 180, sm: "100%" },
            aspectRatio: "2 / 3",
            objectFit: "cover",
            borderRadius: 2,
            boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
            position: { sm: "sticky" },
            top: { sm: 76 },
          }}
        />

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h3" component="h1">
            {actor.name}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
            <Chip label={actor.known_for_department} color="primary" />
            {actor.birthday && <Chip icon={<CakeIcon />} label={`Born: ${actor.birthday}`} />}
            {actor.place_of_birth && <Chip icon={<PlaceIcon />} label={actor.place_of_birth} />}
            {actor.deathday && <Chip label={`Died: ${actor.deathday}`} />}
          </Box>

          <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
            Biography
          </Typography>
          {/* whiteSpace keeps the paragraph breaks from TMDB's biography text */}
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 900, whiteSpace: "pre-line" }}>
            {actor.biography || "No biography available."}
          </Typography>

          <ActorMovies actorId={id} />
        </Box>
      </Box>
    </Container>
  );
};

export default ActorDetailsPage;