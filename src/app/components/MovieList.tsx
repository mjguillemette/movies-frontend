"use client";

import React, { useEffect, useState } from "react";
import { getAllMovies, searchMovies } from "../services/movieService";
import { Movie } from "../types/MovieTypes";
import { MovieCardComponent } from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "@/hooks/useDebounce";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedMovieTitle, setExpandedMovieTitle] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleToggle = (movieTitle: string) => {
    setExpandedMovieTitle((prevTitle) =>
      prevTitle === movieTitle ? null : movieTitle
    );
  };

  // Function to fetch all movies
  const fetchAllMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllMovies();
      setMovies(response.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setError("An error occurred while fetching movies. Please try again.");
      setMovies([]);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  // Function to fetch searched movies
  const fetchSearchedMovies = async (query: string) => {
    if (query.trim() === "") {
      fetchAllMovies();
      return;
    }

    setIsSearching(true);
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchMovies(query);
      setMovies(response.data);
    } catch (error) {
      console.error("Failed to search movies:", error);
      setError("An error occurred while searching for movies.");
      setMovies([]);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    fetchSearchedMovies(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  // Define motion variants for movie cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="mx-auto px-4 py-8 items-start max-w-7xl min-w-full">
      <h1 className="text-3xl font-bold mb-6">Movie Collection</h1>

      {/* Search Input */}
      <div className="mb-6">
        <label htmlFor="movie-search" className="sr-only">
          Search Movies
        </label>
        <input
          id="movie-search"
          type="text"
          placeholder="Search movies by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center py-8 text-red-500">{error}</div>
      )}

      {/* Movies Grid */}
      {!isLoading && !error && (
        <>
          {movies.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <AnimatePresence>
                {movies.map((movie) => (
                  <motion.div
                    key={movie.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    layout
                  >
                    <MovieCardComponent
                      movie={movie}
                      isExpanded={expandedMovieTitle === movie.title}
                      onToggle={() => handleToggle(movie.title)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-8">
              {isSearching
                ? "Searching movies..."
                : "No movies found. Try a different search query."}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieList;
