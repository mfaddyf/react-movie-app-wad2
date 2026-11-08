# React Movies App: Web App Development 2, Assignment One

**Student:** Madison Roche (20112525)
**Module:** Web App Development 2, SETU Waterford

A React single-page app for browsing movies and actors with data from [The Movie Database (TMDB) API](https://developer.themoviedb.org/reference/intro/getting-started). It extends the app built in the React Movies labs (Movie Lab 3) with new TMDB endpoints, linked movie and actor pages, a Must Watch list, search and filtering across all of TMDB, pagination, a custom Material UI theme and a redesigned layout.

The app is in the [`movies`](./movies) folder.

---

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/) 22.13 or newer (20.19+ also works), which includes npm
- A free TMDB API key (TMDB account → Settings → API)

### Setup
```bash
git clone https://github.com/mfaddyf/react-movie-app-wad2.git
cd react-movie-app-wad2/movies
npm install
```

Create a file called `.env` in the `movies` folder with your TMDB key:
```
VITE_TMDB_KEY=your_tmdb_api_key
```

### Run
```bash
npm run dev
```
Then open the local address Vite prints (usually http://localhost:5173).

| Script | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

---

## Tech stack
- **React 19** with **Vite**
- **React Router**: client-side routing
- **TanStack Query (react-query)**: data fetching and caching for every TMDB request
- **Material UI (MUI)**: components, icons and theming
- **React Hook Form**: review form validation
- **TMDB API**: all movie, actor and review data

---

## Features

### 1. New TMDB endpoints

**Static endpoints** (each has its own page, route and header link):

| TMDB endpoint | API function | Page | Route |
|---|---|---|---|
| `/movie/now_playing` | `getNowPlayingMovies` | `nowPlayingMoviesPage.jsx` | `/movies/now-playing` |
| `/movie/popular` | `getPopularMovies` | `popularMoviesPage.jsx` | `/movies/popular` |
| `/movie/top_rated` | `getTopRatedMovies` | `topRatedMoviesPage.jsx` | `/movies/top-rated` |

**Parameterised endpoints:**

| TMDB endpoint | API function | Used for |
|---|---|---|
| `/movie/{id}/credits` | `getMovieCredits` | Cast tab on the movie details page |
| `/person/{id}` | `getActor` | Actor details page (`/actors/:id`) |
| `/person/{id}/movie_credits` | `getActorMovieCredits` | "Known For" films on the actor page |
| `/search/movie?query=…` | `searchMovies` | Searching all of TMDB by title (plus optional year) |
| `/discover/movie?with_genres=…&primary_release_year=…&vote_average.gte=…&sort_by=…` | `getFilteredMovies` | Filtering all of TMDB by genre, year and minimum rating |

All list endpoints also take a `page` parameter for pagination. Every API function is in [`movies/src/api/tmdb-api.jsx`](./movies/src/api/tmdb-api.jsx).

**Linked information:** on a movie's Cast tab, each actor links to their actor page. The actor page lists the films they're known for, and each of those links back to its movie page. You can keep moving between movies and actors.

### 2. Functionality
- **Caching:** every TMDB request goes through react-query (`useQuery` / `useQueries`). Each page of results, each search and each set of filters has its own query key (e.g. `["popular", { page }]`), so revisiting something loads instantly from the cache.
- **Must Watch list** (works like Favourites): add upcoming movies with the playlist icon, view them on the Must Watch page, and remove them from there. Movies on the list get a badge on their poster. The state lives in `MoviesContext` (`addToMustWatch` / `removeFromMustWatch`).
- **Search:** on the TMDB list pages, the search box searches all of TMDB with `/search/movie`, not just the movies on screen. It waits 400ms after you stop typing before sending a request. Search results are paginated.
- **Filtering:** filter by genre, release year and minimum rating (slider). On the TMDB list pages these filters use `/discover/movie`, so they cover TMDB's whole catalogue. On Favourites and Must Watch they filter your own list.
- **Sorting:** six options: highest/lowest rated, newest/oldest and title A–Z/Z–A. When filters are active, the sort is also sent to TMDB (`sort_by`) so it orders all the results.

### 3. Additional work
- **Custom MUI theme** ([`src/theme.js`](./movies/src/theme.js)): dark mode, custom colour palette, Poppins font, a smaller type scale and component style overrides, applied app-wide with `ThemeProvider` and `CssBaseline`.
- **Pagination** on every TMDB list page, search and filter result, using MUI `Pagination`. `keepPreviousData` keeps the current results on screen while the next page loads.
- **Tabbed movie details page:** Overview / Cast / Reviews using MUI `Tabs` (this replaced the lab's pop-out reviews drawer).
- **Movie page banner:** the film's backdrop image (`backdrop_path` from TMDB, loaded at w1280) with a gradient overlay, plus the poster, tagline, rating, runtime, release date and a link to the official site.
- **Poster gallery:** a scrollable sidebar of the movie's posters using MUI `ImageList`.
- **Layout redesign:**
  - a sticky header that highlights the current page
  - a sticky filter sidebar
  - responsive CSS-grid layouts (two columns on phones)
  - movie cards with uncropped 2:3 posters and rating, favourite and must-watch badges
  - cast cards that show each actor's full photo at a consistent size
  - a redesigned actor page
- **Your reviews are displayed:** reviews written with the review form are saved in `MoviesContext` and in `localStorage`. They appear at the top of that movie's Reviews tab, and they're still there after a refresh.
- **New MUI components:** Pagination, Tabs/Tab, Slider, ImageList, LinearProgress, Avatar, Chip, Divider, CardActionArea and Container.

---

## Routes

| Route | Page |
|---|---|
| `/` | Discover movies (home) |
| `/movies/now-playing` | Now Playing |
| `/movies/popular` | Popular |
| `/movies/top-rated` | Top Rated |
| `/movies/upcoming` | Upcoming |
| `/movies/favorites` | Favourites |
| `/movies/must-watch` | Must Watch |
| `/movies/:id` | Movie details (Overview / Cast / Reviews tabs) |
| `/actors/:id` | Actor details and Known For films |
| `/reviews/:id` | Full TMDB review |
| `/reviews/form` | Write a review |

---

## Project structure

```
movies/
├── index.html              # Loads the Poppins font, sets the page title
└── src/
    ├── main.jsx            # Routes, react-query client, MUI ThemeProvider
    ├── theme.js            # Custom MUI theme
    ├── api/
    │   └── tmdb-api.jsx    # Every TMDB API call
    ├── contexts/
    │   └── moviesContext.jsx  # Favourites, Must Watch and your reviews
    ├── pages/              # One component per route
    └── components/
        ├── templateMovieListPage/  # List layout: filters, search, sorting, pagination
        ├── templateMoviePage/      # Movie layout: banner and poster gallery
        ├── headerMovie/            # Movie page backdrop banner
        ├── movieDetails/           # Overview / Cast / Reviews tabs
        ├── movieCast/              # Cast grid, linking to actor pages
        ├── actorMovies/            # Actor's "Known For" films
        ├── movieReviews/           # Your review plus the TMDB reviews table
        ├── filterMoviesCard/       # Search, filter and sort sidebar
        ├── movieCard/ movieList/   # Movie cards and responsive grid
        ├── siteHeader/             # Sticky header with active-page highlight
        └── cardIcons/              # Favourite, must watch, review and remove icons
```

---

## Notes and limitations
- Favourites and Must Watch are kept in memory, so they reset on a page refresh. Your own reviews are saved in `localStorage`.
- TMDB doesn't let apps post reviews, so reviews you write are stored only in your browser.

---

## Submission links
- **GitHub repository:** https://github.com/mfaddyf/react-movie-app-wad2
- **Demo video:** https://youtu.be/MfrISpaMPac