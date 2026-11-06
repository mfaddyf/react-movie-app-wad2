import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const genreId = Number(genreFilter);
  // Release years present in this list, newest first, for the year dropdown
  const years = [...new Set(movies.map((m) => m.release_date?.slice(0, 4)).filter(Boolean))].sort().reverse();

  // Comparison functions for each sort option in the filter card
  const sorters = {
    ratingDesc: (a, b) => b.vote_average - a.vote_average,
    ratingAsc: (a, b) => a.vote_average - b.vote_average,
    dateDesc: (a, b) => (b.release_date || "").localeCompare(a.release_date || ""),
    dateAsc: (a, b) => (a.release_date || "").localeCompare(b.release_date || ""),
    titleAsc: (a, b) => a.title.localeCompare(b.title),
    titleDesc: (a, b) => b.title.localeCompare(a.title),
  };

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().includes(nameFilter.toLowerCase());
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return (m.vote_average ?? 0) >= ratingFilter;
    })
    .filter((m) => {
      return yearFilter === "all" ? true : m.release_date?.startsWith(yearFilter);
    });

  // .filter() above returns a new array, so sorting it doesn't change the original movies prop
  if (sorters[sortBy]) {
    displayedMovies.sort(sorters[sortBy]);
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "sort") setSortBy(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            yearFilter={yearFilter}
            years={years}
            sortBy={sortBy}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
        {/* Only list pages that pass totalPages get pagination (not favourites / must watch) */}
        {totalPages > 1 && (
          <Grid size={12} sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              color="primary"
              showFirstButton
              showLastButton
              onChange={(e, value) => {
                onPageChange(value);
                window.scrollTo(0, 0);
              }}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;