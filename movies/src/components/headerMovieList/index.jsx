import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Header = (props) => {
  const title = props.title
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 2.5 }}>
      <Typography variant="h4" component="h1" sx={{ mr: "auto" }}>
        {title}
      </Typography>
      <IconButton aria-label="go back" size="small" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton aria-label="go forward" size="small" onClick={() => navigate(+1)}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default Header;