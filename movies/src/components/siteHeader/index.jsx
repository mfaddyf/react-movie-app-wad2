import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  // Used to highlight the link for the page you're currently on
  const { pathname } = useLocation();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing", path: "/movies/now-playing" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Must Watch", path: "/movies/must-watch" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    // position="sticky" keeps the bar at the top without needing a spacer underneath it
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(16,16,20,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56 }, gap: 2 }}>
        <Box
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", mr: "auto" }}
        >
          <MovieFilterIcon color="primary" />
          <Typography variant="h6" component="span" sx={{ letterSpacing: 0.5 }}>
            TMDB Client
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: "none", lg: "block" }, ml: 1 }}
          >
            All you ever wanted to know about Movies!
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              {menuOptions.map((opt) => (
                <MenuItem
                  key={opt.label}
                  selected={pathname === opt.path}
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {menuOptions.map((opt) => {
              const active = pathname === opt.path;
              return (
                <Button
                  key={opt.label}
                  size="small"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={{
                    px: 1.5,
                    borderRadius: 5,
                    color: active ? "primary.contrastText" : "text.secondary",
                    bgcolor: active ? "primary.main" : "transparent",
                    "&:hover": { bgcolor: active ? "primary.dark" : "action.hover", color: active ? "primary.contrastText" : "text.primary" },
                  }}
                >
                  {opt.label}
                </Button>
              );
            })}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SiteHeader;