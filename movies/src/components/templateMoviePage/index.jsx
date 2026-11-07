import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import MovieHeader from "../headerMovie";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";

const TemplateMoviePage = ({ movie, children }) => {
    const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id }],
    queryFn: getMovieImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data.posters 

  return (
    <>
      <MovieHeader movie={movie} />

      <Container maxWidth="xl" sx={{ pb: 6 }}>
        {/* Page content on the left, poster gallery as a sidebar on the right */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 280px" },
            gap: 4,
            alignItems: "start",
          }}
        >
          <Box sx={{ minWidth: 0 }}>{children}</Box>

          {images.length > 0 && (
            <Card sx={{ p: 1.5, position: { md: "sticky" }, top: { md: 76 } }}>
              <Typography variant="subtitle1" sx={{ mb: 1, px: 0.5 }}>
                Posters ({images.length})
              </Typography>
              {/* Scrolls inside the card so a long list of posters doesn't stretch the page */}
              <ImageList cols={2} gap={8} sx={{ m: 0, maxHeight: "70vh" }}>
                {images.map((image) => (
                  <ImageListItem key={image.file_path}>
                    <img
                      src={`https://image.tmdb.org/t/p/w342/${image.file_path}`}
                      alt={movie.title}
                      loading="lazy"
                      style={{ aspectRatio: "2 / 3", objectFit: "cover", borderRadius: 6 }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Card>
          )}
        </Box>
      </Container>
    </>
  );
};

export default TemplateMoviePage;