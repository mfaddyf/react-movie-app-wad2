import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const MovieReview =  ({ review }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        {/* First letter of the author's name as a simple avatar */}
        <Avatar sx={{ bgcolor: "primary.main" }}>{review.author?.[0]?.toUpperCase()}</Avatar>
        <Typography variant="h5" component="h3">
          Review by {review.author}
        </Typography>
      </Box>

      {/* whiteSpace keeps the paragraph breaks from the original review */}
      <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: "pre-line", maxWidth: 850 }}>
        {review.content}
      </Typography>
    </Card>
  );
};
export default MovieReview