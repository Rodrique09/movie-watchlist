import { useState, useEffect, useRef } from 'react';
import './SearchPage.css';

function SearchPage() {

    // using useSate to manage state
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // using useRef to reference DOM elements
    const searchInputRef = useRef(null);

    //OMDB API key
    const API_KEY = '793c183c';


    // using useEffect to perform side effects
    useEffect(() => {
        searchInputRef.current.focus();
    }, []); // Run Only once when component mounts

    //Search movies from OMDB API
    const searchMovies = async (query) => {
        if (!query.trim()) {
            setError('Please enter a valid search term.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setError(data.Error);
                setMovies([]);
            }
        } catch (err) {
            setError(`Failed to fetch movies. Please try again later. ${err.message}`);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    //handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovies(searchTerm);
    }

    return (
        <div className="search-page">
            <div className="search-container">
                <h2>Search for Movies</h2>

                {/* Search Form */}
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Enter movie name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>

                {/* Loading State */}
                {loading && <p className="message">Searching...</p>}

                {/* Error State */}
                {error && <p className="message error">{error}</p>}

                {/* Movies Grid */}
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="movie-card">
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                                alt={movie.Title}
                            />
                            <div className="movie-info">
                                <h3>{movie.Title}</h3>
                                <p>{movie.Year}</p>
                                <button className="add-button">+ Add to Watchlist</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default SearchPage;