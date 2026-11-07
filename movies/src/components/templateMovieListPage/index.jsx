import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { searchMovies, getFilteredMovies } from "../../api/tmdb-api";
import Spinner from "../spinner";
import LinearProgress from "@mui/material/LinearProgress";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const genreId = Number(genreFilter);

  // --- Search and filter all of TMDB ---
  // Only on the TMDB list pages (the ones with pagination). Favourites and
  // Must Watch keep filtering just their own movies, like before.
  const canSearchAll = totalPages !== undefined;

  // Copy of the filters that only updates once you've stopped typing / dragging for 400ms,
  // so we don't send a request on every key press or every step of the rating slider
  const [applied, setApplied] = useState({ text: "", genre: "0", year: "all", rating: 0, sort: "default" });
  useEffect(() => {
    const timer = setTimeout(() => {
      setApplied({ text: nameFilter.trim(), genre: genreFilter, year: yearFilter, rating: ratingFilter, sort: sortBy });
    }, 400);
    return () => clearTimeout(timer);
  }, [nameFilter, genreFilter, yearFilter, ratingFilter, sortBy]);

  const [resultsPage, setResultsPage] = useState(1);

  // Three modes:
  //  - searching: text typed      -> /search/movie (title + year), genre/rating filtered on each results page
  //  - filtering: genre/year/rating set, no text -> /discover/movie does all the filtering
  //  - neither: show this page's normal list (Popular, Top Rated, etc.)
  const isSearching = canSearchAll && applied.text.length > 0;
  const isFiltering =
    canSearchAll && !isSearching &&
    (Number(applied.genre) > 0 || applied.year !== "all" || applied.rating > 0);

  const searchQuery = useQuery({
    queryKey: ["search", { query: applied.text, year: applied.year, page: resultsPage }],
    queryFn: searchMovies,
    enabled: isSearching, // only runs when there's something to search for
    placeholderData: keepPreviousData,
  });

  const filterQuery = useQuery({
    queryKey: ["filtered", { genre: applied.genre, year: applied.year, rating: applied.rating, sort: applied.sort, page: resultsPage }],
    queryFn: getFilteredMovies,
    enabled: isFiltering,
    placeholderData: keepPreviousData,
  });

  // Whichever query is in use right now (or none)
  const activeQuery = isSearching ? searchQuery : isFiltering ? filterQuery : null;
  const resultsData = activeQuery?.data;

  // Results from TMDB replace this page's movies while searching or filtering
  const sourceMovies = activeQuery ? resultsData?.results ?? [] : movies;

  // Year dropdown: every year on the TMDB pages (so you can pick any year),
  // or just the years in your own list on Favourites / Must Watch
  const thisYear = new Date().getFullYear();
  const years = canSearchAll
    ? Array.from({ length: thisYear + 2 - 1900 }, (_, i) => String(thisYear + 1 - i))
    : [...new Set(movies.map((m) => m.release_date?.slice(0, 4)).filter(Boolean))].sort().reverse();

  // Comparison functions for each sort option in the filter card
  const sorters = {
    ratingDesc: (a, b) => b.vote_average - a.vote_average,
    ratingAsc: (a, b) => a.vote_average - b.vote_average,
    dateDesc: (a, b) => (b.release_date || "").localeCompare(a.release_date || ""),
    dateAsc: (a, b) => (a.release_date || "").localeCompare(b.release_date || ""),
    titleAsc: (a, b) => a.title.localeCompare(b.title),
    titleDesc: (a, b) => b.title.localeCompare(a.title),
  };

  // On the TMDB pages, filter with the same (delayed) values that were sent to TMDB,
  // so the grid doesn't flash "no movies" while new results are still loading
  const localGenre = canSearchAll ? Number(applied.genre) : genreId;
  const localRating = canSearchAll ? applied.rating : ratingFilter;
  const localYear = canSearchAll ? applied.year : yearFilter;

  let displayedMovies = sourceMovies
    .filter((m) => {
      // TMDB has already matched the title when searching, so only filter by title locally otherwise
      return isSearching || m.title.toLowerCase().includes(nameFilter.toLowerCase());
    })
    .filter((m) => {
      return localGenre > 0 ? m.genre_ids?.includes(localGenre) : true;
    })
    .filter((m) => {
      return (m.vote_average ?? 0) >= localRating;
    })
    .filter((m) => {
      return localYear === "all" ? true : m.release_date?.startsWith(localYear);
    });

  // .filter() above returns a new array, so sorting it doesn't change the original movies prop
  if (sorters[sortBy]) {
    displayedMovies.sort(sorters[sortBy]);
  }

  const handleChange = (type, value) => {
    setResultsPage(1); // changing a search or filter starts back on page 1
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "sort") setSortBy(value);
  };

  // Pagination follows the TMDB results while searching/filtering, otherwise the normal list
  const currentPage = activeQuery ? resultsPage : page;
  const pageCount = activeQuery ? Math.min(resultsData?.total_pages ?? 0, 500) : totalPages;
  const changePage = activeQuery ? setResultsPage : onPageChange;

  const heading = isSearching
    ? `Search results for "${applied.text}"`
    : isFiltering
      ? "Filtered movies"
      : title;

  // What to show in the movie area: error, spinner on the first load, empty message, or the grid
  let content;
  if (activeQuery?.isError) {
    content = <Typography color="error" sx={{ py: 6, textAlign: "center" }}>{activeQuery.error.message}</Typography>;
  } else if (activeQuery && !resultsData) {
    content = <Spinner />;
  } else if (displayedMovies.length === 0) {
    content = (
      <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
        {isSearching ? `No movies found for "${applied.text}" with these filters.` : "No movies match these filters."}
      </Typography>
    );
  } else {
    content = <MovieList action={action} movies={displayedMovies}></MovieList>;
  }

  return (
    <Container maxWidth="xl" sx={{ pb: 6 }}>
      <Header title={heading} />
      {/* Sidebar (filters) on the left, movie grid on the right; stacks on small screens */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* sticky: the filter card stays in view while you scroll the movies */}
        <Box sx={{ position: { md: "sticky" }, top: { md: 76 } }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            yearFilter={yearFilter}
            years={years}
            sortBy={sortBy}
            searchLabel={canSearchAll ? "Search all movies" : "Search by title"}
          />
        </Box>

        <Box>
          {/* Thin loading bar while new results load (the old ones stay on screen meanwhile) */}
          {activeQuery?.isFetching && resultsData && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

          {content}

          {/* Only list pages that pass totalPages get pagination (not favourites / must watch) */}
          {pageCount > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
              <Pagination
                count={pageCount}
                page={currentPage}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                onChange={(e, value) => {
                  changePage(value);
                  window.scrollTo(0, 0);
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
export default MovieListPageTemplate;