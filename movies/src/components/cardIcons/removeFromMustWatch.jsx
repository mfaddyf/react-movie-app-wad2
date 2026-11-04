import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromMustWatch = (e) => {
    e.preventDefault();
    context.removeFromMustWatch(movie);
  };

  return (
    <IconButton
      aria-label="remove from must watch"
      onClick={handleRemoveFromMustWatch}
    >
      <PlaylistRemoveIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;