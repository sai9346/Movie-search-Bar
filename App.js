import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/Moviecard';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovies = async (query) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
            const data = await response.json();
            const moviesData = data.docs.map(movie => ({
                title: movie.title,
                author: movie.author_name ? movie.author_name[0] : 'Unknown Author',
                publishDate: movie.first_publish_year ? movie.first_publish_year : 'Unknown Year',
            }));

            // Fetch random dog images
            const dogImagePromises = moviesData.map(() => fetch('https://dog.ceo/api/breeds/image/random'));
            const dogImageResponses = await Promise.all(dogImagePromises);
            const dogImageData = await Promise.all(dogImageResponses.map(res => res.json()));

            const moviesWithImages = moviesData.map((movie, index) => ({
                ...movie,
                imageUrl: dogImageData[index].message
            }));

            setMovies(moviesWithImages);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <SearchBar onSearch={fetchMovies} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="card-container">
                {movies.map((movie, index) => (
                    <MovieCard 
                        key={index} 
                        title={movie.title} 
                        author={movie.author} 
                        publishDate={movie.publishDate} 
                        imageUrl={movie.imageUrl} 
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
