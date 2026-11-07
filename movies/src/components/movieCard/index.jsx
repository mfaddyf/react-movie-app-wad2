import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Box from "@mui/material/Box";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

// Small round badge shown on top of the poster
const badge = { width: 28, height: 28, boxShadow: 3 };

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites, mustWatch } = useContext(MoviesContext);

  const isMustWatch = mustWatch.includes(movie.id);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 24px rgba(0,0,0,0.5)" },
      }}
    >
      {/* Clicking the poster or title also opens the movie details page */}
      <CardActionArea component={Link} to={`/movies/${movie.id}`} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start" }}>
        <Box sx={{ position: "relative" }}>
          {/* aspectRatio 2/3 matches TMDB posters, so the whole poster shows uncropped */}
          <CardMedia
            sx={{ aspectRatio: "2 / 3" }}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : img
            }
            title={movie.title}
          />
          {(movie.favorite || isMustWatch) && (
            <Box sx={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 0.5 }}>
              {movie.favorite && (
                <Avatar sx={{ ...badge, bgcolor: "error.main" }} title="In your favorites">
                  <FavoriteIcon sx={{ fontSize: 16 }} />
                </Avatar>
              )}
              {isMustWatch && (
                <Avatar sx={{ ...badge, bgcolor: "primary.main" }} title="On your must watch list">
                  <PlaylistAddCheckIcon sx={{ fontSize: 18 }} />
                </Avatar>
              )}
            </Box>
          )}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              alignItems: "center",
              gap: 0.25,
              px: 0.75,
              py: 0.25,
              borderRadius: 2,
              bgcolor: "rgba(0,0,0,0.75)",
            }}
          >
            <StarRateIcon sx={{ fontSize: 15, color: "#ffc107" }} />
            <Typography variant="body2" component="span" sx={{ fontWeight: 600 }}>
              {movie.vote_average?.toFixed(1)}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 1.5, pb: 1 }}>
          <Typography
            variant="subtitle1"
            component="p"
            title={movie.title}
            sx={{
              // Cut long titles off after two lines so every card lines up
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.6em",
            }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}
          >
            <CalendarIcon sx={{ fontSize: 14 }} />
            {movie.release_date || "TBA"}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing sx={{ px: 1, pt: 0, pb: 1, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>{action(movie)}</Box>

        <Button component={Link} to={`/movies/${movie.id}`} variant="outlined" size="small" color="primary">
          More Info
        </Button>
      </CardActions>
    </Card>
  );
}