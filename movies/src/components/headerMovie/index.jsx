import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import StarRateIcon from "@mui/icons-material/StarRate";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import { useNavigate } from "react-router";
import img from "../../images/film-poster-placeholder.png";

// One small icon + text item in the row of quick facts under the title
const Fact = ({ icon, children }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
    {icon}
    <Typography variant="body2" component="span">{children}</Typography>
  </Box>
);

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();
  const year = movie.release_date?.slice(0, 4);

  return (
    // Full-width banner: the movie's backdrop image, darkened by a gradient so the text stays readable
    <Box
      sx={{
        position: "relative",
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(16,16,20,0.97) 0%, rgba(16,16,20,0.85) 45%, rgba(16,16,20,0.55) 100%), linear-gradient(0deg, #101014 0%, transparent 40%)",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", py: { xs: 2, md: 4 } }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <IconButton aria-label="go back" size="small" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton aria-label="go forward" size="small" onClick={() => navigate(+1)}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Box
            component="img"
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : img}
            alt={movie.title}
            sx={{
              display: { xs: "none", sm: "block" },
              width: { sm: 150, md: 190 },
              aspectRatio: "2 / 3",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
              flexShrink: 0,
            }}
          />

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h3" component="h1" sx={{ lineHeight: 1.2 }}>
              {movie.title}
              {year && (
                <Typography component="span" variant="h3" sx={{ fontWeight: 400, color: "text.secondary", ml: 1.5 }}>
                  ({year})
                </Typography>
              )}
            </Typography>

            {movie.tagline && (
              <Typography variant="body1" sx={{ fontStyle: "italic", color: "text.secondary", mt: 1 }}>
                {movie.tagline}
              </Typography>
            )}

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, mt: 2 }}>
              <Fact icon={<StarRateIcon sx={{ fontSize: 18, color: "#ffc107" }} />}>
                <strong>{movie.vote_average?.toFixed(1)}</strong> ({movie.vote_count?.toLocaleString()} votes)
              </Fact>
              {movie.runtime > 0 && (
                <Fact icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}>{movie.runtime} min</Fact>
              )}
              {movie.release_date && (
                <Fact icon={<CalendarIcon sx={{ fontSize: 16 }} />}>{movie.release_date}</Fact>
              )}
            </Box>

            {movie.homepage && (
              <Button
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                size="small"
                startIcon={<HomeIcon />}
                sx={{ mt: 2.5 }}
              >
                Official site
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MovieHeader;