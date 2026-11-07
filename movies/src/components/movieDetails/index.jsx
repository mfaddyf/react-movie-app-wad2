import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import PublicIcon from "@mui/icons-material/Public";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useState } from "react";
import MovieReviews from "../movieReviews";
import MovieCast from "../movieCast";

// Section label used inside the Overview tab
const Label = ({ children }) => (
    <Typography variant="body2" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, mb: 1 }}>
        {children}
    </Typography>
);

const MovieDetails = ({ movie }) => {
    // Which tab is showing: 0 = Overview, 1 = Cast, 2 = Reviews
    const [tab, setTab] = useState(0);

    return (
        <>
            <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
            >
                <Tab icon={<InfoIcon fontSize="small" />} iconPosition="start" label="Overview" />
                <Tab icon={<PeopleIcon fontSize="small" />} iconPosition="start" label="Cast" />
                <Tab icon={<RateReviewIcon fontSize="small" />} iconPosition="start" label="Reviews" />
            </Tabs>

            {/* Overview tab */}
            {tab === 0 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box>
                        <Label>Overview</Label>
                        <Typography variant="body1" sx={{ maxWidth: 800 }}>
                            {movie.overview}
                        </Typography>
                    </Box>

                    <Box>
                        <Label>Genres</Label>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {movie.genres.map((g) => (
                                <Chip key={g.name} label={g.name} color="primary" variant="outlined" />
                            ))}
                        </Box>
                    </Box>

                    {/* Small info cards that wrap onto new rows on narrow screens */}
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
                        <Card sx={{ p: 2 }}>
                            <Label>Revenue</Label>
                            <Typography variant="h6" component="p" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <MonetizationIcon fontSize="small" color="primary" />
                                {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "Not reported"}
                            </Typography>
                        </Card>
                        <Card sx={{ p: 2 }}>
                            <Label>Production Countries</Label>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                                <PublicIcon fontSize="small" color="primary" />
                                {movie.production_countries.map((c) => (
                                    <Chip key={c.iso_3166_1} label={c.name} />
                                ))}
                            </Box>
                        </Card>
                    </Box>
                </Box>
            )}

            {/* Cast tab: each actor links to their own details page */}
            {tab === 1 && <MovieCast movie={movie} />}

            {/* Reviews tab: replaces the old pop-out drawer */}
            {tab === 2 && <MovieReviews movie={movie} />}
        </>
    );
};
export default MovieDetails;