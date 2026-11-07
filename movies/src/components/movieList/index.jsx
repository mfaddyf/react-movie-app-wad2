import React from "react";
import Movie from "../movieCard/";
import Box from "@mui/material/Box";

const MovieList = (props) => {
  // CSS grid: fits as many 170px+ columns as the space allows, all the same width
  // (always 2 columns on phones so the cards don't take up the whole screen)
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(auto-fill, minmax(170px, 1fr))" },
        gap: { xs: 1.5, sm: 2.5 },
      }}
    >
      {props.movies.map((m) => (
        <Movie key={m.id} movie={m} action={props.action} />
      ))}
    </Box>
  );
};

export default MovieList;