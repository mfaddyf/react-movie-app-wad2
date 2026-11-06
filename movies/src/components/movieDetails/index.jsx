import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import MovieReviews from "../movieReviews";
import MovieCast from "../movieCast";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
    // Which tab is showing: 0 = Overview, 1 = Cast, 2 = Reviews
    const [tab, setTab] = useState(0);

    return (
        <>
            <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
            >
                <Tab icon={<InfoIcon />} iconPosition="start" label="Overview" />
                <Tab icon={<PeopleIcon />} iconPosition="start" label="Cast" />
                <Tab icon={<RateReviewIcon />} iconPosition="start" label="Reviews" />
            </Tabs>

            {/* Overview tab */}
            {tab === 0 && (
                <Box>
                    <Typography variant="h5" component="h3">
                        Overview
                    </Typography>

                    <Typography variant="h6" component="p">
                        {movie.overview}
                    </Typography>

                    <Paper component="ul" sx={{ ...root }}>
                        <li>
                            <Chip label="Genres" sx={{ ...chip }} color="primary" />
                        </li>
                        {movie.genres.map((g) => (
                            <li key={g.name}>
                                <Chip label={g.name} sx={{ ...chip }} />
                            </li>
                        ))}
                    </Paper>
                    <Paper component="ul" sx={{ ...root }}>
                        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                        <Chip
                            icon={<MonetizationIcon />}
                            label={`${movie.revenue.toLocaleString()}`}
                        />
                        <Chip
                            icon={<StarRate />}
                            label={`${movie.vote_average} (${movie.vote_count})`}
                        />
                        <Chip label={`Released: ${movie.release_date}`} />
                    </Paper>
                    <Paper component="ul" sx={{ ...root }}>
                        <li>
                            <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
                        </li>
                        {movie.production_countries.map((c) => (
                            <li key={c.iso_3166_1}>
                                <Chip label={c.name} sx={{ ...chip }} />
                            </li>
                        ))}
                    </Paper>
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