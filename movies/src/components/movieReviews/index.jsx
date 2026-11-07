import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useContext } from "react";
import { Link } from "react-router";
import { MoviesContext } from "../../contexts/moviesContext";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

// Same labels as the rating dropdown in the review form
const ratingLabels = { 5: "Excellent", 4: "Good", 3: "Average", 2: "Poor", 0: "Terrible" };

export default function MovieReviews({ movie }) {
  // Your own review for this movie (if you've written one), saved by the review form
  const { myReviews } = useContext(MoviesContext);
  const myReview = myReviews[movie.id];

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['reviews', { id: movie.id }],
    queryFn: getMovieReviews,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const reviews = data.results;


  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {myReview && (
        <Card sx={{ p: 2.5, borderColor: "primary.main" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, flexWrap: "wrap" }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
              {myReview.author?.[0]?.toUpperCase()}
            </Avatar>
            <Typography variant="subtitle1" component="h3">
              Your review, by {myReview.author}
            </Typography>
            <Chip label={`Rating: ${ratingLabels[myReview.rating]}`} color="primary" />
          </Box>
          {/* whiteSpace keeps any line breaks you typed in the form */}
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
            {myReview.review}
          </Typography>
        </Card>
      )}

      {reviews.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 2 }}>
          No TMDB reviews yet for this movie.
        </Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 550 }} aria-label="reviews table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Excerpt</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600, whiteSpace: "nowrap", verticalAlign: "top" }}>
                    {r.author}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", verticalAlign: "top" }}>{excerpt(r.content)}</TableCell>
                  <TableCell align="right" sx={{ verticalAlign: "top" }}>
                    <Button
                      component={Link}
                      to={`/reviews/${r.id}`}
                      state={{
                        review: r,
                        movie: movie,
                      }}
                      size="small"
                      variant="outlined"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Full Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}