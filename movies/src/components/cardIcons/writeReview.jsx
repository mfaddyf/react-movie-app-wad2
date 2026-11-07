import RateReviewIcon from "@mui/icons-material/RateReview";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router";

const WriteReviewIcon = ({ movie }) => {
  // IconButton rendered as a Link, so it lines up with the other card icons
  return (
    <IconButton
      aria-label="write review"
      component={Link}
      to={`/reviews/form`}
      state={{
          movieId: movie.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="small" />
    </IconButton>
  );
};

export default WriteReviewIcon;