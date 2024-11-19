import React, { useState, useEffect } from "react";
import "./App.css";

const ComedyMovies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("comedy");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 

    const API_KEY = "9a380a2f"; 
    const fetchMovies = async (query, page = 1) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie&page=${5}`
            );
            const data = await response.json();

            if (data.Response === "True") {
                setMovies((prevMovies) => [...prevMovies, ...data.Search]); 
                setHasMore(data.Search.length > 0); 
            } else {
                setError(data.Error);
                setHasMore(false); 
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMovies([]); 
        setPage(1); 
        setHasMore(true);
        fetchMovies(searchTerm, 1); 
    }, [searchTerm]);


    return (
        <div className="app">
            <h1>Comedy Movies</h1>

         
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

 
            {error && <p className="error">{error}</p>}

     
            <div className="movie-list">
                {movies.map((movie) => (
                    <div className="movie-card" key={movie.imdbID}>
                        <img
                            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                            alt={movie.Title}
                        />
                        <h3>{movie.Title}</h3>
                        <p>
                            <strong>Year:</strong> {movie.Year}
                        </p>
                    </div>
                ))}

                {!loading && !error && movies.length === 0 && <p>No movies found.</p>}
            </div>


            {loading && <p>Loading...</p>}
        </div>
    );
};

export default ComedyMovies;

