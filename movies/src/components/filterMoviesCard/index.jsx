import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import SortIcon from "@mui/icons-material/Sort";

const formControl =
{
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value);
    };

    const handleTextChange = (e, props) => {
        handleChange(e, "name", e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };

    const handleRatingChange = (e, value) => {
        handleChange(e, "rating", value);
    };

    const handleYearChange = (e) => {
        handleChange(e, "year", e.target.value);
    };

    const handleSortChange = (e) => {
        handleChange(e, "sort", e.target.value);
    };

    return (
        <Card
            sx={{
                backgroundColor: "rgb(204, 204, 0)"
            }}
            variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the movies.
                </Typography>
                <TextField
                    sx={{ ...formControl }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        defaultValue=""
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="year-label">Release year</InputLabel>
                    <Select
                        labelId="year-label"
                        id="year-select"
                        value={props.yearFilter}
                        onChange={handleYearChange}
                    >
                        <MenuItem value="all">All years</MenuItem>
                        {props.years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ ...formControl, px: 2, pt: 1, borderRadius: 1, boxSizing: "border-box" }}>
                    <Typography id="rating-slider-label" variant="body2">
                        Minimum rating: {props.ratingFilter}
                    </Typography>
                    <Slider
                        aria-labelledby="rating-slider-label"
                        value={props.ratingFilter}
                        onChange={handleRatingChange}
                        min={0}
                        max={10}
                        step={0.5}
                        marks={[
                            { value: 0, label: "0" },
                            { value: 5, label: "5" },
                            { value: 10, label: "10" },
                        ]}
                        valueLabelDisplay="auto"
                    />
                </Box>
            </CardContent>
            <CardMedia
                sx={{ height: 300 }}
                image={img}
                title="Filter"
            />
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SortIcon fontSize="large" />
                    Sort the movies.
                </Typography>
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        value={props.sortBy}
                        onChange={handleSortChange}
                    >
                        <MenuItem value="default">Default order</MenuItem>
                        <MenuItem value="ratingDesc">Highest rated</MenuItem>
                        <MenuItem value="ratingAsc">Lowest rated</MenuItem>
                        <MenuItem value="dateDesc">Newest first</MenuItem>
                        <MenuItem value="dateAsc">Oldest first</MenuItem>
                        <MenuItem value="titleAsc">Title A–Z</MenuItem>
                        <MenuItem value="titleDesc">Title Z–A</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
}
