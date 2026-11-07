import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    // Your own reviews, keyed by movie id. Loaded from localStorage so they survive a page refresh.
    const [myReviews, setMyReviews] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("myReviews")) || {};
        } catch {
            return {};
        }
    })
    const [mustWatch, setMustWatch] = useState([]);

    const addReview = (movie, review) => {
        const updatedReviews = { ...myReviews, [movie.id]: review };
        setMyReviews(updatedReviews);
        localStorage.setItem("myReviews", JSON.stringify(updatedReviews));
    };

    const addToMustWatch = (movie) => {
        let newMustWatch = [];
        if (!mustWatch.includes(movie.id)) {
            newMustWatch = [...mustWatch, movie.id];
        } else {
            newMustWatch = [...mustWatch];
        }
        setMustWatch(newMustWatch);
    };

    const removeFromMustWatch = (movie) => {
        setMustWatch(mustWatch.filter(
            (mId) => mId !== movie.id
        ))
    };

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        }
        else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    // We will use this function in the next step
    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                myReviews,
                mustWatch,
                addToMustWatch,
                removeFromMustWatch,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;